-- Secret boxes table for gift system
create table if not exists public.secret_boxes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  is_opened boolean not null default false,
  gift_description text,
  opened_at timestamptz,
  created_at timestamptz not null default now()
);

-- Index for recent opened gifts
create index idx_secret_boxes_opened on public.secret_boxes (opened_at desc) where is_opened = true;

-- RLS
alter table public.secret_boxes enable row level security;

create policy "Users can view own secret boxes"
  on public.secret_boxes for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can update own secret boxes"
  on public.secret_boxes for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policy for recent gifts (read all opened boxes for the gift list)
create policy "Authenticated users can view opened secret boxes"
  on public.secret_boxes for select
  to authenticated
  using (is_opened = true);

-- Enable realtime
alter publication supabase_realtime add table public.secret_boxes;
