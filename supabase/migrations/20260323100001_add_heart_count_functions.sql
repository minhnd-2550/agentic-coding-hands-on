-- Atomic increment/decrement for hearts_count
-- Uses SECURITY DEFINER to bypass RLS (kudos table has no UPDATE policy)

create or replace function public.increment_hearts_count(kudos_id uuid)
returns integer
language plpgsql
security definer set search_path = ''
as $$
declare
  new_count integer;
begin
  update public.kudos
    set hearts_count = hearts_count + 1
    where id = kudos_id
    returning hearts_count into new_count;
  return coalesce(new_count, 0);
end;
$$;

create or replace function public.decrement_hearts_count(kudos_id uuid)
returns integer
language plpgsql
security definer set search_path = ''
as $$
declare
  new_count integer;
begin
  update public.kudos
    set hearts_count = greatest(hearts_count - 1, 0)
    where id = kudos_id
    returning hearts_count into new_count;
  return coalesce(new_count, 0);
end;
$$;
