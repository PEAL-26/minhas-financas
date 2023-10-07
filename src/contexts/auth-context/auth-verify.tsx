"use client";
import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "./auth-context";
import { Loading } from "@/components/compounds/loading";
import { useRouter, redirect } from "next/navigation";

export function VerifyAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  console.log({ isAuthenticated });

  useEffect(() => {
    setIsLoading(false);
  }, []);

//   if (isLoading)
//     return (
//       <div className="flex min-h-screen w-full items-center justify-center">
//         <Loading />
//       </div>
//     );

  if (!isAuthenticated) redirect("/login");

  return <>{children}</>;
}
