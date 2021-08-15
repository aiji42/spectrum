import { VFC } from 'react'
import { GetServerSideProps } from 'next'
import { fetchUserAndTeams } from '@/lib/server-side'

export const getServerSideProps: GetServerSideProps = async () => {
  const { user } = await fetchUserAndTeams()

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
