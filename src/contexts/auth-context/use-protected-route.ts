"use client";
import { useEffect } from "react";
import { useRouter, useSelectedLayoutSegment, redirect } from "next/navigation";

import { User } from "./types";

export function useProtectedRoute(user: User | null) {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  const isPublicRoute = segment === "(auth)";

  useEffect(() => {
    if (!user && !isPublicRoute) {
      // router.replace("/login");
      redirect("/login");
    } else if (user && isPublicRoute) {
      router.replace("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, segment]);
}
