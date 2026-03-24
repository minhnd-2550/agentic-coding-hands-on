import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ data: [] }, { status: 401 });
    }

    let query = supabase
      .from('profiles')
      .select('*')
      .neq('id', user.id)
      .limit(10);

    if (q.length >= 2) {
      query = query.ilike('name', `%${q}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ data: data || [] });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
