// src/utils/createEmotionCache.js
import createCache from '@emotion/cache'

// Emotion cache (for SSR)
const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true })
}

export default createEmotionCache
