import Image from 'next/image';

/** Logo USEGET: ícone + nome. */
export function Wordmark({ className = 'text-[21px] md:text-[22px]' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[7px] leading-none font-extrabold tracking-[-0.06em] ${className}`}>
      <Image src="/images/useget-icon.png" alt="" width={256} height={256} className="size-[1.3em] object-contain" />
      USEGET
    </span>
  );
}
