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
      <Head>
        <title>Spectrum</title>
      </Head>
      <div className="relative">
        <Component {...pageProps} />
      </div>
    </AuthContext.Provider>
  )
}
export default MyApp
