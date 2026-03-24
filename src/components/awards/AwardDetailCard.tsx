"use client";

import { useState } from "react";
import Image from "next/image";
import type { AwardCategoryDetail } from "@/types/award";
import { TargetIcon, DiamondIcon, LicenseIcon } from "./AwardIcons";
import { useI18n } from "@/libs/i18n/context";

type AwardDetailCardProps = {
  award: AwardCategoryDetail;
  reversed: boolean;
};

export function AwardDetailCard({ award, reversed }: AwardDetailCardProps) {
  const [imageError, setImageError] = useState(false);
  const { t } = useI18n();

  return (
    <section id={award.slug} aria-labelledby={`award-title-${award.slug}`}>
      <div
        data-testid="card-content-row"
        className={`flex items-start gap-6 md:gap-6 lg:gap-10 ${
          reversed
            ? "flex-col lg:flex-row-reverse"
            : "flex-col lg:flex-row"
        }`}
      >
        {/* Award Image — golden ring background + name overlay */}
        <div className="flex-shrink-0 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[280px] md:max-w-none md:w-[260px] md:h-[260px] lg:w-[336px] lg:h-auto aspect-square">
            {imageError ? (
              <div className="w-full h-full bg-[#2E3940] rounded-lg flex items-center justify-center">
                <span className="text-[#FFEA9E] text-sm font-bold text-center px-4">
                  {award.name}
                </span>
              </div>
            ) : (
              <>
                {/* Golden ring background */}
                <Image
                  src="/images/award-bg.png"
                  alt=""
                  width={336}
                  height={336}
                  loading="lazy"
                  sizes="(max-width: 768px) 280px, 336px"
                  className="w-full h-full object-contain"
                />
                {/* Award name overlay centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={award.image}
                    alt={award.name}
                    width={222}
                    height={36}
                    loading="lazy"
                    className="w-[60%] h-auto object-contain"
                    onError={() => setImageError(true)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Block */}
        <div className="flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]">
          {/* Title Row */}
          <div className="flex items-center gap-4">
            <TargetIcon className="w-6 h-6 text-white flex-shrink-0" />
            <h3
              id={`award-title-${award.slug}`}
              className="text-2xl font-bold text-[#FFEA9E] leading-8"
            >
              {award.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-base font-bold text-white leading-6 tracking-[0.5px] max-w-[480px] text-justify whitespace-pre-line">
            {award.description}
          </p>

          {/* Divider */}
          <div className="w-full max-w-[480px] h-px bg-[#2E3940]" />

          {/* Quantity Row */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <DiamondIcon className="w-6 h-6 text-white flex-shrink-0" />
              <span className="text-2xl font-bold text-[#FFEA9E] leading-8">
                {t("awards.quantity_label")}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-[28px] md:text-4xl font-bold text-white leading-[36px] md:leading-[44px]">
                {String(award.quantity).padStart(2, "0")}
              </span>
              <span className="text-sm font-bold text-white leading-5 tracking-[0.1px] pb-1">
                {award.unit}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-[480px] h-px bg-[#2E3940]" />

          {/* Prize Value Row(s) */}
          {award.prizes.map((prize, index) => (
            <div key={index} className="flex flex-col gap-6">
              {index > 0 && (
                <div className="w-full max-w-[480px] h-px bg-[#2E3940]" />
              )}
              <div className="flex items-center gap-4">
                <LicenseIcon className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-2xl font-bold text-[#FFEA9E] leading-8">
                  {t("awards.prize_value_label")}
                </span>
              </div>
              <span className="text-[28px] md:text-4xl font-bold text-white leading-[36px] md:leading-[44px]">
                {prize.value}
              </span>
              <span className="text-sm font-bold text-white leading-5 tracking-[0.1px]">
                {prize.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
