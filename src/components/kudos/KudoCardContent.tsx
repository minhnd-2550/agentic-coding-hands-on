'use client';

import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { useI18n } from '@/libs/i18n/context';
import { truncateText } from '@/utils/kudos';

const ALLOWED_TAGS = ['p', 'strong', 'em', 's', 'ol', 'li', 'a', 'blockquote', 'br', 'span'];
const ALLOWED_ATTR = ['href', 'target', 'rel', 'class', 'data-type', 'data-id', 'data-label'];

function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

interface KudoCardContentProps {
  content: string;
  maxLines?: number;
}

export function KudoCardContent({ content, maxLines = 5 }: KudoCardContentProps) {
  const { t } = useI18n();
  const isHtml = isHtmlContent(content);

  const sanitizedHtml = useMemo(() => {
    if (!isHtml || typeof window === 'undefined') return '';
    return DOMPurify.sanitize(content, { ALLOWED_TAGS, ALLOWED_ATTR });
  }, [content, isHtml]);

  if (isHtml) {
    return (
      <div className="font-montserrat text-base font-bold leading-8 text-[#2E3940] sm:text-xl sm:leading-8">
        <div
          className="prose prose-sm max-w-none [&_a]:text-[#3B82F6] [&_a]:underline [&_.mention]:text-[#3B82F6] [&_.mention]:font-semibold"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
    );
  }

  // Legacy plain text rendering
  const displayText = truncateText(content, maxLines);
  const isTruncated = displayText !== content;

  return (
    <div className="font-montserrat text-base font-bold leading-8 text-[#2E3940] sm:text-xl sm:leading-8">
      <p className="whitespace-pre-line">{displayText}</p>
      {isTruncated && (
        <span className="cursor-pointer text-sm font-medium text-[#999] hover:text-[#998C5F]">
          {t('kudos.read_more')}
        </span>
      )}
    </div>
  );
}
