import { getProperties } from '@/api/properties';

export default async function Home() {
    const properties = await getProperties();

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Kasa — Propriétés ({properties.length})</h1>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                {properties.map((property) => (
                    <li key={property.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
                        <h2>{property.title}</h2>
                        <p>{property.location} — {property.price_per_night}€/nuit</p>
                        <p>⭐ {property.rating_avg}/5 ({property.ratings_count} avis)</p>
                        <p style={{ color: '#666' }}>Hébergé par {property.host.name}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
