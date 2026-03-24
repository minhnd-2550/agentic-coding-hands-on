'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from '@/components/icons/KudosIcons';

interface KudoCardMediaProps {
  images: string[];
  mediaType: 'image' | 'video' | null;
}

export function KudoCardMedia({ images, mediaType }: KudoCardMediaProps) {
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set());

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 5);
  const remaining = images.length - 5;

  const handleError = (index: number) => {
    setFailedIndexes((prev) => new Set(prev).add(index));
  };

  return (
    <div className="flex gap-2 overflow-x-auto">
      {displayImages.map((src, index) => (
        <div
          key={index}
          className="relative h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-lg bg-[#998C5F]/20 sm:h-[100px] sm:w-[100px]"
        >
          {failedIndexes.has(index) ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1 text-center">
              <span className="font-montserrat text-[8px] text-[#999]">
                {mediaType === 'video' ? 'Video khong the tai' : 'Loi tai anh'}
              </span>
            </div>
          ) : (
            <>
              <Image
                src={src}
                alt={`Attachment ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
                onError={() => handleError(index)}
              />
              {mediaType === 'video' && index === 0 && (
                <button className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/50">
                  <PlayIcon size={32} className="text-white" />
                </button>
              )}
              {index === 4 && remaining > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <span className="font-montserrat text-sm font-bold text-white">
                    +{remaining}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
