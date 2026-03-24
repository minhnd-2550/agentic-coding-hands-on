'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { scaleLog } from 'd3-scale';
import { zoom as d3Zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import { SearchIcon, PanZoomIcon } from '@/components/icons/KudosIcons';
import { useI18n } from '@/libs/i18n/context';
import type { SpotlightEntry } from '@/types/kudos';

interface SpotlightWordCloudProps {
  data: SpotlightEntry[];
  totalKudos: number;
  width: number;
  height: number;
}

interface WordData {
  text: string;
  value: number;
}

const COLORS = ['#FFEA9E', '#DBD1C1', '#999999', '#FFEA9E', '#FFF8E1'];

function getColor(index: number) {
  return COLORS[index % COLORS.length];
}

export function SpotlightWordCloud({ data, totalKudos, width, height }: SpotlightWordCloudProps) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  const words: WordData[] = useMemo(
    () => data.map((entry) => ({ text: entry.name, value: entry.kudos_count })),
    [data]
  );

  const fontScale = useMemo(() => {
    const maxValue = Math.max(...words.map((w) => w.value), 1);
    return scaleLog()
      .domain([1, maxValue])
      .range([8, 48]);
  }, [words]);

  // D3 zoom
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const svg = select(svgRef.current);
    const g = select(gRef.current);

    const zoomBehavior = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, zoomIdentity.translate(width / 2, height / 2));

    return () => {
      svg.on('.zoom', null);
    };
  }, [width, height]);

  const matchesSearch = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-montserrat text-xl font-bold text-white sm:text-[32px] sm:leading-10">
          {totalKudos} KUDOS
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-[#998C5F]/50 bg-transparent px-3 py-1.5">
            <SearchIcon size={16} className="text-[#999]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('kudos.spotlight_search')}
              className="w-20 bg-transparent font-montserrat text-sm text-white placeholder-[#999] outline-none sm:w-32"
            />
          </div>
          <button className="rounded-lg border border-[#998C5F]/50 p-1.5 text-[#FFEA9E] transition-colors hover:bg-[rgba(255,234,158,0.1)]">
            <PanZoomIcon size={20} />
          </button>
        </div>
      </div>

      {/* Word cloud */}
      <svg ref={svgRef} width={width} height={height - 56} className="cursor-grab active:cursor-grabbing">
        <g ref={gRef}>
          <Wordcloud
            words={words}
            width={width}
            height={height - 56}
            fontSize={(w) => fontScale((w as WordData).value)}
            font="Montserrat"
            fontWeight={700}
            spiral="archimedean"
            rotate={0}
            random={() => 0.5}
          >
            {(cloudWords) =>
              cloudWords.map((w, i) => (
                <text
                  key={w.text}
                  transform={`translate(${w.x}, ${w.y})`}
                  fontSize={w.size}
                  fontFamily="Montserrat"
                  fontWeight={700}
                  fill={getColor(i)}
                  textAnchor="middle"
                  opacity={matchesSearch(w.text || '') ? 1 : 0.15}
                  className="transition-opacity duration-200"
                >
                  {w.text}
                </text>
              ))
            }
          </Wordcloud>
        </g>
      </svg>
    </div>
  );
}
