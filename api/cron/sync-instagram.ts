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

// ─── High-fidelity mock posts per store ────────────────────────────────────
const MOCK_POSTS: Record<string, Array<{ caption: string; imageUrl: string; offsetHours: number }>> = {
  'lykke': [
    {
      caption: 'Nybakat surdegsbrod och nymalet specialkaffe star redo pa Nytorgsgatan 38! Kom in och varm dig i sofo-vardagsrummet. Valkommen! #lykkenytorget #specialkaffe #sofo #fika',
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800',
      offsetHours: 2,
    },
    {
      caption: 'Eftermiddagshaeng med naturviner och skoena smarattar. Kaffebaren forvandlas till en mysig kvallsbar varje kvall! #naturvin #sodermalm #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800',
      offsetHours: 26,
    },
  ],
  'parlans-konfektyr': [
    {
      caption: 'Kolasasongen ar i full gang! Havssaltkolan ar var bestsaljare just nu. Handgjord i vart kok varje dag. #parlanskonfektyr #graddkola #mathantverk #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=800',
      offsetHours: 4,
    },
  ],
  'apc': [
    {
      caption: 'Ny kollektion i japansk radenim pa Nytorgsgatan. Minimalistisk design och perfekt skarning for en tidlos garderob. #apc #apcparis #denim #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800',
      offsetHours: 6,
    },
  ],
  'urban-deli': [
    {
      caption: 'Krispiga gronsaker, farskka ostron och nybakat surdegsbroed i var deli! Sla dig ner i restaurangen eller ta med hem. #urbandeli #nytorget #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800',
      offsetHours: 8,
    },
  ],
  'nytorget-6': [
    {
      caption: 'Boka bord for helgen! Modern och rustik europeisk mat, generost barhaeng och skont haeng langt in pa natten. Ses vi? #nytorget6 #restaurangstockholm #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800',
      offsetHours: 12,
    },
  ],
  'meatballs-for-the-people': [
    {
      caption: 'Traditionell husmanskost med en modern twist. Viltkott, klassiska kalvkottbullar och veganska alternativ. Vad valjer du? #meatballsforthepeople #husmanskost #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800',
      offsetHours: 14,
    },
  ],
  'klattermusen': [
    {
      caption: 'Motesplats for friluftsalskare och hantverkare. Kaffe, utvalda magasin och vintage-friluftsklaeder. #klattermusen #friluftsliv #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800',
      offsetHours: 18,
    },
  ],
  '654': [
    {
      caption: 'Allt du behoever for kallvattensurf i de nordiska tropikerna. Vatdrakter, vax och skont surf-snack. #654sofo #surfsverige #kallvattensurf',
      imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800',
      offsetHours: 20,
    },
  ],
  'ps-matsal': [
    {
      caption: 'En hemlig parla pa Nytorgsgatan. Lekfull avsmakningsmeny tillagad framfor gasternas ogon. Boka nu! #psmatsal #gastronomi #sofo',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800',
      offsetHours: 10,
    },
  ],
  'bladverket': [
    {
      caption: 'Butiken doftar ljuvligt av sasongens snittblommor. Kom forbi och plocka ihop en helgkansla hem! #bladverket #florist #nytorgsgatan',
      imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800',
      offsetHours: 22,
    },
  ],
  'retro': [
    {
      caption: 'Kvallens match visas pa alla skarmar! Burgare, kalla drycker och skont barhaeng. #retrobarsofo #sportsbar #awsofo',
      imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800',
      offsetHours: 24,
    },
  ],
  'house-of-tell': [
    {
      caption: 'Kurerat urval av Phoebe Philo Celine, Margiela Hermes och The Row. Tidlos design av hogsta kvalitet. #houseoftell #archivalfashion',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800',
      offsetHours: 30,
    },
  ],
  'capanna-verde': [
    {
      caption: 'Genuint italienskt glasshantverk i hjartat av Sodermalm. Kremig gelato pa de finaste ravarorna. Vilken smak idag? #capannaverde #gelato',
      imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800',
      offsetHours: 32,
    },
  ],
  'lusine-bleue': [
    {
      caption: 'Den klassiska bla franska arbetarjackan i slitstark bomullstwill. Europas storsta sortiment av franskt workwear. #lusinebleue #frenchworkwear',
      imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800',
      offsetHours: 34,
    },
  ],
  'stadsmissionen': [
    {
      caption: 'Unika vintagefynd och handplockat mode pa Nytorgsgatan. Varje kop bidrar till Stadsmissionens sociala arbete. #stadsmissionensecondhand #vintage',
      imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800',
      offsetHours: 36,
    },
  ],
};

