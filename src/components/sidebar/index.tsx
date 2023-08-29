"use client";
import {
  MdFormatListBulleted,
  MdOutlineDashboard,
  MdTrendingDown,
  MdSwapVert,
  MdTrendingUp,
} from "react-icons/md";
import { Link } from "./link";

export function Sidebar() {
  return (
    <aside className="fixed inset-0 z-50 h-full w-[260px] border-r border-r-gray-300/50 bg-white px-4 shadow-lg">
      <div className="flex items-center justify-center py-4 ">
        <span className="text-center text-xl font-bold text-[#3c4858]">
          Minhas Finanças
        </span>
      </div>
      <div className="w-full border-t border-t-gray-200" />
      <div className="mt-5 flex min-h-screen flex-col gap-2 overflow-y-auto">
        <Link href={"/"} icon={MdOutlineDashboard}>
          Dashboard
        </Link>
        {/* <Link href={"/rendas"} icon={MdSwapVert}>
          Transações
        </Link> */}
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
