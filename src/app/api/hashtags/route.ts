import { NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

const FALLBACK_HASHTAGS = [
  { id: 'ht-1', name: 'High-performing' },
  { id: 'ht-2', name: 'BE PROFESSIONAL' },
  { id: 'ht-3', name: 'BE OPTIMISTIC' },
  { id: 'ht-4', name: 'BE A TEAM' },
  { id: 'ht-5', name: 'THINK OUTSIDE THE BOX' },
  { id: 'ht-6', name: 'GET RISKY' },
  { id: 'ht-7', name: 'GO FAST' },
  { id: 'ht-8', name: 'WASSHOI' },
];

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No auth');

    const { data, error } = await supabase
      .from('hashtags')
      .select('*')
      .order('name');

    if (error) throw error;

    return NextResponse.json({ data: data || [] });
  } catch {
    return NextResponse.json({ data: FALLBACK_HASHTAGS });
  }
}
