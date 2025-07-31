import { HeroInscreverSe } from './inscrever-se';
import { MockUp } from './mockup';

export function HomeHero() {
  return (
    <section className="relative mt-6 h-[556px] w-full rounded-t-[52px] bg-green-500 pt-16 text-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-base">Abraçando a modernidade</span>
        <hr className="mt-2 h-px w-40 rounded-full border-0 bg-gray-200/50" />
        <span className="mt-7 max-w-md text-4xl">
          Gerencie suas finanças com
          <span className="font-bold"> facilidade e eficiência</span>
        </span>
        <span className="mt-10 max-w-md text-base">
          Você terá o que precisa para controlar suas <br />
          despesas, rendas, e alcançar seus objetivos financeiros.
        </span>
        <HeroInscreverSe />
      </div>
      <MockUp />
    </section>
  );
}
