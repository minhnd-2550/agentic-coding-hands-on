"use client";

import Link from "next/link";
import Image from "next/image";
import type { AwardCategory } from "@/types/event";
import { useI18n } from "@/libs/i18n/context";

type AwardCardProps = {
  award: AwardCategory;
};

export function AwardCard({ award }: AwardCardProps) {
  const { t } = useI18n();

  return (
    <Link
      href={`/award-information#${award.slug}`}
      className="group flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Thumbnail — golden circle with award name + gold border */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a1520] border border-[#998C5F]/50">
        {/* Golden circle background centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/award-bg.png"
            alt=""
            width={336}
            height={336}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Award name overlay centered on the circle */}
        {award.thumbnail_url && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={award.thumbnail_url}
              alt={award.name}
              width={222}
              height={36}
              className="w-[60%] h-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-[#FFEA9E] font-semibold text-base">{award.name}</h3>
        {award.short_description && (
          <p className="text-white/60 text-sm font-light line-clamp-2">
            {award.short_description}
          </p>
        )}
      </div>

      {/* Detail link */}
      <span className="inline-flex items-center gap-1 text-white/70 text-sm font-medium group-hover:text-[#FFEA9E] transition-colors">
        {t("home.detail")}
        <Image
          src="/icons/arrow-up-right.svg"
          alt=""
          width={14}
          height={14}
          className="opacity-70 group-hover:opacity-100"
        />
      </span>
    </Link>
  );
}
