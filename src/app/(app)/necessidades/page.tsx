import { Metadata } from "next";
import { Necessidades } from "@/components/necessidades";

export const metadata: Metadata = {
  title: "Necessidades",
  description: "",
};

export default function NecessidadesPage() {
  return (
    <>
      <Necessidades />
    </>
  );
}
