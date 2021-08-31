import { VFC } from 'react'
import { LandingPage } from '@/components/LandingPage'
import { GetServerSideProps } from 'next'
import { fetchUserAndTeams, isLoggedIn } from '@/libs/server-side'
import { Projects, Teams, User } from '@/types'

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const loggedIn = await isLoggedIn(ctx)
    const { user, teams } = await fetchUserAndTeams(ctx)
    return {
      props: {
        ...(user ? { user } : {}),
        teams: teams ?? [],
        projects: [],
        loggedIn
      }
    }
  } catch (_) {
    return {
      props: {
        teams: [],
        projects: [],
        loggedIn: false
      }
    }
  }
}

type Props = {
  user?: User
  teams: Teams
  projects: Projects
  loggedIn: boolean
}

const Home: VFC<Props> = () => {
  return <LandingPage />
}

export default Home
