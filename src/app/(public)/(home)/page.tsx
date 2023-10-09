import { HomeHeader } from "@/components/templates/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "",
};

export default function HomePage() {
  return <HomeHeader />;
}
