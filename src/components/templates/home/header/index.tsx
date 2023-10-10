"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/libs/material-tailwind";

export function HomeHeader() {
  const router = useRouter();

  return (
    <header id="home" className="bg-white">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/images/logo-w736.png"
            alt="minhas-financas-logo"
            width={36.71}
            height={40}
          />
          <span className="text-xl font-bold text-[#616973]">
            Minhas Finanças
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="#home" className="text-[#616973]">
            Home
          </Link>
          <Link href="#faqs" className="text-[#616973]">
            FAQs
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="text"
            onClick={() => router.push("/login")}
            className="text-[#616973]"
          >
            Login
          </Button>
          <Button color="green" onClick={() => router.push("/inscrever-se")}>
            Inscrever-se
          </Button>
        </div>
      </div>
    </header>
  );
}
