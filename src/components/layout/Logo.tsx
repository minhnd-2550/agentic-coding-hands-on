import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  clickable?: boolean;
};

export function Logo({ clickable = false }: LogoProps) {
  const image = (
    <Image
      src="/icons/logo-saa.png"
      alt="Sun Annual Awards 2025"
      width={52}
      height={48}
      priority
    />
  );

  if (clickable) {
    return (
      <Link href="/" className="block">
        {image}
      </Link>
    );
  }

  return <div>{image}</div>;
}
