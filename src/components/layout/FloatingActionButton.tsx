"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWriteKudosContext } from "@/components/kudos/write/WriteKudosProvider";
import { useI18n } from "@/libs/i18n/context";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useWriteKudosContext();
  const { t } = useI18n();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Link
            href="/tieu-chuan-chung"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FFEA9E] text-[#00101A] rounded-lg font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
          >
            <Image src="/icons/saa-rocket.svg" alt="" width={20} height={20} />
            {t("home.fab_rules")}
          </Link>
          <button
            onClick={() => { openModal(); setIsOpen(false); }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FFEA9E] text-[#00101A] rounded-lg font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
          >
            <Image src="/icons/pen.svg" alt="" width={20} height={20} />
            {t("home.fab_write_kudos")}
          </button>
          <button
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      {!isOpen && (
        <button
          aria-label="Quick actions"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 px-5 py-3 bg-[#FFEA9E] text-[#00101A] rounded-full font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          <Image src="/icons/pen.svg" alt="" width={18} height={18} />
          /
          <Image src="/icons/saa-rocket.svg" alt="" width={18} height={18} />
        </button>
      )}
    </div>
  );
}
