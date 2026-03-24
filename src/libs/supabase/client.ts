import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Cache Supabase health check to avoid repeated network errors in console
let _supabaseReachable: boolean | null = null;

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);

export async function isSupabaseReachable(): Promise<boolean> {
  if (_supabaseReachable !== null) return _supabaseReachable;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { apikey: supabaseKey! },
    });
    clearTimeout(timeout);
    _supabaseReachable = true;
  } catch {
    _supabaseReachable = false;
  }
  return _supabaseReachable;
}
