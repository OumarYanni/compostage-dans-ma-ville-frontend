import '@/styles/globals.css'
import React from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { createMongoAbility } from '@casl/ability'
import { EmotionCache, EmotionCache } from '@emotion/cache'
import { CacheProvider, CacheProvider } from '@emotion/react'
import axios from 'axios'
import type { AppProps, AppProps } from 'next/app'
import { appWithTranslation, appWithTranslation } from 'next-i18next'
import { SnackbarProvider } from 'notistack'
import { SWRConfig, SWRConfig } from 'swr'

import AuthProvider from '@/components/authentication/AuthProvider'
import ValidateEmailDialog from '@/components/authentication/ValidateEmailDialog'
import {
  AbilityContext, UserProvider, ValidateEmailDialogProvider, UserProvider
} from '@/contexts'
import { AppAbility } from '@/domains/ability'
import { customTheme, customTheme } from '@/styles/theme'
import createEmotionCache from '@/styles/utils/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASEURL
axios.defaults.withCredentials = false

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App: React.FC<MyAppProps> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false
      }}
    >
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={customTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AbilityContext.Provider value={createMongoAbility<AppAbility>()}>
              <UserProvider>
                <AuthProvider>
                  <SnackbarProvider maxSnack={3}>
                    <ValidateEmailDialogProvider>
                      <CssBaseline />
                      <Component {...pageProps} />
                      <ValidateEmailDialog />
                    </ValidateEmailDialogProvider>
                  </SnackbarProvider>
                </AuthProvider>
              </UserProvider>
            </AbilityContext.Provider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  )
}

export default appWithTranslation(App)

import AuthProvider from '@/components/authentification/AuthProvider'

import MySnackbarProvider from '@/contexts/SnackbarProvider'

const clientSideEmotionCache = createEmotionCache()

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASEURL
axios.defaults.withCredentials = false

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App: React.FC<MyAppProps> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false
      }}
    >
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={customTheme}>
          <UserProvider>
            <AuthProvider>
              <MySnackbarProvider maxSnack={3}>
                <CssBaseline />
                <Component {...pageProps} />
              </MySnackbarProvider>
            </AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  )
}

export default appWithTranslation(App)
