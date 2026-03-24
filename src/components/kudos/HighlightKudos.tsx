'use client';

import { useState } from 'react';
import { useI18n } from '@/libs/i18n/context';
import { SectionHeader } from './SectionHeader';
import { HighlightCarousel } from './HighlightCarousel';
import { FilterDropdown } from './FilterDropdown';
import { KudoSkeleton } from './KudoSkeleton';
import { SectionError } from './SectionError';
import { EmptyState } from './EmptyState';
import type { KudosWithUser, Hashtag, Department } from '@/types/kudos';

interface HighlightKudosProps {
  initialHighlights?: KudosWithUser[];
  hashtags?: Hashtag[];
  departments?: Department[];
}

export function HighlightKudos({
  initialHighlights = [],
  hashtags = [],
  departments = [],
}: HighlightKudosProps) {
  const { t } = useI18n();
  const [highlights] = useState<KudosWithUser[]>(initialHighlights);
  const [hashtagFilter, setHashtagFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const filteredHighlights = highlights.filter((k) => {
    if (hashtagFilter && !k.hashtags.includes(hashtagFilter)) return false;
    if (departmentFilter) {
      const matchSender = k.sender.department_id === departmentFilter;
      const matchReceiver = k.receiver.department_id === departmentFilter;
      if (!matchSender && !matchReceiver) return false;
    }
    return true;
  });

  const hashtagOptions = hashtags.map((h) => ({ value: h.name, label: h.name }));
  const departmentOptions = departments.map((d) => ({ value: d.id, label: d.name }));

  return (
    <section className="flex w-full flex-col gap-10 py-10 sm:py-20">
      <SectionHeader subtitle={t('kudos.section_subtitle')} title={t('kudos.highlight_title')}>
        <FilterDropdown
          label={t('kudos.filter_hashtag')}
          options={hashtagOptions}
          onFilter={setHashtagFilter}
          selectedValue={hashtagFilter}
        />
        <FilterDropdown
          label={t('kudos.filter_department')}
          options={departmentOptions}
          onFilter={setDepartmentFilter}
          selectedValue={departmentFilter}
        />
      </SectionHeader>

      {isLoading ? (
        <div className="px-4 sm:px-36">
          <KudoSkeleton />
        </div>
      ) : error ? (
        <div className="px-4 sm:px-36">
          <SectionError message={t('kudos.error_load')} onRetry={() => {}} />
        </div>
      ) : filteredHighlights.length === 0 ? (
        <div className="px-4 sm:px-36">
          <EmptyState message={hashtagFilter || departmentFilter ? t('kudos.no_results') : t('kudos.no_highlights')} />
        </div>
      ) : (
        <HighlightCarousel highlights={filteredHighlights} />
      )}
    </section>
  );
}
