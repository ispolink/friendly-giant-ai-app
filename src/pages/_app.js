// pages/_app.js
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Global, css, CacheProvider } from '@emotion/react';
import createEmotionCache from '@/utils/createEmotionCache';
import useSystemTheme from '@/utils/useSystemTheme';
import { UserTheme } from '@/constants'
import { DarkTheme, LightTheme } from '@/style/theme';
import Layout from '@/components/layout';
import { appKitModal } from '@/config';

// Client-side  Emotion Cache
const clientSideEmotionCache = createEmotionCache({ key: "css", prepend: true });

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}) {
  const themes = {
    dark: DarkTheme,
    light: LightTheme,
  }
  const [theme, setTheme] = useState(LightTheme)
  const [themId, setThemId] = useState('light')
  const systemTheme = useSystemTheme()

  useEffect(() => {
    const t = themes[systemTheme] || LightTheme
    setTheme(t)
    setThemId(systemTheme)
    appKitModal.setThemeMode(systemTheme || dark)
    // window.document.body.style.background = t.palette.background.paper
  }, [systemTheme])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global
          styles={props => css`
            body {
              input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus,
              textarea:-webkit-autofill,
              textarea:-webkit-autofill:hover,
              textarea:-webkit-autofill:focus,
              select:-webkit-autofill,
              select:-webkit-autofill:hover,
              select:-webkit-autofill:focus {
                border-radius: 0;
                -webkit-text-fill-color: ${theme.palette.colors.formControl.autofill.color};
                -webkit-box-shadow: 0 0 0 30px
                  ${theme.palette.colors.formControl.autofill.background} inset !important;
              }
              overflow-x: hidden;

              ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
              }
            }
            ::-webkit-scrollbar-thumb {
              border-radius: 100px;
              & {
                background: ${theme.palette.colors.scrollbar.scrollbar};
              }
              &:hover {
                background: ${theme.palette.colors.scrollbar.scrollbarHover};
              }
            }
            .MuiSelect-icon,
            .MuiAutocomplete-endAdornment .MuiSvgIcon-root {
              color: ${theme.palette.colors.formControl.selectIconColor} !important;
            }
            .ck-balloon-panel {
              display: none !important;
            }
          `}
        />
        <Layout className={themId}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;