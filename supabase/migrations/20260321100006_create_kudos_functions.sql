-- Function: Get top 5 highlighted kudos by hearts count
create or replace function public.get_highlights(
  p_hashtag text default null,
  p_department_id uuid default null
)
returns setof public.kudos
language sql
stable
security definer
as $$
  select k.*
  from public.kudos k
  join public.profiles sender on sender.id = k.sender_id
  join public.profiles receiver on receiver.id = k.receiver_id
  where
    (p_hashtag is null or p_hashtag = any(k.hashtags))
    and (p_department_id is null or sender.department_id = p_department_id or receiver.department_id = p_department_id)
  order by k.hearts_count desc, k.created_at desc
  limit 5;
$$;

-- Function: Get user stats
create or replace function public.get_user_stats(p_user_id uuid)
returns json
language sql
stable
security definer
as $$
  select json_build_object(
    'kudos_received', (select count(*) from public.kudos where receiver_id = p_user_id),
    'kudos_sent', (select count(*) from public.kudos where sender_id = p_user_id),
    'hearts_received', (
      select coalesce(sum(k.hearts_count), 0)
      from public.kudos k
      where k.receiver_id = p_user_id
    ),
    'secret_boxes_opened', (select count(*) from public.secret_boxes where user_id = p_user_id and is_opened = true),
    'secret_boxes_unopened', (select count(*) from public.secret_boxes where user_id = p_user_id and is_opened = false)
  );
$$;

-- Function: Get spotlight data (recipient names with kudos counts)
create or replace function public.get_spotlight_data()
returns table (name text, kudos_count bigint)
language sql
stable
security definer
as $$
  select p.name, count(k.id) as kudos_count
  from public.kudos k
  join public.profiles p on p.id = k.receiver_id
  group by p.id, p.name
  order by kudos_count desc;
$$;
