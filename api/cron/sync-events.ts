import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

export default async function handler(req: any, res: any) {
  // 1. Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 2. Fetch the Lykke Live events page
    const htmlRes = await fetch('https://www.lykkenytorget.se/lykke-live');
    const html = await htmlRes.text();
    const $ = cheerio.load(html);

    const events: any[] = [];

    // Parse the Squarespace event list
    $('.eventlist-event').each((_, el) => {
      const title = $(el).find('.eventlist-title').text().trim();
      if (!title) return;

      const dateStr = $(el).find('.eventlist-datetag-startdate').text().trim();
      const monthStr = $(el).find('.eventlist-datetag-startdate--month').text().trim() || 'TBA';
      let dayStr = dateStr.replace(monthStr, '').trim();
      if (!dayStr) dayStr = $(el).find('.eventlist-datetag-startdate--day').text().trim();
      
      const link = $(el).find('a.eventlist-title-link').attr('href');
      const imageUrl = $(el).find('.eventlist-image img').attr('data-src') || $(el).find('.eventlist-image img').attr('src') || '';
      
      // Basic description extraction (first paragraph)
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
        tag_color: '#fff0a2', // Lykke Live's typical yellow tag color
        is_active: true,
        is_featured: false,
      });
    });

    // 3. Update Supabase
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Missing Supabase credentials in environment.');
      return res.status(200).json({ 
        success: true, 
        note: 'Scraped successfully but skipped DB insertion due to missing SUPABASE_SERVICE_ROLE_KEY',
        events
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    let inserted = 0;

    for (const event of events) {
      // Check if event already exists by slug
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
