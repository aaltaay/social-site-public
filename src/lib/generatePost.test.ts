import { describe, expect, it, vi } from 'vitest';
import { buildGenerateEndpoint, runGeneratePost } from './generatePost';
import { DEMO_POSTS } from '../fixtures/acmeCoffeeCampaign';

describe('generatePost', () => {
  it('builds backend endpoint from VITE_API_URL', () => {
    expect(buildGenerateEndpoint('https://api.example.com/')).toBe(
      'https://api.example.com/api/generate-post',
    );
    expect(buildGenerateEndpoint('')).toBe('/api/generate-post');
  });

  it('falls back to demo fixtures when fetch fails', async () => {
    const topic = DEMO_POSTS[0].topic;
    const hashtags = DEMO_POSTS[0].hashtags;
    const fetchFn = vi.fn().mockRejectedValue(new Error('network error'));

    const result = await runGeneratePost(topic, hashtags, '', fetchFn);

    expect(result.status).toBe('success');
    expect(result.result).toContain(topic);
    expect(result.result).toContain(hashtags);
  });

  it('returns backend result on success', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, result: 'Live crew output' }),
    });

    const result = await runGeneratePost('topic', '#tag', 'http://localhost:8000', fetchFn);

    expect(result.status).toBe('success');
    expect(result.result).toBe('Live crew output');
  });
});
