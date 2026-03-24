-- Hashtags table for kudos filtering
create table if not exists public.hashtags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) <= 50),
  created_at timestamptz not null default now()
);

-- RLS
alter table public.hashtags enable row level security;

create policy "Hashtags are viewable by authenticated users"
  on public.hashtags for select
  to authenticated
  using (true);

-- Seed data
insert into public.hashtags (name) values
  ('Dedicated'),
  ('Inspiring'),
  ('Creative'),
  ('Leadership'),
  ('Teamwork'),
  ('Innovation'),
  ('Mentoring'),
  ('Problem Solving'),
  ('Communication'),
  ('Resilience')
on conflict (name) do nothing;
