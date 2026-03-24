type DigitBoxProps = {
  digit: string;
};

export function DigitBox({ digit }: DigitBoxProps) {
  return (
    <div
      className="w-[48px] h-[76px] md:w-[60px] md:h-[96px] lg:w-[77px] lg:h-[123px] rounded-xl flex items-center justify-center"
      style={{
        border: "0.75px solid rgba(255, 234, 158, 0.5)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }}
      aria-label={`digit ${digit}`}
    >
      <span
        className="font-[family-name:var(--font-digital-numbers)] text-[44px] md:text-[56px] lg:text-[73.7px] text-white leading-none"
      >
        {digit}
      </span>
    </div>
  );
}
