"use client";

import { Toast } from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import { useI18n } from "@/libs/i18n/context";
import { createClient } from "@/libs/supabase/client";
import type { LoginErrorType } from "@/types/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

type LoginButtonProps = {
  errorType?: LoginErrorType;
};

const ERROR_KEYS: Record<LoginErrorType, string> = {
  domain_restricted: "login.error.domain_restricted",
  auth_cancelled: "login.error.auth_cancelled",
  auth_failed: "login.error.auth_failed",
  rate_limited: "login.error.rate_limited",
};

export function LoginButton({ errorType }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useI18n();
  const toast = useToast();

  // Show error toast on mount if errorType present
  useEffect(() => {
    if (errorType && errorType in ERROR_KEYS) {
      const key = ERROR_KEYS[errorType] as Parameters<typeof t>[0];
      toast.show(t(key), "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorType]);

  async function handleLogin() {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            hd: "sun-asterisk.com",
          },
        },
      });
    } catch {
      toast.show(t("login.error.auth_failed"), "error");
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleLogin}
        disabled={isLoading}
        aria-label="Login with Google"
        className="w-full lg:w-[305px] h-[60px] flex items-center justify-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg font-[family-name:var(--font-montserrat)] font-bold text-[22px] leading-7 text-[#00101A] cursor-pointer transition-all duration-150 hover:brightness-[0.92] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] active:brightness-[0.88] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="animate-spin h-6 w-6 border-2 border-[#00101A] border-t-transparent rounded-full" />
        ) : (
          <>
            <span>{t("login.button")}</span>
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={24}
              height={24}
            />
          </>
        )}
      </button>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onDismiss={toast.dismiss}
      />
    </>
  );
}
