'use client';

//import { Button } from '@repo/ui/button';
//import { AlertCircle } from 'lucide-react';
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
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
                  {/* <AlertCircle className="h-12 w-12 text-destructive" /> */}
                </div>
                <div className="absolute -right-2 top-0">
                  <div className="h-8 w-8 animate-bounce rounded-full bg-secondary" />
                </div>
                <div className="absolute -left-4 bottom-0">
                  <div className="h-6 w-6 animate-bounce rounded-full bg-primary delay-100" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="mb-4 text-3xl font-bold text-secondary md:text-4xl">
              Ops! Algo correu mal
            </h1>

            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
              Pedimos desculpa pelo inconveniente. Ocorreu um erro inesperado. A nossa equipa foi
              notificada e está a trabalhar para corrigir o problema.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {/* <Button
                onClick={reset}
                //variant="default"
                className="bg-secondary text-white hover:bg-secondary/90"
              >
                Tentar novamente
              </Button>

              <Button
                //asChild
                //variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
              >
                <Link href="/">Voltar para Home</Link>
              </Button> */}
            </div>

            {/* Error Details */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 rounded-lg bg-muted p-4 text-left">
                <p className="font-mono text-sm text-muted-foreground">Error: {error.message}</p>
                {error.digest && (
                  <p className="font-mono mt-2 text-sm text-muted-foreground">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="pointer-events-none fixed inset-0">
            <div className="absolute left-[10%] top-[20%] h-4 w-4 animate-pulse rounded-full bg-primary" />
            <div className="absolute right-[15%] top-[30%] h-3 w-3 animate-pulse rounded-full bg-secondary delay-75" />
            <div className="absolute bottom-[25%] left-[20%] h-5 w-5 animate-pulse rounded-full bg-primary delay-150" />
            <div className="absolute bottom-[15%] right-[25%] h-4 w-4 animate-pulse rounded-full bg-secondary delay-200" />
          </div>
        </div>
      </body>
    </html>
  );
}
