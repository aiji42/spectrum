import { VFC } from 'react'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const { user } = await fetch('https://api.vercel.com/www/user', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
    }
  }).then((res) => res.json())

  return {
    redirect: {
      statusCode: 301,
      destination: `/${user.username}`
    }
  }
}

const Home: VFC = () => {
  return null
}

export default Home
