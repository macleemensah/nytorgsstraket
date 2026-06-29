import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'lsded7br',
  dataset: 'production',
  useCdn: false, // Direkta API:et (api.sanity.io) – CDN har separat CORS-lista
  apiVersion: '2024-03-01',
  // Read-only viewer token – krävs eftersom datasetet kräver autentisering
  // Läggs till i .env som VITE_SANITY_READ_TOKEN och i Vercel Environment Variables
  token: import.meta.env.VITE_SANITY_READ_TOKEN || undefined,
});

// Helper för att generera bild-URL:er från Sanity
const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};
