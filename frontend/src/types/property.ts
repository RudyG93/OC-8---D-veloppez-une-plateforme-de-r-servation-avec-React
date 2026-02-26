export interface Host {
    id: number;
    name: string;
    picture: string;
}

/** Propriété renvoyée par GET /api/properties (liste) */
export interface Property {
    id: string;
    title: string;
    slug: string;
    cover: string;
    description: string;
    host: Host;
    rating_avg: number;
    ratings_count: number;
    location: string;
    price_per_night: number;
}

/** Propriété renvoyée par GET /api/properties/:id (détail complet) */
export interface PropertyDetail extends Property {
    pictures: string[];
    equipments: string[];
    tags: string[];
}
