const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

/**
 * Extracts the YouTube video ID from various URL formats.
 * Supports: watch?v=, youtu.be/, /embed/, /shorts/
 * Returns null for non-YouTube or invalid URLs.
 */
export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const isYoutube =
      u.hostname === "www.youtube.com" ||
      u.hostname === "youtube.com" ||
      u.hostname === "youtu.be" ||
      u.hostname === "www.youtube-nocookie.com";

    if (!isYoutube) return null;

    const match = url.match(YOUTUBE_ID_REGEX);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

/**
 * Returns the privacy-enhanced embed URL for a given YouTube video ID.
 */
export function toEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/**
 * Returns the YouTube thumbnail URL (hqdefault) for a given video ID.
 */
export function toThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
