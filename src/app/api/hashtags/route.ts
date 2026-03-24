import { NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ data: [] }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('hashtags')
      .select('*')
      .order('name');

    if (error) throw error;

    return NextResponse.json({ data: data || [] });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
