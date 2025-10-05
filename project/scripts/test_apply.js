#!/usr/bin/env node
// Simple test script to POST a sample application to /api/apply
// Usage:
//   node scripts/test_apply.js [url]
// or set TARGET_URL env var

const defaultUrl = 'https://bloom-agent.netlify.app/api/apply';
const url = process.argv[2] || process.env.TARGET_URL || defaultUrl;

const sample = {
  instagram: '@test_user',
  fullName: 'Test User',
  university: 'Newcastle',
  degree: 'BA Testing',
  phone: '07123456789',
  whyYou: "I'm keen to join",
  experience: 'Some basic social media experience',
  femaleUK: true,
  privacy: true,
  website: '' // honeypot
};

async function run() {
  console.log('Posting to', url);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(sample),
    });

    console.log('Status:', res.status);
    console.log('Headers:');
    for (const [k, v] of res.headers.entries()) console.log('  ', k + ':', v);

    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const data = await res.json();
      console.log('JSON response:', JSON.stringify(data, null, 2));
    } else {
      const text = await res.text();
      console.log('Text response:', text.slice(0, 2000));
    }
  } catch (err) {
    console.error('Request failed:', err);
    process.exitCode = 2;
  }
}

run();
