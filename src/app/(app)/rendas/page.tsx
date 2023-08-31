import { Metadata } from "next";
import { Rendas } from "@/components/templates/rendas";

export const metadata: Metadata = {
  title: "Rendas",
  description: "",
};

export default function RendasPage() {
  return (
    <>
      <Rendas />
    </>
  );
}
