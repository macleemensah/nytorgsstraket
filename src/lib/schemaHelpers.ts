const swedishMonths = [
  'januari', 'februari', 'mars', 'april', 'maj', 'juni',
  'juli', 'augusti', 'september', 'oktober', 'november', 'december'
];

/**
 * Detects if a string is an ISO date (YYYY-MM-DD) and returns a Date if so.
 */
const parseISODate = (str: string): Date | null => {
  const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return new Date(parseInt(y), parseInt(m) - 1, parseInt(d), 9, 0, 0);
  }
  return null;
};

/**
 * Parses event date string and optional end date string to determine ISO startDate and endDate.
 * Handles both ISO format (YYYY-MM-DD, from Supabase) and Swedish human-readable format (e.g. "7 Juli").
 */
export const parseEventDates = (dateStr: string, endDateStr?: string) => {
  // --- Handle ISO date strings directly (from Supabase, e.g. "2026-07-07") ---
  const isoStart = parseISODate(dateStr);
  if (isoStart) {
    const startDate = isoStart.toISOString();
    if (endDateStr) {
      const isoEnd = parseISODate(endDateStr);
      if (isoEnd) {
        isoEnd.setHours(22, 0, 0, 0);
        return { startDate, endDate: isoEnd.toISOString() };
      }
      // end_date might also be ISO
      const endFallback = new Date(endDateStr);
      endFallback.setHours(22, 0, 0, 0);
      return { startDate, endDate: endFallback.toISOString() };
    }
    // No end_date: end on same day at 22:00
    const endDateTime = new Date(isoStart);
    endDateTime.setHours(22, 0, 0, 0);
    return { startDate, endDate: endDateTime.toISOString() };
  }

  // --- Handle Swedish human-readable date strings (e.g. "7 Juli", "14 — 16 Augusti") ---

  if (!endDateStr) {
    const today = new Date();
    const normalized = dateStr.toLowerCase();
    let foundMonth = -1;
    for (let i = 0; i < swedishMonths.length; i++) {
      if (normalized.includes(swedishMonths[i]) || normalized.includes(swedishMonths[i].substring(0, 3))) {
        foundMonth = i;
        break;
      }
    }

    const dayMatch = dateStr.match(/(\d+)/);
    if (dayMatch && foundMonth !== -1) {
      const day = parseInt(dayMatch[1], 10);
      const year = today.getFullYear();
      let eventYear = year;
      // If the month has already passed in the current year, assume it's next year
      if (foundMonth < today.getMonth()) {
        eventYear += 1;
      }
      const start = new Date(eventYear, foundMonth, day, 9, 0, 0);
      const endDateTime = new Date(eventYear, foundMonth, day, 22, 0, 0);
      return {
        startDate: start.toISOString(),
        endDate: endDateTime.toISOString()
      };
    }

    // Could not parse date — use today as absolute fallback
    return {
      startDate: today.toISOString(),
      endDate: today.toISOString()
    };
  }

  const end = new Date(endDateStr);
  const year = end.getFullYear();
  const month = end.getMonth(); // 0-indexed
  
  // Try to see if dateStr contains a range like "14 — 16 Augusti" or "23 — 26 April"
  // Swedish dashes: —, –, -
  const rangeRegex = /(\d+)\s*[\u2014\u2013-]\s*(\d+)/;
  const match = dateStr.match(rangeRegex);

  if (match) {
    const startDay = parseInt(match[1], 10);
    const endDay = parseInt(match[2], 10);

    let startMonth = month;
    let startYear = year;
    if (startDay > endDay) {
      startMonth = month - 1;
      if (startMonth < 0) {
        startMonth = 11;
        startYear = year - 1;
      }
    }

    const start = new Date(startYear, startMonth, startDay, 9, 0, 0); // Default to 09:00
    const endDateTime = new Date(year, month, endDay, 22, 0, 0); // Default to 22:00

    return {
      startDate: start.toISOString(),
      endDate: endDateTime.toISOString()
    };
  } else {
    // Single day event, e.g., "16 April" or "03 Maj"
    const dayMatch = dateStr.match(/^(\d+)/);
    if (dayMatch) {
      const day = parseInt(dayMatch[1], 10);
      const start = new Date(year, month, day, 9, 0, 0); // Default to 09:00
      const endDateTime = new Date(year, month, day, 22, 0, 0); // Default to 22:00
      return {
        startDate: start.toISOString(),
        endDate: endDateTime.toISOString()
      };
    }
  }

  // Fallback: use end_date for both
  return {
    startDate: new Date(end).toISOString(),
    endDate: new Date(end).toISOString()
  };
};

/**
 * Generates performer object based on event title.
 */
export const getPerformer = (title: string) => {
  if (title.startsWith("Lykke Live:")) {
    return {
      "@type": "PerformingGroup",
      "name": title.replace("Lykke Live:", "").trim()
    };
  }
  return {
    "@type": "Organization",
    "name": "Nytorgsstråket"
  };
};

/**
 * Formats image URL to be absolute.
 */
export const getAbsoluteImageUrl = (url: string) => {
  if (!url) return "https://nytorgsstraket.se/og-image.jpg";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://nytorgsstraket.se${url.startsWith("/") ? "" : "/"}${url}`;
};
