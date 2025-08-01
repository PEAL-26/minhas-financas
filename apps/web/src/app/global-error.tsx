'use client';

import { Button } from '@repo/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <div className="mx-auto max-w-2xl text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="relative">
                <div className="bg-destructive/10 mx-auto flex h-24 w-24 items-center justify-center rounded-full">
                  <AlertCircle className="text-destructive h-12 w-12" />
                </div>
                <div className="absolute -right-2 top-0">
                  <div className="bg-secondary h-8 w-8 animate-bounce rounded-full" />
                </div>
                <div className="absolute -left-4 bottom-0">
                  <div className="h-6 w-6 animate-bounce rounded-full bg-primary delay-100" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-secondary mb-4 text-3xl font-bold md:text-4xl">
              Ops! Algo correu mal
            </h1>

            <p className="text-muted-foreground mx-auto mb-8 max-w-md">
              Pedimos desculpa pelo inconveniente. Ocorreu um erro inesperado. A nossa equipa foi
              notificada e está a trabalhar para corrigir o problema.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                onClick={reset}
                //variant="default"
                className="bg-secondary hover:bg-secondary/90 text-white"
              >
                Tentar novamente
              </Button>

              <Button
                //asChild
                //variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
              >
                <Link href="/">Voltar para Home</Link>
              </Button>
            </div>

            {/* Error Details */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-muted mt-8 rounded-lg p-4 text-left">
                <p className="font-mono text-muted-foreground text-sm">Error: {error.message}</p>
                {error.digest && (
                  <p className="font-mono text-muted-foreground mt-2 text-sm">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="pointer-events-none fixed inset-0">
            <div className="absolute left-[10%] top-[20%] h-4 w-4 animate-pulse rounded-full bg-primary" />
            <div className="bg-secondary absolute right-[15%] top-[30%] h-3 w-3 animate-pulse rounded-full delay-75" />
            <div className="absolute bottom-[25%] left-[20%] h-5 w-5 animate-pulse rounded-full bg-primary delay-150" />
            <div className="bg-secondary absolute bottom-[15%] right-[25%] h-4 w-4 animate-pulse rounded-full delay-200" />
          </div>
        </div>
      </body>
    </html>
  );
}
