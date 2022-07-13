import React from 'react'
import { useRouter } from 'next/router'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'

import createEmotionCache from '../lib/createEmotionCache'
import darkTheme from '../styles/themes/darkTheme'

const clientSideEmotionCache = createEmotionCache()

const MyApp = (props) => {
  const router = useRouter()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  pageProps.router = router
  Object.assign(pageProps, router.query)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
