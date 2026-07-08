import { createClient } from '@sanity/client';

// ─── Hardcoded store map ────────────────────────────────────────────────────
// slug → instagramHandle (mirrors stores.ts)
const STORE_INSTAGRAM_MAP: Record<string, string> = {
  'lykke':                    'lykkenytorget',
  'parlans-konfektyr':        'parlanskonfektyr',
  'apc':                      'apc_paris',
  'urban-deli':               'urbandeli',
  'nytorget-6':               'nytorget6',
  'meatballs-for-the-people': 'meatballsforthepeople',
  'klattermusen':             'klattermusens.verkstad',
  '654':                      '654.se',
  'ps-matsal':                'psmatsal',
  'bladverket':               'bladverket',
  'retro':                    'retrobarsofo',
  'stadsmissionen':           'stadsmissionensecondhand',
  'house-of-tell':            'houseoftell',
  'capanna-verde':            'capannaverde',
  'lusine-bleue':             'lusinebleue',
};

// ─── High-fidelity mock posts per store (fallback only) ────────────────────
const MOCK_POSTS: Record<string, Array<{ caption: string; imageUrl: string; offsetHours: number }>> = {
  'lykke': [
    {
      caption: 'Nybakat surdegsbröd och nymalet specialkaffe redo på Nytorgsgatan 38! Kom in och värm dig i sofo-vardagsrummet. Välkommen! #lykkenytorget #specialkaffe #sofo #fika',
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800',
      offsetHours: 2,
    },
    {
      caption: 'Eftermiddagshäng med naturviner och sköna smårätter. Kaffebaren förvandlas till en mysig kvällsbar varje kväll! #naturvin #sodermalm #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800',
      offsetHours: 26,
    },
  ],
  'parlans-konfektyr': [
    {
      caption: 'Kolasäsongen är i full gång! Havssaltskolan är vår bestsäljare just nu. Handgjord i vårt kök varje dag. #parlanskonfektyr #grädkola #mathantverk #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=800',
      offsetHours: 4,
    },
  ],
  'apc': [
    {
      caption: 'Ny kollektion i japansk rådenin på Nytorgsgatan. Minimalistisk design och perfekt skärning för en tidlös garderob. #apc #apcparis #denim #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800',
      offsetHours: 6,
    },
  ],
  'urban-deli': [
    {
      caption: 'Krispiga grönsaker, färska ostron och nybakat surdegsbröd i vår deli! Slå dig ner i restaurangen eller ta med hem. #urbandeli #nytorget #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800',
      offsetHours: 8,
    },
  ],
  'nytorget-6': [
    {
      caption: 'Boka bord för helgen! Modern och rustik europeisk mat, generöst barhäng och skönt häng långt in på natten. Ses vi? #nytorget6 #restaurangstockholm #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800',
      offsetHours: 12,
    },
  ],
  'meatballs-for-the-people': [
    {
      caption: 'Traditionell husmanskost med en modern twist. Vilt kött, klassiska kalvköttbullar och veganska alternativ. Vad väljer du? #meatballsforthepeople #husmanskost #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800',
      offsetHours: 14,
    },
  ],
  'klattermusen': [
    {
      caption: 'Mötesplats för friluftsälskare och hantverkare. Kaffe, utvalda magasin och vintage-friluftskläder. #klattermusen #friluftsliv #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800',
      offsetHours: 18,
    },
  ],
  '654': [
    {
      caption: 'Allt du behöver för kallvattensurf i de nordiska tropikerna. Våtdräkter, vax och skönt surf-snack. #654sofo #surfsverige #kallvattensurf',
      imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800',
      offsetHours: 20,
    },
  ],
  'ps-matsal': [
    {
      caption: 'En hemlig pärla på Nytorgsgatan. Lekfull avsmakningsmeny tillagad framför gästernas ögon. Boka nu! #psmatsal #gastronomi #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800',
      offsetHours: 10,
    },
  ],
  'bladverket': [
    {
      caption: 'Butiken doftar ljuvligt av säsongens snittblommor. Kom förbi och plocka ihop en helgkänsla hem! #bladverket #florist #nytorgsgatan',
      imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800',
      offsetHours: 22,
    },
  ],
  'retro': [
    {
      caption: 'Kvällens match visas på alla skärmar! Burgare, kalla drycker och skönt barhäng. #retrobarsofo #sportsbar #awsofo',
      imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800',
      offsetHours: 24,
    },
  ],
  'house-of-tell': [
    {
      caption: 'Kurerat urval av Phoebe Philo Céline, Margiela Hermès och The Row. Tidlös design av högsta kvalitet. #houseoftell #archivalfashion',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800',
      offsetHours: 30,
    },
  ],
  'capanna-verde': [
    {
      caption: 'Genuint italienskt glasshantverk i hjärtat av Södermalm. Krämig gelato på de finaste råvarorna. Vilken smak idag? #capannaverde #gelato',
      imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800',
      offsetHours: 32,
    },
  ],
  'lusine-bleue': [
    {
      caption: 'Den klassiska blå franska arbetarjackan i slitstarkt bomullstwill. Europas största sortiment av franskt workwear. #lusinebleue #frenchworkwear',
      imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800',
      offsetHours: 34,
    },
  ],
  'stadsmissionen': [
    {
      caption: 'Unika vintagefynd och handplockat mode på Nytorgsgatan. Varje köp bidrar till Stadsmissionens sociala arbete. #stadsmissionensecondhand #vintage',
      imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800',
      offsetHours: 36,
    },
  ],
};

