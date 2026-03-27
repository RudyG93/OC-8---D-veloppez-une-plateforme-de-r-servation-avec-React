/** Squelette de chargement pour la page de détail d'un logement. */
export default function PropertyLoading() {
    return (
        <main className="mx-auto max-w-6xl px-5 py-8 animate-pulse">
            <div className="h-6 w-32 rounded bg-light-gray" />
            <div className="mt-6 h-72 rounded-[10px] bg-light-gray md:h-96" />
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:justify-between">
                <div className="h-8 w-64 rounded bg-light-gray" />
                <div className="h-8 w-32 rounded bg-light-gray" />
            </div>
        </main>
    );
}
