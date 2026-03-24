-- Departments table for organization structure
create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

-- Note: FK from profiles.department_id → departments.id is added in create_profiles migration

-- RLS
alter table public.departments enable row level security;

create policy "Departments are viewable by authenticated users"
  on public.departments for select
  to authenticated
  using (true);

-- Seed data
insert into public.departments (name) values
  ('Engineering'),
  ('Design'),
  ('Product'),
  ('QA'),
  ('HR'),
  ('Marketing'),
  ('Sales'),
  ('Operations'),
  ('Finance'),
  ('Management')
on conflict (name) do nothing;
