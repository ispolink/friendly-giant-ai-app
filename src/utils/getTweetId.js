export function getTweetId(url) {
  if (typeof url !== 'string') {
    return null; // Not a string
  }

  try {
    const urlObject = new URL(url);

    if (
      urlObject.hostname === 'twitter.com' ||
      urlObject.hostname === 'x.com'
    ) {
      const pathParts = urlObject.pathname.split('/');

      if (pathParts.length >= 4 && pathParts[2] === 'status') {
        const tweetId = pathParts[pathParts.length - 1];
        if (/^\d+$/.test(tweetId)) {
          return tweetId;
        }
      }
    }
  } catch (error) {
    return null; // Invalid URL format
  }

  return null; // Not a valid X/Twitter tweet URL
}