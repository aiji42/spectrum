import { VFC } from 'react'
import { LandingPage } from '@/components/LandingPage'
import { GetServerSideProps } from 'next'
import { fetchUserAndTeams } from '@/libs/server-side'
import { Projects, Teams, User } from '@/types'

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const { user, teams } = await fetchUserAndTeams(ctx)
    return {
      props: {
        user,
        teams: teams ?? [],
        projects: []
      }
    }
  } catch (_) {
    return {
      props: {
        teams: [],
        projects: []
      }
    }
  }
}

type Props = {
  user?: User
  teams: Teams
  projects: Projects
}

const Home: VFC<Props> = () => {
  return <LandingPage />
}

export default Home
