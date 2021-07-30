import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { VFC } from 'react'

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
      <Component {...pageProps} />
    </SWRConfig>
  )
}
export default MyApp
