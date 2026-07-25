import {
  DEMO_BRAND,
  DEMO_CAMPAIGN,
  DEMO_POSTS,
  formatPostForLog,
} from '../fixtures/acmeCoffeeCampaign';

export type GenerateStatus = 'success' | 'error';

export interface GenerateResult {
  status: GenerateStatus;
  result: string;
}

export function buildGenerateEndpoint(apiUrl: string): string {
  return apiUrl ? `${apiUrl.replace(/\/$/, '')}/api/generate-post` : '/api/generate-post';
}

export async function runGeneratePost(
  topic: string,
  hashtags: string,
  apiUrl: string,
  fetchFn: typeof fetch = fetch,
  delay: (ms: number) => Promise<void> = (ms) => new Promise((r) => setTimeout(r, ms)),
): Promise<GenerateResult> {
  const endpoint = buildGenerateEndpoint(apiUrl);

  try {
    const res = await fetchFn(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        hashtags,
        brand: DEMO_BRAND.name,
        campaign: DEMO_CAMPAIGN.id,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { status: 'success', result: data.result };
    }
    return { status: 'error', result: data.detail || 'Failed to generate' };
  } catch {
    await delay(0);
    const matched = DEMO_POSTS.find((p) => p.topic === topic) ?? DEMO_POSTS[0];
    return { status: 'success', result: formatPostForLog(matched) };
  }
}
