// pages/_document.js
import Document from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../utils/createEmotionCache'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    // Emotion SSR Config
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => <App {...props} emotionCache={cache} />,
      })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
