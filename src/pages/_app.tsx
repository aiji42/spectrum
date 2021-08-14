import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { VFC } from 'react'
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'
import Router from 'next/router'

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
  return (
    <SWRConfig
      value={{
        fetcher
      }}
    >
      <div className="relative">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  )
}
export default MyApp
