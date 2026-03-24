import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/libs/supabase/server';

const CreateKudosSchema = z.object({
  receiver_id: z.string().uuid(),
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(2000),
  hashtags: z.array(z.string()).min(1).max(5),
  images: z.array(z.string().url()).max(5).default([]),
  is_anonymous: z.boolean().default(false),
  anonymous_name: z.string().max(50).nullable().default(null),
});

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const cursor = searchParams.get('cursor');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50);
  const hashtag = searchParams.get('hashtag');
  const department = searchParams.get('department');

  let query = supabase
    .from('kudos')
    .select(`
      *,
      sender:profiles!kudos_sender_id_fkey(*),
      receiver:profiles!kudos_receiver_id_fkey(*)
    `)
    .order('created_at', { ascending: false })
    .limit(limit + 1);

  if (cursor) {
    query = query.lt('created_at', cursor);
  }
  if (hashtag) {
    query = query.contains('hashtags', [hashtag]);
  }
  if (department) {
    query = query.or(`sender.department_id.eq.${department},receiver.department_id.eq.${department}`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const hasMore = data && data.length > limit;
  const items = hasMore ? data.slice(0, limit) : (data || []);
  const nextCursor = hasMore ? items[items.length - 1]?.created_at : null;

  // Check which kudos the current user has hearted
  if (items.length > 0) {
    const kudosIds = items.map((k) => k.id);
    const { data: hearts } = await supabase
      .from('hearts')
      .select('kudos_id')
      .eq('user_id', user.id)
      .in('kudos_id', kudosIds);

    const heartedSet = new Set(hearts?.map((h) => h.kudos_id));
    for (const item of items) {
      (item as Record<string, unknown>).is_hearted_by_me = heartedSet.has(item.id);
    }
  }

  return NextResponse.json({ data: items, nextCursor });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = CreateKudosSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Validation failed' }, { status: 400 });
  }

  const payload = parsed.data;

  if (payload.receiver_id === user.id) {
    return NextResponse.json({ error: 'Cannot send kudos to yourself' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('kudos')
    .insert({
      sender_id: user.id,
      receiver_id: payload.receiver_id,
      title: payload.title,
      content: payload.content,
      hashtags: payload.hashtags,
      images: payload.images,
      is_anonymous: payload.is_anonymous,
      anonymous_name: payload.is_anonymous ? payload.anonymous_name : null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
