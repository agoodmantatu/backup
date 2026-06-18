// supabase/functions/auth-register/index.ts
// Registration endpoint: validates verification token, creates/updates user, issues JWT

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { upstash } from '../_shared/upstash.ts';
import { signJWT } from '../_shared/jwt.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')! // service_role bypasses RLS, Edge Function only
);

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const deviceId = req.headers.get('x-device-id');
    if (!deviceId) {
      return jsonResponse({ error: 'Missing X-Device-ID header' }, 400);
    }

    const { phone, method, token } = await req.json();

    // Validate phone format (10 digit India)
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (!/^\d{10}$/.test(cleanPhone)) {
      return jsonResponse({ error: 'Invalid phone number' }, 400);
    }

    // Validate method
    if (!['truecaller', 'whatsapp', 'sms'].includes(method)) {
      return jsonResponse({ error: 'Invalid verification method' }, 400);
    }

    // Check WhatsApp toggle (env flag, can disable instantly without redeploy logic)
    if (method === 'whatsapp' && Deno.env.get('ENABLE_WHATSAPP') !== 'true') {
      return jsonResponse({ error: 'WhatsApp verification currently unavailable, please use SMS or Truecaller' }, 503);
    }

    // Verify token from Upstash (set by the respective webhook/callback)
    const redisKey = `verify:${method}:${cleanPhone}`;
    const storedToken = await upstash.get(redisKey);

    if (!storedToken || storedToken !== token) {
      return jsonResponse({ error: 'Verification token invalid or expired' }, 401);
    }

    // One-time use: delete immediately
    await upstash.del(redisKey);

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, session_version')
      .eq('phone', cleanPhone)
      .maybeSingle();

    let userId: string;
    let sessionVersion: number;

    if (existingUser) {
      // Existing user logging in on a (possibly new) device → bump session_version
      sessionVersion = existingUser.session_version + 1;
      userId = existingUser.id;

      const { error: updateErr } = await supabase
        .from('users')
        .update({ session_version: sessionVersion, device_id: deviceId, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (updateErr) throw updateErr;
    } else {
      // New user
      sessionVersion = 1;

      const { data: inserted, error: insertErr } = await supabase
        .from('users')
        .insert({
          phone: cleanPhone,
          device_id: deviceId,
          session_version: sessionVersion,
          account_status: 'active',
        })
        .select('id')
        .single();

      if (insertErr) throw insertErr;
      userId = inserted.id;
    }

    // Issue JWT
    const jwt = await signJWT({ userId, phone: cleanPhone, sessionVersion, deviceId });

    // Cache JWT in Upstash (optional quick-lookup cache, 30 day TTL)
    await upstash.setex(`jwt:${userId}:${deviceId}`, 30 * 24 * 60 * 60, jwt);

    // Audit log (fire and forget, don't block response on failure)
    supabase
      .from('audit_log')
      .insert({
        user_id: userId,
        event: 'registration',
        details: { method, deviceId },
      })
      .then(() => {})
      .catch(() => {});

    return jsonResponse({
      success: true,
      jwt,
      session_version: sessionVersion,
      userId,
    });
  } catch (err) {
    console.error('Registration error:', err);
    return jsonResponse({ error: 'Registration failed', message: String(err) }, 500);
  }
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
