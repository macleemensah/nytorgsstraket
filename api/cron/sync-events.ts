import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

async function fetchUrbanDeliEvents() {
  try {
    const htmlRes = await fetch('https://urbandeli.se/kalendarium/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    });
    if (!htmlRes.ok) return [];
    const html = await htmlRes.text();
    const $ = cheerio.load(html);

    const udEvents: any[] = [];

    $('.type-event, .event, [data-elementor-type="loop-item"]').each((_, el) => {
      const fullText = $(el).text();
      if (!fullText.includes('Nytorget')) return;

      const rawTitle = $(el).find('h2').text().trim();
      if (!rawTitle) return;

      const link = $(el).find('a[href*="/event/"]').attr('href') || '';
      const description = $(el).find('.elementor-widget-text-editor').text().trim();
      
      let dateStr = '';
      $(el).find('.elementor-widget-heading p, h3').each((_, heading) => {
        const text = $(heading).text().trim();
        if (text.match(/\d{1,2}\s+(juli|augusti|september|oktober|november|december|januari|februari|mars|april|maj|juni)/i)) {
          dateStr = text;
        }
      });

      const title = rawTitle.startsWith('Urban Deli') ? rawTitle : `Urban Deli: ${rawTitle}`;
      const slug = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      udEvents.push({
        title,
        slug: `ud-${slug}`,
        date: dateStr || 'Nytorget',
        description: description || `${title} på Urban Deli Nytorget.`,
        image_url: 'https://urbandeli.se/wp-content/uploads/2025/10/UD_241114_0125_ver2-scaled.jpg',
        external_url: link || 'https://urbandeli.se/kalendarium/',
        tag: rawTitle.toLowerCase().includes('pride') ? 'Pride' : 'Event',
        tag_color: '#f5c9bf',
        is_active: true,
        is_featured: false,
      });
    });

    return udEvents;
  } catch (err) {
    console.error('Error fetching Urban Deli events:', err);
    return [];
  }
}

export default async function handler(req: any, res: any) {
  // 1. Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const events: any[] = [];

    // 2a. Fetch Lykke Live events
    try {
      const htmlRes = await fetch('https://www.lykkenytorget.se/lykke-live');
      if (htmlRes.ok) {
        const html = await htmlRes.text();
        const $ = cheerio.load(html);

        $('.eventlist-event').each((_, el) => {
          const title = $(el).find('.eventlist-title').text().trim();
          if (!title) return;

          const dateStr = $(el).find('.eventlist-datetag-startdate').text().trim();
          const monthStr = $(el).find('.eventlist-datetag-startdate--month').text().trim() || 'TBA';
          let dayStr = dateStr.replace(monthStr, '').trim();
          if (!dayStr) dayStr = $(el).find('.eventlist-datetag-startdate--day').text().trim();
          
          const link = $(el).find('a.eventlist-title-link').attr('href');
          const imageUrl = $(el).find('.eventlist-image img').attr('data-src') || $(el).find('.eventlist-image img').attr('src') || '';
          
          let description = $(el).find('.eventlist-excerpt p').first().text().trim();
          if (!description) {
            description = $(el).find('.eventlist-excerpt').text().trim();
          }

          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

          events.push({
            title,
            slug,
            date: `${dayStr} ${monthStr}`,
            description,
            image_url: imageUrl,
            external_url: link ? `https://www.lykkenytorget.se${link}` : null,
            tag: 'Musik',
            tag_color: '#fff0a2',
            is_active: true,
            is_featured: false,
          });
        });
      }
    } catch (e) {
      console.error('Error fetching Lykke events:', e);
    }

    // 2b. Fetch Urban Deli Nytorget events
    const udEvents = await fetchUrbanDeliEvents();
    events.push(...udEvents);

    // 3. Update Supabase
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Missing Supabase credentials in environment.');
      return res.status(200).json({ 
        success: true, 
        note: 'Scraped successfully but skipped DB insertion due to missing SUPABASE_SERVICE_ROLE_KEY',
        eventCount: events.length,
        events
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    let inserted = 0;

    for (const event of events) {
      const { data: existing } = await supabase.from('events').select('id').eq('slug', event.slug).single();
      
      if (!existing) {
        await supabase.from('events').insert(event);
        inserted++;
      }
    }

    return res.status(200).json({ 
      success: true, 
      scraped: events.length,
      inserted
    });

  } catch (error: any) {
    console.error('Error scraping events:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
