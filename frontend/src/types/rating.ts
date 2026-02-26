import type { User } from './user';

/** Note renvoyée par GET /api/properties/:id/ratings */
export interface Rating {
    id: number;
    score: number;
    comment: string | null;
    created_at: string;
    user: User;
}

/** Corps de requête pour POST /api/properties/:id/ratings */
export interface CreateRatingBody {
    user_id: number;
    score: number;
    comment?: string;
}

/** Réponse de POST /api/properties/:id/ratings */
export interface CreateRatingSummary {
    rating_avg: number;
    ratings_count: number;
    ratings: Rating[];
}
