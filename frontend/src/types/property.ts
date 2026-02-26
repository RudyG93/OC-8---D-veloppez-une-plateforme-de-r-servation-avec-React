import type { Host } from './user';

/** Propriété renvoyée par GET /api/properties (liste) */
export interface Property {
    id: string;
    title: string;
    slug: string;
    cover: string | null;
    description: string | null;
    host: Host;
    rating_avg: number;
    ratings_count: number;
    location: string | null;
    price_per_night: number;
}

/** Propriété renvoyée par GET /api/properties/:id (détail complet) */
export interface PropertyDetail extends Property {
    pictures: string[];
    equipments: string[];
    tags: string[];
}

/** Corps de requête pour POST /api/properties */
export interface CreatePropertyBody {
    title: string;
    id?: string;
    description?: string;
    cover?: string;
    location?: string;
    price_per_night?: number;
    host_id?: number;
    host?: { name: string; picture?: string };
    pictures?: string[];
    equipments?: string[];
    tags?: string[];
}

/** Corps de requête pour PATCH /api/properties/:id */
export interface UpdatePropertyBody {
    title?: string;
    description?: string;
    cover?: string;
    location?: string;
    price_per_night?: number;
    host_id?: number;
}
