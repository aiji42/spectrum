import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { useEffect, useReducer, VFC } from 'react'
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'
import Router from 'next/router'
import AuthContext from '@/libs/firebase/AuthContext'
import authReducer from '@/libs/firebase/authReducer'
import { listenAuthState } from '@/libs/firebase/firebase'
import firebase from 'firebase/app'
import { useFortressWithFirebase } from 'next-fortress/build/client'

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

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
    }
  }).then((res) => res.json())

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  useFortressWithFirebase(firebase)
  const [state, dispatch] = useReducer(
    authReducer.reducer,
    authReducer.initialState
  )
  useEffect(() => {
    listenAuthState(dispatch)
  }, [])

  return (
    <SWRConfig
      value={{
        fetcher
      }}
    >
      <AuthContext.Provider value={state}>
        <div className="relative">
          <Component {...pageProps} />
        </div>
      </AuthContext.Provider>
    </SWRConfig>
  )
}
export default MyApp
