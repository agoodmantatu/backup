// supabase/functions/auth-sms-webhook/index.ts
// Exotel inbound SMS webhook (reverse-SMS, user sends to your VMN — ₹0 cost path)

import { upstash } from '../_shared/upstash.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Exotel posts form-encoded data, not JSON
    const formData = await req.formData();
    const from = formData.get('From')?.toString() ?? '';
    const body = formData.get('Body')?.toString() ?? '';

    const phone = from.replace(/\D/g, '').slice(-10);
    const match = body.match(/REG-([A-Z0-9]{8})/);

    if (!match) {
      return jsonResponse({ status: 'ignored' }, 200);
    }

    const verificationToken = match[1];

    // SMS itself IS the verification (reverse-SMS = user proved phone ownership
    // by sending from that number) — store directly as verified, 5 min TTL
    await upstash.setex(`verify:sms:${phone}`, 5 * 60, verificationToken);

    return jsonResponse({ success: true, status: 'verified' }, 200);
  } catch (err) {
    console.error('SMS webhook error:', err);
    return jsonResponse({ error: 'SMS processing failed' }, 500);
  }
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

/*
SETUP NOTE (Exotel):

1. Sign up at exotel.com, get a virtual number (VMN)
2. In Exotel dashboard: Settings → SMS → Inbound SMS callback URL
   → https://<project>.supabase.co/functions/v1/auth-sms-webhook
3. App side: show user "Send REG-XXXXXXXX to +91-XXXXXXXXXX" with their
   own SMS app — this costs the USER their carrier's standard SMS rate,
   not you. Receiving inbound SMS on Exotel's long code is free.
4. No Exotel API key needed for this specific flow since you're only
   receiving inbound, not sending — the EXOTEL_API_KEY env var is only
   needed if you later add outbound (e.g. missed-call-back or OTP SMS).
*/
