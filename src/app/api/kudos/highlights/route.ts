import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = request.nextUrl;
  const hashtag = searchParams.get('hashtag');
  const department = searchParams.get('department');

  const { data, error } = await supabase.rpc('get_highlights', {
    p_hashtag: hashtag || null,
    p_department_id: department || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fetch full user data for each kudos
  const kudosIds = (data || []).map((k: { id: string }) => k.id);
  if (kudosIds.length === 0) return NextResponse.json([]);

  const { data: fullKudos, error: fetchError } = await supabase
    .from('kudos')
    .select(`
      *,
      sender:profiles!kudos_sender_id_fkey(*),
      receiver:profiles!kudos_receiver_id_fkey(*)
    `)
    .in('id', kudosIds)
    .order('hearts_count', { ascending: false });

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });

  return NextResponse.json(fullKudos || []);
}
