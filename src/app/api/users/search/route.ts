import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

const FALLBACK_USERS = [
  { id: 'user-1', name: 'Huỳnh Dương Xuân Nhật', avatar_url: null },
  { id: 'user-2', name: 'Huỳnh Dương Xuân', avatar_url: null },
  { id: 'user-3', name: 'Nguyễn Hoàng Linh', avatar_url: null },
  { id: 'user-4', name: 'Nguyễn Văn Quý', avatar_url: null },
  { id: 'user-5', name: 'Đỗ Hoàng Hiệp', avatar_url: null },
  { id: 'user-6', name: 'Trần Minh Đức', avatar_url: null },
  { id: 'user-7', name: 'Lê Thị Hồng', avatar_url: null },
  { id: 'user-8', name: 'Phạm Văn An', avatar_url: null },
  { id: 'user-9', name: 'Võ Thanh Hải', avatar_url: null },
  { id: 'user-10', name: 'Ngô Quốc Tuấn', avatar_url: null },
];

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No auth');

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
    // Fallback: filter fake users by query (normalize diacritics for matching)
    const normalize = (s: string) =>
      s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const nq = normalize(q);
    const filtered = q.length < 2
      ? FALLBACK_USERS.slice(0, 10)
      : FALLBACK_USERS.filter((u) => normalize(u.name).includes(nq)).slice(0, 10);
    return NextResponse.json({ data: filtered });
  }
}
