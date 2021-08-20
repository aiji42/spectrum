import { VFC } from 'react'
import { Header } from '@/components/Header'
import { Popover } from '@headlessui/react'
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

const Home: VFC<Props> = (props) => {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Header {...props} />
        <LandingPage />
      </div>
    </Popover>
  )
}

export default Home
