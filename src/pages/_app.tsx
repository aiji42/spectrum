import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useReducer, VFC } from 'react'
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'
import Router from 'next/router'
import AuthContext from '@/libs/firebase/AuthContext'
import { reducer } from '@/libs/firebase/authReducer'
import { listenAuthState } from '@/libs/firebase/firebase'
import firebase from 'firebase/app'
import { useFortressWithFirebase } from 'next-fortress/build/client'
import Head from 'next/head'
import { Snackbar, SnackbarController } from '@/components/Snackbar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Popover } from '@headlessui/react'

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 })

Router.events.on('routeChangeStart', () => {
  nprogress.start()
})

Router.events.on('routeChangeComplete', () => {
  nprogress.done()
})

Router.events.on('routeChangeError', () => {
  nprogress.done()
})

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  useFortressWithFirebase(firebase)
  const [firebaseState, dispatch] = useReducer(reducer, null)

  useEffect(() => {
    listenAuthState(dispatch)
  }, [])

  return (
    <AuthContext.Provider value={firebaseState}>
      <SnackbarController>
        <Head>
          <title>Spectrum</title>
          <meta
            property="description"
            content="A/B tests web console for Next.js & Vercel"
          />
          <meta property="og:title" content="Spectrum" />
          <meta
            property="og:description"
            content="A/B tests web console for Next.js & Vercel"
          />
          <meta
            property="og:image"
            content="https://spectrum-kappa.vercel.app//ogp_large.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Popover className="relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col min-h-screen">
            <Header {...pageProps} />
            <div className="flex-1">
              <Component {...pageProps} />
            </div>
            <Snackbar />
            <Footer />
          </div>
        </Popover>
      </SnackbarController>
    </AuthContext.Provider>
  )
}
export default MyApp
