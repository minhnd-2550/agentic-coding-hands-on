import { describe, it, expect } from 'vitest';
import { truncateText, formatTimestamp, buildKudosUrl } from '@/utils/kudos';

describe('truncateText', () => {
  it('returns full text when within max lines', () => {
    const text = 'Hello world';
    expect(truncateText(text, 5)).toBe('Hello world');
  });

  it('truncates text exceeding 5 lines with ellipsis', () => {
    const lines = Array.from({ length: 8 }, (_, i) => `Line ${i + 1}`);
    const text = lines.join('\n');
    const result = truncateText(text, 5);
    expect(result).toBe('Line 1\nLine 2\nLine 3\nLine 4\nLine 5...');
  });

  it('truncates text exceeding 3 lines with ellipsis', () => {
    const lines = Array.from({ length: 5 }, (_, i) => `Line ${i + 1}`);
    const text = lines.join('\n');
    const result = truncateText(text, 3);
    expect(result).toBe('Line 1\nLine 2\nLine 3...');
  });

  it('handles empty string', () => {
    expect(truncateText('', 5)).toBe('');
  });

  it('handles text with exactly max lines', () => {
    const text = 'Line 1\nLine 2\nLine 3';
    expect(truncateText(text, 3)).toBe('Line 1\nLine 2\nLine 3');
  });
});

describe('formatTimestamp', () => {
  it('formats date string to HH:mm - MM/DD/YYYY', () => {
    const date = '2025-10-30T10:00:00Z';
    const result = formatTimestamp(date);
    expect(result).toMatch(/10:00 - 10\/30\/2025/);
  });

  it('handles different times', () => {
    const date = '2025-03-15T14:30:00Z';
    const result = formatTimestamp(date);
    expect(result).toMatch(/14:30 - 03\/15\/2025/);
  });
});

describe('buildKudosUrl', () => {
  it('builds correct URL for a kudos ID', () => {
    const result = buildKudosUrl('abc-123');
    expect(result).toContain('/kudos/abc-123');
  });

  it('returns absolute URL', () => {
    const result = buildKudosUrl('test-id');
    expect(result).toMatch(/^https?:\/\//);
  });
});
