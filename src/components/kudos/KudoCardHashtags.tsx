'use client';

interface KudoCardHashtagsProps {
  hashtags: string[];
  hashtagLabel?: string;
  onHashtagClick?: (hashtag: string) => void;
}

export function KudoCardHashtags({ hashtags, hashtagLabel, onHashtagClick }: KudoCardHashtagsProps) {
  if (!hashtags || hashtags.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {hashtagLabel && (
        <span className="inline-block w-fit rounded bg-[rgba(241,118,118,0.2)] px-2 py-0.5 font-montserrat text-sm font-bold text-[#F17676]">
          {hashtagLabel}
        </span>
      )}
      <div className="flex flex-wrap gap-1.5">
        {hashtags.slice(0, 5).map((tag) => (
          <button
            key={tag}
            onClick={() => onHashtagClick?.(tag)}
            className="font-montserrat text-sm font-bold text-[#F17676] transition-opacity hover:opacity-70"
          >
            #{tag}
          </button>
        ))}
        {hashtags.length > 5 && (
          <span className="font-montserrat text-sm text-[#999]">...</span>
        )}
      </div>
    </div>
  );
}
