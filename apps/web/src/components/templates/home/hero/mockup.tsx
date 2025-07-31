import Image from 'next/image';

export function MockUp() {
  return (
    <div className="absolute bottom-0 left-1/2 flex h-80 -translate-x-1/2 translate-y-1/2 gap-8">
      <div className="relative h-80 w-[664px] rounded-md bg-white shadow">
        <Image
          src="/images/mockup-pc.png"
          alt="minhas-financas-mockup-pc"
          className="h-full w-full rounded-md object-cover"
          priority
          fill
        />
      </div>
      <div className="relative h-80 w-40 rounded-md bg-white shadow">
        <Image
          src="/images/mockup-mobile.png"
          alt="minhas-financas-mockup-mobile"
          className="h-full w-full rounded-md object-cover"
          fill
        />
      </div>
    </div>
  );
}
