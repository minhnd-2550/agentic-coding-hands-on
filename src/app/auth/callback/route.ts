import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { isAllowedDomain, getRateLimitConfig } from "@/utils/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const origin = new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user?.email) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Defense-in-depth: validate email domain
  if (!isAllowedDomain(data.user.email)) {
    // Sign out the user since their session was just created
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/login?error=domain_restricted`);
  }

  // Check rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { maxAttempts, windowMinutes } = getRateLimitConfig();

  const windowStart = new Date(
    Date.now() - windowMinutes * 60 * 1000
  ).toISOString();

  const { count } = await supabase
    .from("login_attempts")
    .select("*", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("attempted_at", windowStart);

  if (count !== null && count >= maxAttempts) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/login?error=rate_limited`);
  }

  return NextResponse.redirect(`${origin}/`);
}
