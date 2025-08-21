/**
 * Sanitizes the given ERC20 ticker to verify its validity.
 * If the token ticker is invalid, it returns null.
 *
 * @param {string} ticker ERC20 token symbol
 * @returns {string|null}
 */
export function getTokenTicker(ticker) {
  if (typeof ticker !== 'string') {
    return null
  }

  const tickerRegex = /^[A-Za-z]{3,10}$/i
  const isTickerValid = tickerRegex.test(ticker)
  if (!isTickerValid) {
    return null
  }

  return ticker
}

/**
 * Sanitizes the given string to verify URI X/Twitter validity.
 * If the URI is invalid, it returns null.
 *
 * @param {string} url X/Twitter URI to sanitize
 * @returns {string|null}
 */
export function getTweetUri(url) {
  if (typeof url !== 'string') {
    return null
  }

  try {
    const urlObject = new URL(url)

    if (urlObject.hostname === 'twitter.com' || urlObject.hostname === 'x.com') {
      const pathParts = urlObject.pathname.split('/')

      if (pathParts.length >= 4 && pathParts[2] === 'status') {
        const tweetId = pathParts[pathParts.length - 1]
        if (/^\d+$/.test(tweetId)) {
          return tweetId
        }
      }
    }
  } catch (error) {
    return null // Invalid URL format
  }

  return null // Not a valid X/Twitter tweet URL
}
