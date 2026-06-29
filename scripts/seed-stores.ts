import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { createClient } from '@sanity/client';

// Load .env
dotenv.config();

import { STORES } from '../src/data/stores';

const projectId = 'lsded7br';
const dataset = 'production';
const writeToken = process.env.SANITY_WRITE_TOKEN;

if (!writeToken) {
  console.error('ERROR: SANITY_WRITE_TOKEN is missing in environment variables.');
  process.exit(1);
}

const sanity = createClient({
  projectId,
  dataset,
  token: writeToken,
  useCdn: false,
  apiVersion: '2024-03-01',
});

async function uploadImageAsset(imagePathOrUrl: string, slug: string): Promise<string | null> {
  try {
    if (imagePathOrUrl.startsWith('http://') || imagePathOrUrl.startsWith('https://')) {
      // Remote URL
      console.log(`  - Fetching remote image for "${slug}": ${imagePathOrUrl}`);
      const res = await fetch(imagePathOrUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch image: HTTP ${res.status}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const asset = await sanity.assets.upload('image', buffer, {
        filename: `${slug}_hero.jpg`,
      });
      return asset._id;
    } else {
      // Local path
      const relativePath = imagePathOrUrl.startsWith('/') ? imagePathOrUrl.slice(1) : imagePathOrUrl;
      const absolutePath = path.join(process.cwd(), relativePath);

      if (!fs.existsSync(absolutePath)) {
        console.warn(`  - WARNING: Local file not found: ${absolutePath}`);
        return null;
      }

      console.log(`  - Uploading local image for "${slug}": ${absolutePath}`);
      const fileStream = fs.createReadStream(absolutePath);
      const asset = await sanity.assets.upload('image', fileStream, {
        filename: `${slug}_hero.jpg`,
      });
      return asset._id;
    }
  } catch (err: any) {
    console.error(`  - Failed to upload image asset for "${slug}":`, err.message);
    return null;
  }
}

async function seed() {
  console.log('Starting Sanity stores seed script...');
  console.log(`Found ${STORES.length} stores in stores.ts`);

  let seededCount = 0;

  for (const store of STORES) {
    console.log(`Processing "${store.name}" (slug: ${store.slug})...`);

    // 1. Check if store already has a hero image asset uploaded
    let assetId: string | null = null;
    const existing = await sanity.fetch<{ image?: { asset?: { _ref: string } } }>(
      `*[_type == "store" && slug.current == $slug][0] { image }`,
      { slug: store.slug }
    );

    if (existing?.image?.asset?._ref) {
      assetId = existing.image.asset._ref;
      console.log(`  - Found existing image asset: ${assetId}`);
    } else if (store.heroImage) {
      assetId = await uploadImageAsset(store.heroImage, store.slug);
    }

    if (!assetId) {
      console.warn(`  - Skipping "${store.name}" because no image asset could be resolved/uploaded.`);
      continue;
    }

    // 2. Prepare the document
    const doc = {
      _type: 'store',
      _id: `store.${store.slug}`,
      title: store.name,
      slug: {
        _type: 'slug',
        current: store.slug,
      },
      category: store.category,
      description: store.description,
      address: store.address || '',
      openHours: store.openingHours ? store.openingHours.join(', ') : '',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      },
      websiteUrl: store.url || '',
      locationMapUrl: store.address ? `https://maps.google.com/?q=${encodeURIComponent(store.address)}` : '',
      instagramHandle: store.instagramHandle || undefined,
    };

    // 3. Write to Sanity
    await sanity.createOrReplace(doc);
    console.log(`  - Successfully seeded "${store.name}" to Sanity.`);
    seededCount++;
  }

  console.log(`\nSeed finished. Successfully wrote ${seededCount}/${STORES.length} stores to Sanity.`);
}

seed().catch(console.error);
