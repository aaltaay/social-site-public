import { describe, expect, it } from 'vitest';
import { DEMO_POSTS, formatPostForLog } from './acmeCoffeeCampaign';

describe('formatPostForLog', () => {
  it('includes topic, caption, hashtags, and demo notice', () => {
    const post = DEMO_POSTS[0];
    const output = formatPostForLog(post);

    expect(output).toContain(post.topic);
    expect(output).toContain(post.caption);
    expect(output).toContain(post.hashtags);
    expect(output).toContain('Demo mode');
  });
});
