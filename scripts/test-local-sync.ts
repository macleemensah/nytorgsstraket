import dotenv from 'dotenv';
import path from 'path';

// Load .env if it exists
dotenv.config();

import handler from '../api/cron/sync-instagram';

// Mock request and response
const req = {
  headers: {
    authorization: process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : undefined
  }
};

const res = {
  status: (code: number) => {
    console.log('Status Code:', code);
    return res;
  },
  json: (data: any) => {
    console.log('Response Data:', JSON.stringify(data, null, 2));
    return res;
  }
};

async function test() {
  console.log('Starting local sync-instagram test...');
  console.log('Environment variables check:');
  console.log('- SANITY_WRITE_TOKEN:', process.env.SANITY_WRITE_TOKEN ? 'PRESENT (starts with ' + process.env.SANITY_WRITE_TOKEN.slice(0, 8) + '...)' : 'MISSING');
  console.log('- CRON_SECRET:', process.env.CRON_SECRET ? 'PRESENT' : 'MISSING');
  console.log('- RAPIDAPI_KEY:', process.env.RAPIDAPI_KEY ? 'PRESENT' : 'MISSING');
  
  await handler(req, res);
}

test().catch(console.error);
