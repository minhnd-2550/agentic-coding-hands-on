'use client';

import Image from 'next/image';
import { useI18n } from '@/libs/i18n/context';
import { KudosInputBar } from './KudosInputBar';

export function KudosHero() {
  const { t } = useI18n();

  return (
    <section className="relative h-auto min-h-[300px] w-full overflow-hidden sm:h-[512px]">
      {/* Background */}
      <Image
        src="/images/kudos-hero-bg.png"
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(25deg, #00101A 14.74%, rgba(0, 19, 32, 0.00) 47.8%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end gap-4 px-4 pb-8 pt-24 sm:gap-6 sm:px-36 sm:pb-12">
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-2xl font-bold leading-tight text-white sm:text-4xl sm:leading-[44px]">
            {t('kudos.hero_title')}
          </p>
          <Image
            src="/images/kudos-logo.svg"
            alt="KUDOS"
            width={593}
            height={106}
            className="h-auto w-[200px] sm:w-[400px] lg:w-[593px]"
          />
        </div>
        <KudosInputBar />
      </div>
    </section>
  );
}
