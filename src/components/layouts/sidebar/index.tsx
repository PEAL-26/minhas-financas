"use client";
import {
  MdFormatListBulleted,
  MdOutlineDashboard,
  MdTrendingDown,
  MdSwapVert,
  MdTrendingUp,
} from "react-icons/md";
import Image from "next/image";

import { Link } from "./link";
import { Search } from "./search";

export function Sidebar() {
  return (
    <aside
      data-open={true}
      className="fixed inset-0 z-50 h-full w-[260px] border-r border-r-gray-300/50 bg-white px-4 shadow-lg transition-transform duration-300 data-[open=false]:-translate-x-80 data-[open=true]:translate-x-0 xl:translate-x-0"
    >
      <div className="flex items-center justify-center gap-2 py-4">
        <Image
          src={"/images/logo-w736.png"}
          height={36}
          width={36}
          alt="logo-minhas-finacas"
          className="object-cover "
        />
        <span className="text-center text-xl font-bold text-[#616973]">
          Minhas Finanças
        </span>
      </div>
      <div className="w-full border-t border-t-gray-200" />
      <div className="mt-5 flex min-h-screen flex-col gap-2 overflow-y-auto">
        <Search />
        <Link href={"/"} icon={MdOutlineDashboard}>
          Dashboard
        </Link>
        <Link href={"/transacoes"} icon={MdSwapVert}>
          Transações
        </Link>
        <Link href={"/rendas"} icon={MdTrendingUp}>
          Rendas
        </Link>
        <Link href={"/despesas"} icon={MdTrendingDown}>
          Despesas
        </Link>
        <Link href={"/necessidades"} icon={MdFormatListBulleted}>
          Necessidades
        </Link>
      </div>
    </aside>
  );
}
