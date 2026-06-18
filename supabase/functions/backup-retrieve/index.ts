// supabase/functions/backup-retrieve/index.ts
// Recovery flow: verify security answers again (defense in depth — this endpoint
// can be reached independently of auth-recover-account), then return the encrypted
// blob. Decryption happens entirely client-side.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { phone, mothersName, altPhone, hometown } = await req.json();
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    const { data: user, error } = await supabase
      .from('users')
      .select('id, security_questions')
      .eq('phone', cleanPhone)
      .maybeSingle();

    if (error || !user) {
      return jsonResponse({ error: 'User not found' }, 404);
    }

    const questions = user.security_questions as { q1: string; q2: string; q3: string } | null;
    if (!questions) {
      return jsonResponse({ error: 'No security questions on file' }, 400);
    }

    const q1Match = await bcrypt.compare(mothersName.toLowerCase().trim(), questions.q1);
    const q2Match = await bcrypt.compare(altPhone.trim(), questions.q2);
    const q3Match = await bcrypt.compare(hometown.toLowerCase().trim(), questions.q3);

    if (!q1Match || !q2Match || !q3Match) {
      await supabase.from('admin_alerts').insert({
        user_id: user.id,
        alert_type: 'recovery_failed',
        details: { phone: cleanPhone, reason: 'security_answers_mismatch', endpoint: 'backup-retrieve' },
        status: 'open',
      });
      return jsonResponse({ error: 'Security answers do not match' }, 401);
    }

    const { data: backup, error: backupErr } = await supabase
      .from('user_backups')
      .select('encrypted_blob, blob_iv, blob_salt, key_derivation_method')
      .eq('user_id', user.id)
      .maybeSingle();

    if (backupErr || !backup) {
      return jsonResponse({ error: 'No backup found for this user' }, 404);
    }

    await supabase
      .from('user_backups')
      .update({ last_downloaded_at: new Date().toISOString() })
      .eq('user_id', user.id);

    await supabase.from('audit_log').insert({
      user_id: user.id,
      event: 'backup_retrieved',
      details: { phone: cleanPhone, recovery_method: 'security_answers' },
    });

    return jsonResponse({
      success: true,
      encrypted_backup: {
        blob: backup.encrypted_blob,
        iv: backup.blob_iv,
        salt: backup.blob_salt,
        key_derivation_method: backup.key_derivation_method,
      },
      instructions: 'Decrypt client-side using a key derived from your security answers',
    });
  } catch (err) {
    console.error('Backup retrieval error:', err);
    return jsonResponse({ error: 'Backup retrieval failed' }, 500);
  }
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
