import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id: kudosId } = await params;

  // Insert heart
  const { error: heartError } = await supabase
    .from('hearts')
    .insert({ user_id: user.id, kudos_id: kudosId });

  if (heartError) {
    if (heartError.code === '23505') {
      return NextResponse.json({ error: 'Already hearted' }, { status: 409 });
    }
    return NextResponse.json({ error: heartError.message }, { status: 500 });
  }

  // Atomic increment via SECURITY DEFINER function
  const { data: newCount } = await supabase.rpc('increment_hearts_count', {
    kudos_id: kudosId,
  });

  return NextResponse.json({
    hearted: true,
    hearts_count: newCount ?? 0,
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id: kudosId } = await params;

  // Remove heart
  const { error: heartError } = await supabase
    .from('hearts')
    .delete()
    .eq('user_id', user.id)
    .eq('kudos_id', kudosId);

  if (heartError) return NextResponse.json({ error: heartError.message }, { status: 500 });

  // Atomic decrement via SECURITY DEFINER function
  const { data: newCount } = await supabase.rpc('decrement_hearts_count', {
    kudos_id: kudosId,
  });

  return NextResponse.json({
    hearted: false,
    hearts_count: newCount ?? 0,
  });
}
