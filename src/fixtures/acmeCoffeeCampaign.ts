export type DemoPostStatus = 'draft' | 'review' | 'published';

export interface DemoPost {
  id: string;
  topic: string;
  caption: string;
  hashtags: string;
  status: DemoPostStatus;
  platform: 'instagram' | 'linkedin';
  scheduledAt: string;
}

export const DEMO_BRAND = {
  name: 'Acme Coffee',
  tagline: 'Small-batch roasts, big community vibes',
  industry: 'Specialty coffee',
  voice: 'Warm, knowledgeable, neighborhood-friendly',
} as const;

export const DEMO_CAMPAIGN = {
  id: 'acme-spring-launch',
  name: 'Spring Single-Origin Launch',
  brand: DEMO_BRAND.name,
  objective: 'Drive foot traffic to three demo locations with a seasonal roast spotlight',
} as const;

/** Sanitized demo fixtures — no real client data or API keys. */
export const DEMO_POSTS: DemoPost[] = [
  {
    id: 'post-001',
    topic: 'Introducing Ethiopian Yirgacheffe — bright citrus, floral finish',
    caption:
      'Spring is here, and so is our newest single-origin. Acme Coffee’s Ethiopian Yirgacheffe brings bright citrus notes and a clean floral finish — perfect for pour-over mornings. Stop by any demo location this week for a complimentary tasting flight.',
    hashtags: '#AcmeCoffee #SingleOrigin #PourOver #SpringRoast',
    status: 'published',
    platform: 'instagram',
    scheduledAt: '2026-03-18T09:00:00-04:00',
  },
  {
    id: 'post-002',
    topic: 'Meet the roaster — behind our small-batch process',
    caption:
      'Every batch at Acme Coffee is roasted in 12-lb micro-lots so we can dial in sweetness and clarity. Our demo roaster walks through the curve that makes Yirgacheffe shine — from first crack to cupping table. Questions welcome in the comments.',
    hashtags: '#AcmeCoffee #CoffeeRoaster #BehindTheBeans #SpecialtyCoffee',
    status: 'review',
    platform: 'linkedin',
    scheduledAt: '2026-03-20T14:30:00-04:00',
  },
];

export function formatPostForLog(post: DemoPost): string {
  return [
    `✅ ${post.status === 'published' ? 'Published' : 'Draft ready for review'} — ${DEMO_BRAND.name}`,
    '',
    `Topic: ${post.topic}`,
    '',
    'Caption:',
    post.caption,
    '',
    post.hashtags,
    '',
    `Platform: ${post.platform} · Scheduled: ${new Date(post.scheduledAt).toLocaleString()}`,
    '',
    '🔗 Demo mode — connect CrewAI backend via VITE_API_URL to run live agents.',
  ].join('\n');
}
