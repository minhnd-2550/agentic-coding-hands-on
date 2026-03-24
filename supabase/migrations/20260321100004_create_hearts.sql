-- Hearts table for kudos likes
create table if not exists public.hearts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  kudos_id uuid not null references public.kudos(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, kudos_id)
);

-- Index for checking if user hearted a specific kudos
create index idx_hearts_user_kudos on public.hearts (user_id, kudos_id);

-- RLS
alter table public.hearts enable row level security;

create policy "Hearts are viewable by authenticated users"
  on public.hearts for select
  to authenticated
  using (true);

create policy "Users can insert own hearts"
  on public.hearts for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete own hearts"
  on public.hearts for delete
  to authenticated
  using (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table public.hearts;
