import { useEffect, useState } from 'react'

const useSystemTheme = () => {
  const getCurrentTheme = () => {
    if (typeof window === 'undefined') return false // Ensure SSR safety
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme())
  const mqListener = e => {
    setIsDarkTheme(e.matches)
  }

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
    if (darkThemeMq.addEventListener) {
      darkThemeMq.addEventListener('change', mqListener)
    } else {
      // for old browsers
      darkThemeMq.addListener(mqListener)
    }

    return () => {
      if (darkThemeMq.removeEventListener) {
        darkThemeMq.removeEventListener('change', mqListener)
      } else {
        // for old browsers
        darkThemeMq.removeListener(mqListener)
      }
    }
  }, [])
  return isDarkTheme ? 'dark' : 'light'
}

export default useSystemTheme
export { useSystemTheme }
