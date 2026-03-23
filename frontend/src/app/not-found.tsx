import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
            <h1 className="text-6xl font-bold text-main-red">404</h1>
            <p className="text-lg text-dark-gray">
                La page que vous recherchez n&apos;existe pas.
            </p>
            <Link
                href="/"
                className="rounded-[10px] bg-main-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-dark-orange"
            >
                Retour à l&apos;accueil
            </Link>
        </main>
    );
}
