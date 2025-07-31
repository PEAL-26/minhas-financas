import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="pt-AO">
      <body className={`${/*poppins.className*/ ''} antialiased`}>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="relative">
            <div className="relative flex items-center text-[180px] font-bold text-primary md:text-[250px]">
              <div>4</div>
              <div>0</div>
              <div>4</div>
            </div>
          </div>
          <h1 className="mb-2 mt-6 text-2xl font-bold text-primary md:text-3xl">
            Oops... Página não encontrada!
          </h1>
          <p className="mb-8 text-center text-gray-500">
            A página que procura não foi encontrada, talvez não exista ou tenha sido removida.
          </p>

          {/* Go Back Button */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-primary p-4 text-white transition-colors hover:bg-primary-500"
          >
            Voltar para Home
          </Link>
        </div>
      </body>
    </html>
  );
}
