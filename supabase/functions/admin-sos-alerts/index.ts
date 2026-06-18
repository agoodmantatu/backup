// supabase/functions/admin-sos-alerts/index.ts
// Two responsibilities in one function, routed by HTTP method:
//   GET  -> admin views open alerts (requires ADMIN_TOKEN)
//   POST -> client flags an event (PIN lockout, etc) — requires valid JWT, not admin token

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { verifyJWT } from '../_shared/jwt.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

function checkAdminAuth(req: Request): boolean {
  const token = req.headers.get('authorization')?.split(' ')[1];
  return token === Deno.env.get('ADMIN_TOKEN');
}

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method === 'GET') {
    if (!checkAdminAuth(req)) return jsonResponse({ error: 'Unauthorized' }, 403);

    try {
      const { data: alerts, error } = await supabase
        .from('admin_alerts')
        .select('id, user_id, alert_type, details, status, created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return jsonResponse({ alerts });
    } catch (err) {
      console.error('Admin alerts fetch error:', err);
      return jsonResponse({ error: 'Failed to fetch alerts' }, 500);
    }
  }

  if (req.method === 'POST') {
    try {
      const authHeader = req.headers.get('authorization');
      if (!authHeader) return jsonResponse({ error: 'Missing JWT' }, 401);

      const decoded = await verifyJWT(authHeader.split(' ')[1]);
      if (!decoded) return jsonResponse({ error: 'Invalid JWT' }, 401);

      const { reason, details } = await req.json();

      const { error } = await supabase.from('admin_alerts').insert({
        user_id: decoded.userId,
        alert_type: reason,
        details: { ...details, deviceId: req.headers.get('x-device-id') },
        status: 'open',
      });

      if (error) throw error;

      return jsonResponse({ success: true });
    } catch (err) {
      console.error('SOS flag error:', err);
      return jsonResponse({ error: 'Failed to create alert' }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
