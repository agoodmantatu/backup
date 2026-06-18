// supabase/functions/auth-truecaller-callback/index.ts
// Verifies Truecaller access token, issues a short-lived verification token
// for the client to hand back to auth-register.

import { upstash } from '../_shared/upstash.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const url = new URL(req.url);
    const accessToken = url.searchParams.get('accessToken');

    if (!accessToken) {
      return jsonResponse({ error: 'Missing access token' }, 400);
    }

    // Verify with Truecaller API
    const tcResponse = await fetch('https://api.truecaller.com/v1/profile', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!tcResponse.ok) {
      return jsonResponse({ error: 'Truecaller verification failed' }, 401);
    }

    const tcData = await tcResponse.json();
    const phone = tcData.profile.phoneNumber.replace(/\D/g, '').slice(-10);

    // Generate ephemeral token, store in Upstash (5 min TTL)
    const verificationToken = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    await upstash.setex(`verify:truecaller:${phone}`, 5 * 60, verificationToken);

    return jsonResponse({
      success: true,
      phone,
      token: verificationToken,
      message: 'Truecaller verification successful',
    });
  } catch (err) {
    console.error('Truecaller callback error:', err);
    return jsonResponse({ error: 'Truecaller verification failed' }, 500);
  }
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

/*
SETUP NOTE:
1. Register your app at https://developer.truecaller.com
2. Get the Truecaller SDK integrated client-side (Flutter/Android) — it
   handles the OAuth flow and gives you an accessToken
3. Client calls this endpoint with that accessToken as a query param:
   GET https://<project>.functions.supabase.co/auth-truecaller-callback?accessToken=xxx
4. No TRUECALLER_API_KEY secret is actually needed for this specific flow
   since verification happens via the user's own accessToken against
   Truecaller's API directly — add a server-side API key here only if
   Truecaller's specific integration tier requires it for your app.
*/
