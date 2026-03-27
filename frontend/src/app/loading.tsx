/** Squelette de chargement pour la page d'accueil. */
export default function HomeLoading() {
    return (
        <main className="animate-pulse">
            <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 text-center md:pt-14 md:pb-10">
                <div className="mx-auto h-8 w-72 rounded bg-light-gray" />
                <div className="mx-auto mt-3 h-4 w-96 rounded bg-light-gray" />
                <div className="mt-8 h-72 rounded-[10px] bg-light-gray md:h-72 lg:h-80" />
            </section>
            <section className="mx-auto max-w-6xl px-5 py-6 md:py-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-72 rounded-[10px] bg-light-gray" />
                    ))}
                </div>
            </section>
        </main>
    );
}
