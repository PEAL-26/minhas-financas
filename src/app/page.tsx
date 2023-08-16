import { MainContent } from "@/components/main-content";

export default function Home() {
  return (
    <main className="p-10 flex flex-col justify-center items-center">
      <h2 className="font-bold text-center text-3xl mb-10">Minhas Finanças</h2>
      <MainContent />
    </main>
  );
}
