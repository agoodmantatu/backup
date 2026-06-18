// supabase/functions/backup-upload/index.ts
// Stores client-encrypted backup blob. Server never sees plaintext —
// encryption key is derived client-side from security answers.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { verifyJWT } from '../_shared/jwt.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return jsonResponse({ error: 'Missing JWT' }, 401);

    const decoded = await verifyJWT(authHeader.split(' ')[1]);
    if (!decoded) return jsonResponse({ error: 'Invalid JWT' }, 401);

    const { encrypted_blob, blob_iv, blob_salt, key_derivation_method } = await req.json();

    if (!encrypted_blob || !blob_iv) {
      return jsonResponse({ error: 'Missing encrypted blob or IV' }, 400);
    }

    const { error } = await supabase
      .from('user_backups')
      .upsert(
        {
          user_id: decoded.userId,
          encrypted_blob,
          blob_iv,
          blob_salt,
          key_derivation_method,
          uploaded_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    if (error) throw error;

    return jsonResponse({ success: true, message: 'Backup uploaded successfully' });
  } catch (err) {
    console.error('Backup upload error:', err);
    return jsonResponse({ error: 'Backup upload failed' }, 500);
  }
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
