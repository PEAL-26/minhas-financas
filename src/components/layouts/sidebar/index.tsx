"use client";
import {
  MdFormatListBulleted,
  MdOutlineDashboard,
  MdTrendingDown,
  MdSwapVert,
  MdTrendingUp,
} from "react-icons/md";
import Image from "next/image";
import LinkNext from "next/link";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

import useMediaQuery from "@/hooks/use-media-query";
import { useSidebarContext } from "@/contexts/sidebar-menu-context";

import { Link } from "./link";
import { Search } from "./search";
import { CloseSideBar } from "./close-sidebar";

export function Sidebar() {
  const isDevice = useMediaQuery("(max-width: 959px)");
  const { isOpen, close } = useSidebarContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const body = document.body;

    if (isDevice) {
      setShow(isOpen);

      if (show) {
        body.classList.add("overflow-hidden");
      } else {
        body.classList.remove("overflow-hidden");
      }
    } else {
      setShow(true);
    }

    return () => {
      setShow(false);
      body.classList.remove("overflow-hidden");
    };
  }, [isDevice, isOpen, show]);

  useEffect(() => {
    close();
  }, [isDevice]);

  return (
    <div
      onClick={(e) => e.target == e.currentTarget && isDevice && close()}
      data-open={show}
      className="fixed inset-0 z-50 bg-black/30 transition-transform duration-300 data-[open=false]:-translate-x-[1023px] data-[open=true]:translate-x-0 lg:inset-y-0 lg:w-[260px] lg:translate-x-0"
    >
      <aside
        className={twMerge(
          "h-full w-[260px] border-r border-r-gray-300/50 bg-white px-4 shadow-lg "
        )}
      >
        <LinkNext
          href="/"
          className="flex items-center justify-center gap-2 py-4 hover:bg-transparent"
        >
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
        </LinkNext>
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
      <CloseSideBar />
    </div>
  );
}
