/**
 * Extracts the YouTube video ID from a YouTube URL
 * @param {string} url - The YouTube URL
 * @returns {string|null} - The YouTube video ID or null if invalid
 */
export function extractYoutubeVideoId(url) {
    if (!url) return null;
    
    // Regular expressions for different YouTube URL formats
    const regexPatterns = [
      // youtu.be/VIDEO_ID
      /youtu\.be\/([^\/\?&]+)/,
      // youtube.com/watch?v=VIDEO_ID
      /youtube\.com\/watch\?v=([^&]+)/,
      // youtube.com/embed/VIDEO_ID
      /youtube\.com\/embed\/([^\/\?&]+)/,
      // youtube.com/v/VIDEO_ID
      /youtube\.com\/v\/([^\/\?&]+)/,
      // youtube.com/shorts/VIDEO_ID
      /youtube\.com\/shorts\/([^\/\?&]+)/
    ];
    
    for (const regex of regexPatterns) {
      const match = url.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  }