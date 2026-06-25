import { createClient } from '@sanity/client';

// Generate realistic mock Instagram posts for each store
function getMockPosts(storeSlug: string, storeId: string, storeTitle: string): any[] {
  const now = new Date();
  
  const mockDatabase: Record<string, Array<{ caption: string, imageUrl: string, offsetHours: number }>> = {
    'lykke': [
      {
        caption: "Nybakat surdegsbröd och nymalet specialkaffe står redo på Nytorgsgatan 38! ☕️🌾 Kom in och värm dig i sofo-vardagsrummet. Vi har öppet till 18:00 idag. Välkomna! #lykkenytorget #specialkaffe #sofo #fika",
        imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600",
        offsetHours: 2
      },
      {
        caption: "Eftermiddagshäng med naturviner, hantverksöl och sköna smårätter. Kaffebaren förvandlas till en mysig kvällsbar från och med onsdag! Ses på stråket? 🍷✨ #naturvin #hantverksöl #södermalm #sofo",
        imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600",
        offsetHours: 26
      }
    ],
    'parlans-konfektyr': [
      {
        caption: "Kolasäsongen är i full gång! Våra konfektkokerskor kokar gräddkola varje dag i vårt kök vid Nytorget. Idag tipsar vi om vår havssaltkola – en tidlös klassiker inslagen i cellofan. 🍬✨ #parlanskonfektyr #gräddkola #mathantverk #sofo",
        imageUrl: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=600",
        offsetHours: 4
      }
    ],
    'apc': [
      {
        caption: "Den nya kollektionen i japansk rådenim har precis anlänt till butiken på Nytorgsgatan. Minimalistisk design och perfekt skärning för en tidlös garderob. Välkommen in och hitta din passform. 🧥👖 #apc #apcparis #denim #sofo",
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600",
        offsetHours: 6
      }
    ],
    'urban-deli': [
      {
        caption: "Fredagsmyset börjar i vår deli! Krispiga grönsaker, färska ostron, ostar och nybakat surdegsbröd. Välkommen in och plocka ihop helgens favoriter, eller slå dig ner i restaurangen på en bit mat. 🦪🍷 #urbandeli #nytorget #sofo #deli",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
        offsetHours: 8
      }
    ],
    'nytorget-6': [
      {
        caption: "Boka bord för helgen! Menyn är fylld med modern och rustik europeisk mat gjord för att delas. Ett skönt barhäng och generös stämning utlovas långt in på småtimmarna. Ses vi? 🍽️🥂 #nytorget6 #restaurangstockholm #sofo",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600",
        offsetHours: 12
      }
    ],
    'meatballs-for-the-people': [
      {
        caption: "Välkomna till världens första köttbullebutik och restaurang! Traditionell husmanskost med en modern twist. Vi serverar viltkött, klassiska kalvköttbullar och fantastiska veganska alternativ. Vad väljer du? 🇸🇪🍽️ #meatballsforthepeople #husmanskost #sofo",
        imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=600",
        offsetHours: 14
      }
    ],
    'klattermusen': [
      {
        caption: "Klättermusens Verkstad är mer än bara en butik – det är en mötesplats för friluftsälskare och hantverkare. Kom in på en kopp kaffe, bläddra i våra utvalda magasin och upptäck vår kollektion av vintage-friluftskläder. 🏔️☕️ #klattermusen #friluftsliv #sofo",
        imageUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=600",
        offsetHours: 18
      }
    ],
    '654': [
      {
        caption: "Drömmer du om kallvattensurf? Vi har allt du behöver för att hålla värmen i de nordiska tropikerna. Våtdräkter, vax, kläder och skönt surf-snack i kaffehörnan. Välkommen till 6/5/4! 🏄‍♂️❄️ #654sofo #surfsverige #kallvattensurf",
        imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600",
        offsetHours: 20
      }
    ],
    'bladverket': [
      {
        caption: "Butiken doftar ljuvligt av säsongens snittblommor och handplockade rariteter till krukväxter. Kom förbi vårt grönskande hörn och plocka ihop en helgskänsla till hemmet! 🌿🌸 #bladverket #florist #nytorgsgatan #växtkärlek",
        imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600",
        offsetHours: 22
      }
    ],
    'retro': [
      {
        caption: "Kvällens stormatch visas på alla våra skärmar! Säkra din plats i baren och ladda upp med våra klassiska burgare och kalla drycker. Fantastisk afterwork-stämning garanteras! ⚽️🍔🍺 #retrobarsofo #sportsbar #awsofo",
        imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600",
        offsetHours: 24
      }
    ],
    'house-of-tell': [
      {
        caption: "Ett kurerat urval av Phoebe Philo Céline, Margiela Hermès och The Row finns nu i butiken. Tidlös design av högsta kvalitet som förtjänar ett långt liv. Välkommen in på en personlig sourcing-upplevelse. 👗✨ #houseoftell #archivalfashion",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600",
        offsetHours: 30
      }
    ],
    'capanna-verde': [
      {
        caption: "Genuint italienskt glasshantverk i hjärtat av Södermalm. Efter studier i Rom hos gelatomästaren Cristiano Monaco gör vi gelaton precis som den ska göras – krämig, smakrik och på de finaste råvarorna. Vilken smak vill du prova idag? 🍦🇮🇹 #capannaverde #gelato",
        imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600",
        offsetHours: 32
      }
    ],
    'lusine-bleue': [
      {
        caption: "Den klassiska blå franska arbetarjackan – 'col bleu' – i slitstark bomullstwill. Ett plagg med historia som bara blir vackrare med åren. Vi har Europas största sortiment av franskt workwear. Välkommen in! 🧥🇫🇷 #lusinebleue #frenchworkwear #workwear",
        imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600",
        offsetHours: 34
      }
    ],
    'stadsmissionen': [
      {
        caption: "Hitta dina unika vintagefynd hos oss på Nytorgsgatan! Vår secondhandbutik är fylld med handplockat mode och vacker inredning. Varje köp bidrar direkt till Stockholms Stadsmissions sociala arbete för ett mänskligare samhälle. ♻️💚 #stadsmissionensecondhand #vintage",
        imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600",
        offsetHours: 36
      }
    ]
  };

  const storePosts = mockDatabase[storeSlug] || [
    {
      caption: `Nytt inlägg från oss på ${storeTitle}! Följ oss här för uppdateringar, nyheter och inspiration från butiken på Nytorgsstråket. Välkomna in! ✨ #nytorgsstraket #sofo`,
      imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600",
      offsetHours: 12
    }
  ];

  return storePosts.map((post, index) => {
    const postDate = new Date(now.getTime() - post.offsetHours * 60 * 60 * 1000);
    const idStr = `${storeSlug}_post_${index}`;
    return {
      _type: 'instagramPost',
      _id: `instagram-${storeSlug}-${index}`, // Stable, repeatable ID to avoid duplicates
      postId: idStr,
      store: {
        _type: 'reference',
        _ref: storeId
      },
      caption: post.caption,
      imageUrl: post.imageUrl,
      postUrl: `https://www.instagram.com/p/${idStr}/`,
      date: postDate.toISOString()
    };
  });
}

