"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Loading } from "@/components/compounds/loading";
import { useAlertContext } from "@/contexts/alert-context";
import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "@/libs/material-tailwind";

export function LoginGoogleButton() {
  const { loginWithGoogle } = useAuthContext();
  const { showAlert } = useAlertContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.log(error)
      showAlert("Erro ao efetuar o login com o Google");
    } finally {
      setIsLoading(false);
    }
  };
    
  return (
    <Button
      variant="outlined"
      fullWidth
      className="flex h-14 items-center justify-center gap-2"
      onClick={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? <Loading size={28} /> : <FcGoogle size={28} />}
      Continuar com o Google
    </Button>
  );
}
