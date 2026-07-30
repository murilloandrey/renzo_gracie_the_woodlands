-- Renzo Gracie The Woodlands — lead capture
-- Run in the Supabase SQL editor of the NEW project (never the Aunory project).
--
-- Security model:
--   The anon key is embedded in the client bundle. It is publishable, not secret.
--   Safety comes from RLS: anon may INSERT and nothing else. There is deliberately
--   no SELECT policy, so nobody can pull the lead list with the public key.
--   You read leads through the Supabase dashboard or a service-role key that
--   never leaves the server.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text        not null,
  name        text,
  phone       text,
  -- where the lead came from: 'popup', 'free-trial-form', ...
  source      text        not null default 'popup',
  -- which offer they responded to, so you can measure them against each other
  offer_code  text,
  page_path   text,
  constraint leads_email_format
    check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  constraint leads_email_length check (char_length(email) <= 254)
);

alter table public.leads enable row level security;

-- Anyone may submit a lead.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- No select / update / delete policy on purpose. Do not add one for `anon`.

-- One row per email per source. A repeat submit returns 409, which the client
-- treats as success — the visitor still sees their code, you don't get dupes.
create unique index if not exists leads_email_source_idx
  on public.leads (lower(email), source);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);
