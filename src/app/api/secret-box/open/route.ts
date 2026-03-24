import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({})) as { box_id?: string };
  const boxId = body.box_id;
  if (!boxId) return NextResponse.json({ error: 'box_id required' }, { status: 400 });

  const { data, error } = await supabase
    .from('secret_boxes')
    .update({
      is_opened: true,
      opened_at: new Date().toISOString(),
    })
    .eq('id', boxId)
    .eq('user_id', user.id)
    .eq('is_opened', false)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Box not found or already opened' }, { status: 404 });

  return NextResponse.json(data);
}
