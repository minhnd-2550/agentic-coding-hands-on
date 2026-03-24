'use client';

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ subtitle, title, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-36">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-base font-bold leading-8 text-[#FFEA9E] sm:text-2xl sm:leading-8">
            {subtitle}
          </p>
          <h2 className="font-montserrat text-3xl font-bold leading-tight text-[#FFEA9E] sm:text-[57px] sm:leading-[64px]">
            {title}
          </h2>
        </div>
        {children && <div className="flex items-center gap-4">{children}</div>}
      </div>
    </div>
  );
}