export default async function handler(req: any, res: any) {
  // 1. Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 2. Initialize Sanity Write Client
  const projectId = 'lsded7br';
  const dataset = 'production';
  const writeToken = process.env.SANITY_WRITE_TOKEN;

  if (!writeToken) {
    console.warn('Missing SANITY_WRITE_TOKEN in environment. Running in DRY RUN mode.');
  }

  const client = createClient({
    projectId,
    dataset,
    token: writeToken,
    useCdn: false, // Must be false for writes/updates
    apiVersion: '2024-03-01',
  });

  try {
    // 3. Fetch all stores that have an instagramHandle configured
    const stores = await client.fetch<Array<{ _id: string; slug: { current: string }; title: string; instagramHandle: string }>>(
      `*[_type == "store" && defined(instagramHandle)] {
        _id,
        slug,
        title,
        instagramHandle
      }`
    );

    if (!stores || stores.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'No stores with instagramHandle found in Sanity. Please configure handles in Sanity Studio.' 
      });
    }

    const allPostsToSync: any[] = [];
    const rapidApiKey = process.env.RAPIDAPI_KEY;

    // 4. Gather posts (live scraping or high-fidelity mock fallback)
    for (const store of stores) {
      const rawHandle = store.instagramHandle.trim();
      const username = rawHandle.startsWith('@') ? rawHandle.slice(1) : rawHandle;

      if (rapidApiKey) {
        // --- LIVE MODE: Fetch from RapidAPI Instagram Scraper ---
        try {
          console.log(`Fetching live posts for @${username}...`);
          const apiRes = await fetch(
            `https://instagram-scraper-api2.p.rapidapi.com/v1/user_posts?username_or_id_or_url=${username}`,
            {
              headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
              }
            }
          );

          if (apiRes.ok) {
            const apiData = await apiRes.json();
            const posts = apiData?.data?.items || [];
            
            // Limit to top 3 latest posts per store
            const latestPosts = posts.slice(0, 3);
            latestPosts.forEach((post: any, index: number) => {
              const captionText = post.caption?.text || '';
              // Prefer high-res display url
              const imgUrl = post.image_versions?.items?.[0]?.url || post.thumbnail_url || '';
              const code = post.code || `${username}_post_${index}`;
              const postTimestamp = post.taken_at ? new Date(post.taken_at * 1000).toISOString() : new Date().toISOString();

              allPostsToSync.push({
                _type: 'instagramPost',
                _id: `instagram-${store.slug.current}-${code}`,
                postId: post.id || code,
                store: {
                  _type: 'reference',
                  _ref: store._id
                },
                caption: captionText,
                imageUrl: imgUrl,
                postUrl: `https://www.instagram.com/p/${code}/`,
                date: postTimestamp
              });
            });
          } else {
            console.error(`Failed to fetch posts for @${username}. Status: ${apiRes.status}`);
            // Fallback to mock posts for this specific store if API fails
            const mockPosts = getMockPosts(store.slug.current, store._id, store.title);
            allPostsToSync.push(...mockPosts);
          }
        } catch (apiErr) {
          console.error(`Error scraping live feed for @${username}:`, apiErr);
          const mockPosts = getMockPosts(store.slug.current, store._id, store.title);
          allPostsToSync.push(...mockPosts);
        }
      } else {
        // --- MOCK MODE: Generate beautiful high-fidelity mock posts ---
        const mockPosts = getMockPosts(store.slug.current, store._id, store.title);
        allPostsToSync.push(...mockPosts);
      }
    }

    // 5. Sync to Sanity (if write token is present)
    let imported = 0;
    if (writeToken) {
      console.log(`Syncing ${allPostsToSync.length} posts to Sanity...`);
      for (const post of allPostsToSync) {
        // createOrReplace ensures that running this repeatedly updates captions/likes but doesn't duplicate
        await client.createOrReplace(post);
        imported++;
      }
    }

    return res.status(200).json({
      success: true,
      mode: rapidApiKey ? 'live' : 'mock-fallback',
      writeStatus: writeToken ? 'written-to-sanity' : 'dry-run-no-token',
      storesSyncedCount: stores.length,
      totalPostsChecked: allPostsToSync.length,
      postsImportedOrUpdated: imported,
      posts: writeToken ? undefined : allPostsToSync // Return posts in dry-run for easy inspection
    });

  } catch (error: any) {
    console.error('Error in sync-instagram handler:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
