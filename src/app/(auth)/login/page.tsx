import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { LoginBackground } from "@/components/login/LoginBackground";
import { LoginHero } from "@/components/login/LoginHero";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { LoginErrorType } from "@/types/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-[#00101A] relative overflow-hidden">
      <LoginBackground />
      <Header />
      <LoginHero errorType={error as LoginErrorType | undefined} />
      <Footer />
    </div>
  );
}
