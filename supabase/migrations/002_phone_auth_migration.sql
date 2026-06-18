-- ═══════════════════════════════════════════════════════════════
-- TryIT Educations — Phone-First Auth Migration
-- Extends existing schema (001_complete_schema.sql) — does NOT
-- touch student_profiles, coin_transactions, hall_battles, etc.
-- Run AFTER 001_complete_schema.sql, in Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ── 1. MAKE EMAIL OPTIONAL ON PROFILES ────────────────────────────
-- Phone-first signups won't have an email. Keep it unique (no dupes
-- if someone DOES add one later) but drop the "not null" requirement.

alter table profiles alter column email drop not null;

-- ── 2. FIX handle_new_user() TO SURVIVE MISSING EMAIL ─────────────
-- Original version did substring(NEW.email from 1 for 2), which
-- returns NULL when email is NULL (phone-only signup), silently
-- leaving tryit_id blank for every phone-registered user.
--
-- Fix: fall back to state (passed as auth metadata at signup) →
-- then to a generic 'PH' (phone) prefix if state isn't given either.

create or replace function handle_new_user()
returns trigger as $$
declare
  prefix text;
begin
  prefix := coalesce(
    upper(substring(NEW.email from 1 for 2)),
    upper(substring(NEW.raw_user_meta_data->>'state' from 1 for 2)),
    'PH'
  );

  insert into profiles (id, email, tryit_id)
  values (
    NEW.id,
    NEW.email,
    'TRY-' || prefix || '-' || lpad(extract(epoch from now())::int::text, 5, '0') || '-2026'
  );
  return NEW;
end;
$$ language plpgsql security definer;

-- Trigger itself is unchanged — it already points at handle_new_user(),
-- so replacing the function body above is enough. No need to drop/recreate
-- the trigger.

-- ── 3. DEVICES (multi-device tracking, session eviction) ─────────
create table if not exists devices (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(id) on delete cascade,
  device_id     text not null,           -- hardware-derived ID from client
  device_name   text,
  device_ip     text,
  session_version int,
  last_login    timestamptz,
  is_active     boolean default true,
  created_at    timestamptz default now()
);

create index if not exists idx_devices_user_id on devices(user_id);
create index if not exists idx_devices_device_id on devices(device_id);

-- ── 4. VERIFICATION TOKENS (mirrors Upstash for any DB-side audit) ─
-- Note: short-lived tokens primarily live in Upstash (Redis), this
-- table is optional historical record, NOT the source of truth for
-- "is this token valid right now" — that check happens in Upstash.
create table if not exists verification_tokens (
  id          uuid primary key default gen_random_uuid(),
  phone       text not null,
  token       text not null,
  method      text check (method in ('truecaller', 'whatsapp', 'sms')),
  verified    boolean default false,
  created_at  timestamptz default now(),
  expires_at  timestamptz
);

create index if not exists idx_verification_tokens_phone on verification_tokens(phone);

-- ── 5. SECURITY ANSWERS (mother's name, alt phone, hometown) ──────
create table if not exists security_answers (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(id) on delete cascade,
  question_id   int,   -- 1=mothers_name, 2=alt_phone, 3=hometown
  answer_hash   text not null,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists idx_security_answers_user_id on security_answers(user_id);

-- Simpler alternative actually used by the recover-account function:
-- a single JSONB column on profiles holding all 3 hashed answers,
-- rather than 3 separate rows. Add it here so the function code
-- (which reads profiles.security_questions) matches reality.
alter table profiles add column if not exists security_questions jsonb;

-- ── 6. ADMIN ALERTS (SOS dashboard: lockouts, replay attacks, etc) ─
create table if not exists admin_alerts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete set null,
  alert_type  text,
  details     jsonb,
  status      text default 'open',  -- open|resolved|ignored
  created_at  timestamptz default now()
);

create index if not exists idx_admin_alerts_status on admin_alerts(status);
create index if not exists idx_admin_alerts_user_id on admin_alerts(user_id);

-- ── 7. AUDIT LOG (every auth event, for compliance + debugging) ───
create table if not exists audit_log (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete set null,
  event       text,
  details     jsonb,
  created_at  timestamptz default now()
);

create index if not exists idx_audit_log_user_id on audit_log(user_id);
create index if not exists idx_audit_log_created_at on audit_log(created_at);

-- ── 8. TRANSACTION LOG (sequence-number replay protection) ────────
-- Used by sync-batch Edge Function to block database-rollback exploits
create table if not exists transaction_log (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(id) on delete cascade,
  sequence_number bigint not null,
  key             text not null,
  value           jsonb,
  signature       text,
  synced          boolean default false,
  synced_at       timestamptz,
  created_at      timestamptz default now(),
  unique(user_id, sequence_number)
);

create index if not exists idx_transaction_log_user_seq on transaction_log(user_id, sequence_number);

-- ── 9. USER BACKUPS (encrypted blob for device-loss recovery) ─────
create table if not exists user_backups (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null unique references profiles(id) on delete cascade,
  encrypted_blob          text not null,
  blob_iv                 text not null,
  blob_salt               text,
  key_derivation_method   text,
  uploaded_at             timestamptz default now(),
  last_downloaded_at      timestamptz
);

-- ── 10. SUPPORTING COLUMNS ON PROFILES FOR PIN/SESSION LOGIC ──────
alter table profiles add column if not exists phone text unique;
alter table profiles add column if not exists pin_hash text;
alter table profiles add column if not exists biometric_enabled boolean default false;
alter table profiles add column if not exists pin_attempts int default 0;
alter table profiles add column if not exists pin_locked_until timestamptz;
alter table profiles add column if not exists session_version int default 1;
alter table profiles add column if not exists last_sync_timestamp timestamptz;
alter table profiles add column if not exists account_status text default 'active';

create index if not exists idx_profiles_phone on profiles(phone);

-- ── 11. ROW LEVEL SECURITY ─────────────────────────────────────────
-- New tables only — does NOT touch RLS on your 22 existing tables.
-- These are written/read exclusively by Edge Functions using the
-- service_role key, which bypasses RLS entirely. Enabling RLS here
-- with no policies just closes the public PostgREST API for these
-- specific tables so they can't be queried directly from the client.

alter table devices enable row level security;
alter table verification_tokens enable row level security;
alter table security_answers enable row level security;
alter table admin_alerts enable row level security;
alter table audit_log enable row level security;
alter table transaction_log enable row level security;
alter table user_backups enable row level security;

-- ═══════════════════════════════════════════════════════════════
-- END OF MIGRATION
-- ═══════════════════════════════════════════════════════════════