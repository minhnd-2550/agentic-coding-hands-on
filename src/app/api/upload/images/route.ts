import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const files = formData.getAll('files') as File[];
  if (files.length === 0) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 });
  }
  if (files.length > 5) {
    return NextResponse.json({ error: 'Maximum 5 files allowed' }, { status: 400 });
  }

  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: `Invalid file type: ${file.type}. Only JPG, PNG, GIF, WEBP accepted.` }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: `File ${file.name} exceeds 5MB limit` }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const path = `kudos/${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('kudos-images')
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
    }

    const { data: publicUrl } = supabase.storage
      .from('kudos-images')
      .getPublicUrl(path);

    urls.push(publicUrl.publicUrl);
  }

  return NextResponse.json({ data: urls }, { status: 201 });
}
