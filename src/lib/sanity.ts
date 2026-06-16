import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'lsded7br', // Ditt Sanity Project ID
  dataset: 'production',
  useCdn: true, // `false` om du vill säkerställa 100% färsk data oavsett, `true` för snabbhet i prod
  apiVersion: '2024-03-01', // Använd dagens datum (när projektet sattes upp)
});

// Helper för att generera bild-URL:er från Sanity
const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};