// ─── Helper: push mock posts into target array ──────────────────────────────
function pushMock(
  target: any[],
  slug: string,
  storeId: string | undefined,
  storeTitle: string,
  now: Date,
): void {
  const posts = MOCK_POSTS[slug] || [
    {
      caption: `Senaste nytt fran ${storeTitle} pa Nytorgsstraket! Valkommen in. #nytorgsstraket #sofo`,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800',
      offsetHours: 12,
    },
  ];

  posts.forEach((p, i) => {
    const postDate = new Date(now.getTime() - p.offsetHours * 3_600_000);
    const doc: any = {
      _type: 'instagramPost',
      // Safe Sanity _id: only alphanumeric + dots, max 64 chars
      _id: `igpost.${slug}.${i}`,
      postId: `${slug}_mock_${i}`,
      caption: p.caption,
      imageUrl: p.imageUrl,
      postUrl: `https://www.instagram.com/${STORE_INSTAGRAM_MAP[slug] || slug}/`,
      date: postDate.toISOString(),
    };
    // Only attach store reference if we found a real Sanity document for it
    if (storeId) {
      doc.store = { _type: 'reference', _ref: storeId };
    }
    target.push(doc);
  });
}

// ─── Main handler ───────────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  // 1. Optional auth check
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const projectId   = 'lsded7br';
  const dataset     = 'production';
  const writeToken  = process.env.SANITY_WRITE_TOKEN;
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  const debugLog: string[] = [];

  debugLog.push(`writeToken present: ${!!writeToken}`);
  debugLog.push(`rapidApiKey present: ${!!rapidApiKey}`);

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

    const allPosts: any[] = [];
    const now = new Date();

    // 4. Build posts for every store in the hardcoded map
    for (const [slug, handle] of Object.entries(STORE_INSTAGRAM_MAP)) {
      const storeId    = storeIdBySlug[slug];
      const storeTitle = storeTitleBySlug[slug] || slug;

      if (!storeId) {
        debugLog.push(`WARNING: no Sanity store found for slug "${slug}" – post will have no store reference`);
      }

      if (rapidApiKey) {
        // ── LIVE MODE ────────────────────────────────────────────────────
        try {
          const apiRes = await fetch(
            `https://instagram-scraper-api2.p.rapidapi.com/v1/user_posts?username_or_id_or_url=${handle}`,
            {
              headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
              },
            }
          );
          if (apiRes.ok) {
            const apiData  = await apiRes.json();
            const posts: any[] = (apiData?.data?.items || []).slice(0, 3);
            debugLog.push(`@${handle}: fetched ${posts.length} live posts`);
            posts.forEach((post: any, i: number) => {
              const code = post.code || `${slug}_live_${i}`;
              const doc: any = {
                _type:    'instagramPost',
                _id:      `igpost.${slug}.${code}`.slice(0, 64),
                postId:   post.id || code,
                caption:  post.caption?.text || '',
                imageUrl: post.image_versions?.items?.[0]?.url || post.thumbnail_url || '',
                postUrl:  `https://www.instagram.com/p/${code}/`,
                date:     post.taken_at ? new Date(post.taken_at * 1000).toISOString() : now.toISOString(),
              };
              if (storeId) doc.store = { _type: 'reference', _ref: storeId };
              allPosts.push(doc);
            });
          } else {
            debugLog.push(`@${handle}: live fetch failed (${apiRes.status}) – falling back to mock`);
            pushMock(allPosts, slug, storeId, storeTitle, now);
          }
        } catch (e: any) {
          debugLog.push(`@${handle}: live error – ${e.message} – falling back to mock`);
          pushMock(allPosts, slug, storeId, storeTitle, now);
        }
      } else {
        // ── MOCK MODE ─────────────────────────────────────────────────────
        pushMock(allPosts, slug, storeId, storeTitle, now);
      }
    }

    debugLog.push(`Total posts prepared: ${allPosts.length}`);

    // 5. Write to Sanity (createOrReplace = idempotent, no duplicates)
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
      mode:         rapidApiKey ? 'live' : 'mock',
      writeStatus:  writeToken  ? 'written-to-sanity' : 'dry-run-no-token',
      storeCount:   Object.keys(STORE_INSTAGRAM_MAP).length,
      postsWritten: imported,
      debug:        debugLog,
    });

  } catch (err: any) {
    console.error('sync-instagram error:', err);
    return res.status(500).json({ success: false, error: err.message, debug: debugLog });
  }
}
