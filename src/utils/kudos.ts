/**
 * Truncates text to a maximum number of lines, appending "..." if truncated.
 */
export function truncateText(text: string, maxLines: number): string {
  if (!text) return '';
  const lines = text.split('\n');
  if (lines.length <= maxLines) return text;
  return lines.slice(0, maxLines).join('\n') + '...';
}

/**
 * Formats a date string to "HH:mm - MM/DD/YYYY" format (UTC).
 */
export function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${hours}:${minutes} - ${month}/${day}/${year}`;
}

/**
 * Builds an absolute URL for a specific kudos post.
 */
export function buildKudosUrl(kudosId: string): string {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || 'https://saa2025.sun-asterisk.com';
  return `${baseUrl}/kudos/${kudosId}`;
}
