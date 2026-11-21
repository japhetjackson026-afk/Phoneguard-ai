-- PHONEGUARD AI starter database schema.
-- Apply only after creating a Supabase project. Keep RLS enabled.
create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  device_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.device_locations (
  id bigint generated always as identity primary key,
  device_id uuid not null references public.devices(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  latitude double precision not null,
  longitude double precision not null,
  accuracy_m double precision,
  recorded_at timestamptz not null default now()
);

alter table public.devices enable row level security;
alter table public.device_locations enable row level security;

create policy "Owners can manage their own devices"
on public.devices for all
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Owners can read their own locations"
on public.device_locations for select
using (auth.uid() = owner_id);

create policy "Owners can add their own locations"
on public.device_locations for insert
with check (auth.uid() = owner_id);
