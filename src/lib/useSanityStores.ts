import { useState, useEffect } from 'react';
import { client, urlFor } from './sanity';
import { STORES } from '../data/stores';

export interface SanityStore {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  address?: string;
  openHours?: string;
  image: any;
  websiteUrl?: string;
  locationMapUrl?: string;
  tags?: string[];
  instagramHandle?: string;
}

// Maps a Sanity store to the format used by the existing app
function mapSanityStore(item: SanityStore) {
  return {
    slug: item.slug.current,
    name: item.title,
    category: item.category as any,
    description: item.description,
    address: item.address || '',
    openHours: item.openHours || '',
    heroImage: item.image ? urlFor(item.image).width(800).url() : '',
    websiteUrl: item.websiteUrl,
    locationMapUrl: item.locationMapUrl,
    tags: item.tags || [],
    isClosed: false,
    overrideUrl: undefined,
    instagramHandle: item.instagramHandle,
  };
}

/**
 * Hook that fetches stores from Sanity.
 * Falls back to hardcoded STORES if Sanity returns nothing (e.g. empty project).
 */
export function useSanityStores(category?: string) {
  const [stores, setStores] = useState<ReturnType<typeof mapSanityStore>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fromSanity, setFromSanity] = useState(false);

  useEffect(() => {
    const categoryFilter = category ? `&& category == "${category}"` : '';
    client
      .fetch<SanityStore[]>(
        `*[_type == "store" ${categoryFilter}] | order(title asc) {
          _id, title, slug, category, description, address, openHours, image, websiteUrl, locationMapUrl, tags, instagramHandle
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          setStores(data.map(mapSanityStore));
          setFromSanity(true);
        } else {
          // Fallback to hardcoded data
          const filtered = category
            ? STORES.filter((s) => s.category === category)
            : STORES;
          setStores(filtered as any);
        }
      })
      .catch(() => {
        const filtered = category
          ? STORES.filter((s) => s.category === category)
          : STORES;
        setStores(filtered as any);
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  return { stores, isLoading, fromSanity };
}
