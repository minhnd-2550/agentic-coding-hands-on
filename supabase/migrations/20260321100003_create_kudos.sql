-- Kudos table for appreciation messages
create table if not exists public.kudos (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(content) <= 2000),
  hashtags text[] default '{}',
  images text[] default '{}' check (array_length(images, 1) is null or array_length(images, 1) <= 5),
  media_type text check (media_type in ('image', 'video') or media_type is null),
  hearts_count integer not null default 0,
  created_at timestamptz not null default now()
);

-- Index for feed pagination (reverse chronological)
create index idx_kudos_created_at on public.kudos (created_at desc);

-- Index for highlights (by hearts count)
create index idx_kudos_hearts_count on public.kudos (hearts_count desc);

-- RLS
alter table public.kudos enable row level security;

create policy "Kudos are viewable by authenticated users"
  on public.kudos for select
  to authenticated
  using (true);

create policy "Users can insert own kudos"
  on public.kudos for insert
  to authenticated
  with check (auth.uid() = sender_id);

-- Enable realtime
alter publication supabase_realtime add table public.kudos;