// ─── Fetch real posts from Instagram's web API ──────────────────────────────
async function fetchInstagramPosts(
  handle: string,
): Promise<Array<{ shortcode: string; caption: string; imageUrl: string; takenAt: number; id: string }>> {
  const res = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${handle}`,
    {
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'x-ig-app-id': '936619743392459',
        'Accept': '*/*',
        'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8',
        'Referer': 'https://www.instagram.com/',
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  const edges: any[] = data?.data?.user?.edge_owner_to_timeline_media?.edges || [];

  return edges.slice(0, 3).map((edge: any, i: number) => {
    const node = edge.node || {};
    return {
      shortcode: node.shortcode || `live_${i}`,
      caption: node?.edge_media_to_caption?.edges?.[0]?.node?.text || '',
      imageUrl: node.display_url || node.thumbnail_src || '',
      takenAt: node.taken_at_timestamp || Math.floor(Date.now() / 1000),
      id: node.id || node.shortcode || `live_${i}`,
    };
  });
}

// Helper to download image and upload it to Sanity as localImage
async function downloadAndUploadImage(
  sanity: any,
  imageUrl: string,
  slug: string,
  shortcode: string,
  debugLog: string[]
): Promise<any> {
  if (!imageUrl) return undefined;

  try {
    debugLog.push(`    - Downloading image for "${slug}" (${shortcode}): ${imageUrl.slice(0, 60)}...`);
    const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(10000) });
    if (!imgRes.ok) {
      throw new Error(`Failed to download image: HTTP ${imgRes.status}`);
    }
    const arrayBuffer = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    debugLog.push(`    - Uploading downloaded image to Sanity...`);
    const asset = await sanity.assets.upload('image', buffer, {
      contentType: imgRes.headers.get('content-type') || 'image/jpeg',
      filename: `ig_${slug}_${shortcode}.jpg`,
    });
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err: any) {
    debugLog.push(`    - Error saving localImage for "${slug}" (${shortcode}): ${err.message}`);
    return undefined;
  }
}

// ─── Main handler ───────────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  // 1. Optional auth check
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const projectId  = 'lsded7br';
  const dataset    = 'production';
  const writeToken = process.env.SANITY_WRITE_TOKEN;
  const debugLog: string[] = [];

  debugLog.push(`writeToken present: ${!!writeToken}`);

  // 2. Sanity client (needs token for writes)
  const sanity = createClient({
    projectId,
    dataset,
    token: writeToken,
    useCdn: false,
    apiVersion: '2024-03-01',
  });

  try {
    // 3. Fetch all published store docs so we can attach correct _id references
    const sanityStores = await sanity.fetch<Array<{ _id: string; slug: { current: string }; title: string }>>(
      `*[_type == "store"] { _id, slug, title }`
    );
    debugLog.push(`Found ${sanityStores.length} store documents in Sanity`);

    const storeIdBySlug: Record<string, string>    = {};
    const storeTitleBySlug: Record<string, string> = {};
    for (const s of sanityStores) {
      storeIdBySlug[s.slug.current]    = s._id;
      storeTitleBySlug[s.slug.current] = s.title;
    }

    // 4. Fetch existing instagramPost documents to check and reuse uploaded image assets
    const existingPosts = await sanity.fetch<Array<{ _id: string; localImage?: any }>>(
      `*[_type == "instagramPost"] { _id, localImage }`
    );
    const existingImageById = new Map<string, any>();
    for (const p of existingPosts) {
      existingImageById.set(p._id, p.localImage);
    }
    debugLog.push(`Found ${existingPosts.length} existing posts in Sanity to cache-check images`);

    const allPosts: any[] = [];
    const now = new Date();
    const slugKeys = Object.keys(STORE_INSTAGRAM_MAP);

    // 5. Build posts for every store — try live IG web API, fall back to mock
    for (let i = 0; i < slugKeys.length; i++) {
      const slug   = slugKeys[i];
      const handle = STORE_INSTAGRAM_MAP[slug];
      const storeId    = storeIdBySlug[slug];
      const storeTitle = storeTitleBySlug[slug] || slug;

      if (!storeId) {
        debugLog.push(`WARNING: no Sanity store found for slug "${slug}" – post will have no store reference`);
      }

      // Small delay between requests to avoid Instagram rate limiting
      if (i > 0) {
        await new Promise(r => setTimeout(r, 1000));
      }

      try {
        const livePosts = await fetchInstagramPosts(handle);
        debugLog.push(`@${handle}: fetched ${livePosts.length} live posts via IG web API`);

        for (let postIndex = 0; postIndex < livePosts.length; postIndex++) {
          const post = livePosts[postIndex];
          const docId = `igpost.${slug}.${post.shortcode}`.slice(0, 64);
          
          const doc: any = {
            _type:    'instagramPost',
            _id:      docId,
            postId:   post.id,
            caption:  post.caption,
            imageUrl: post.imageUrl,
            postUrl:  `https://www.instagram.com/p/${post.shortcode}/`,
            date:     new Date(post.takenAt * 1000).toISOString(),
          };
          if (storeId) doc.store = { _type: 'reference', _ref: storeId };

          // Reuse existing image asset if it exists, otherwise download and upload it
          const cachedImage = existingImageById.get(docId);
          if (cachedImage) {
            doc.localImage = cachedImage;
            debugLog.push(`  - @${handle}: reusing cached localImage asset`);
          } else if (post.imageUrl && writeToken) {
            doc.localImage = await downloadAndUploadImage(sanity, post.imageUrl, slug, post.shortcode, debugLog);
          }

          allPosts.push(doc);
        }
      } catch (e: any) {
        debugLog.push(`@${handle}: live fetch failed (${e.message}) – falling back to mock`);
        
        // Mock fallback with localImage upload
        const posts = MOCK_POSTS[slug] || [
          {
            caption: `Senaste nytt från ${storeTitle} på Nytorgsstråket! Välkommen in. #nytorgsstraket #sofo`,
            imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800',
            offsetHours: 12,
          },
        ];

        for (let j = 0; j < posts.length; j++) {
          const p = posts[j];
          const docId = `igpost.${slug}.${j}`;
          const postDate = new Date(now.getTime() - p.offsetHours * 3_600_000);
          
          const doc: any = {
            _type: 'instagramPost',
            _id: docId,
            postId: `${slug}_mock_${j}`,
            caption: p.caption,
            imageUrl: p.imageUrl,
            postUrl: `https://www.instagram.com/${STORE_INSTAGRAM_MAP[slug] || slug}/`,
            date: postDate.toISOString(),
          };
          if (storeId) doc.store = { _type: 'reference', _ref: storeId };

          const cachedImage = existingImageById.get(docId);
          if (cachedImage) {
            doc.localImage = cachedImage;
          } else if (p.imageUrl && writeToken) {
            doc.localImage = await downloadAndUploadImage(sanity, p.imageUrl, slug, `mock_${j}`, debugLog);
          }

          allPosts.push(doc);
        }
      }
    }

    debugLog.push(`Total posts prepared: ${allPosts.length}`);

    // 6. Write to Sanity (createOrReplace = idempotent, no duplicates)
    let imported = 0;
    if (writeToken) {
      for (const post of allPosts) {
        await sanity.createOrReplace(post);
        imported++;
      }
      debugLog.push(`Written ${imported} posts to Sanity`);
    } else {
      debugLog.push('DRY RUN – SANITY_WRITE_TOKEN missing, nothing written');
    }

    return res.status(200).json({
      success:      true,
      mode:         'live-ig-web-api',
      writeStatus:  writeToken ? 'written-to-sanity' : 'dry-run-no-token',
      storeCount:   slugKeys.length,
      postsWritten: imported,
      debug:        debugLog,
    });

  } catch (err: any) {
    console.error('sync-instagram error:', err);
    return res.status(500).json({ success: false, error: err.message, debug: debugLog });
  }
}
