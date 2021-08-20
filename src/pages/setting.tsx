import { VFC } from 'react'
import { Header } from '@/components/Header'
import { Popover } from '@headlessui/react'
import { SettingForm } from '@/components/SettingForm'
import { GetServerSideProps } from 'next'
import { fetchUserAndTeams } from '@/libs/server-side'
import { Projects, Teams, User } from '@/types'

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { user, teams } = await fetchUserAndTeams(ctx)

  if (!user)
    return {
      props: {
        teams: teams ?? [],
        projects: []
      }
    }

  return {
    props: {
      user,
      teams: teams ?? [],
      projects: []
    }
  }
}

type Props = {
  user?: User
  teams: Teams
  projects: Projects
}

const Setting: VFC<Props> = (props) => {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Header {...props} />

        <div className="mt-8">
          <SettingForm />
        </div>
      </div>
    </Popover>
  )
}

export default Setting
