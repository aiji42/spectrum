import { VFC } from 'react'
import { SettingForm } from '@/components/SettingForm'
import { GetServerSideProps } from 'next'
import { fetchUserAndTeams, isLoggedIn } from '@/libs/server-side'
import { Projects, Teams, User } from '@/types'

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const loggedIn = await isLoggedIn(ctx)
    const { user, teams } = await fetchUserAndTeams(ctx)
    return {
      props: {
        user,
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

const Setting: VFC<Props> = () => {
  return (
    <div className="mt-8">
      <SettingForm />
    </div>
  )
}

export default Setting
