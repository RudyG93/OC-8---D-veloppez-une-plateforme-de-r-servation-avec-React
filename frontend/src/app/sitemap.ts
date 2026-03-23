/**
 * Sitemap dynamique généré par Next.js.
 * Récupère toutes les propriétés depuis l'API pour créer les URLs.
 * Accessible à /sitemap.xml
 */
import { getProperties } from "@/api/properties";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const properties = await getProperties();

    const propertyEntries: MetadataRoute.Sitemap = properties.map((p) => ({
        url: `${SITE_URL}/properties/${p.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...propertyEntries,
    ];
}
