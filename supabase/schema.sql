create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.question_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id integer not null,
  is_completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  ended_at timestamptz
);

create or replace function public.set_progress_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists question_progress_set_updated_at on public.question_progress;
create trigger question_progress_set_updated_at
before update on public.question_progress
for each row
execute function public.set_progress_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

insert into public.profiles (id, email, full_name)
select
  id,
  email,
  coalesce(raw_user_meta_data ->> 'full_name', '')
from auth.users
on conflict (id) do update
set
  email = excluded.email,
  full_name = excluded.full_name;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_admin = true
  );
$$;

alter table public.profiles enable row level security;
alter table public.question_progress enable row level security;
alter table public.user_sessions enable row level security;

drop policy if exists "profiles select own or admin" on public.profiles;
create policy "profiles select own or admin"
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles update own or admin" on public.profiles;
create policy "profiles update own or admin"
on public.profiles
for update
to authenticated
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

drop policy if exists "question progress select own or admin" on public.question_progress;
create policy "question progress select own or admin"
on public.question_progress
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "question progress insert own" on public.question_progress;
create policy "question progress insert own"
on public.question_progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "question progress update own" on public.question_progress;
create policy "question progress update own"
on public.question_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "question progress delete own" on public.question_progress;
create policy "question progress delete own"
on public.question_progress
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "user sessions select own or admin" on public.user_sessions;
create policy "user sessions select own or admin"
on public.user_sessions
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "user sessions insert own" on public.user_sessions;
create policy "user sessions insert own"
on public.user_sessions
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "user sessions update own" on public.user_sessions;
create policy "user sessions update own"
on public.user_sessions
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

revoke all on public.profiles from anon, authenticated;
revoke all on public.question_progress from anon, authenticated;
revoke all on public.user_sessions from anon, authenticated;

grant select on public.profiles to authenticated;
grant update (full_name, last_seen_at) on public.profiles to authenticated;

grant select, insert, update, delete on public.question_progress to authenticated;
grant select, insert, update on public.user_sessions to authenticated;

-- After your own account signs up, run this once to make it the admin:
-- update public.profiles set is_admin = true where email = 'your-admin-email@example.com';
