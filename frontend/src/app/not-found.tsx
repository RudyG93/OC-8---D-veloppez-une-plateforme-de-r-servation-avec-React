import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-10 md:gap-10 md:px-6">
      <h1 className="text-7xl font-inter font-black text-main-red md:text-9xl">404</h1>
      <div className="max-w-xl">
        <p className="text-center text-base text-black md:text-lg">
          Il semble que la page que vous cherchez ait pris des vacances… ou
          n&apos;ait jamais existé.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-[10px] bg-main-red px-10 py-2.5 text-sm font-medium text-white transition-colors hover:bg-dark-orange md:px-16 md:py-3 md:text-base"
      >
        Accueil
      </Link>
    </main>
  );
}
