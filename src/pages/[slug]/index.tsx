import { VFC } from 'react'
import { Popover } from '@headlessui/react'
import { GetServerSideProps } from 'next'
import { Header } from '@/components/Header'
import { fetchProjects, fetchUserAndTeams } from '@/lib/server-side'
import { Projects, Teams, User } from '@/types'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { user, teams } = await fetchUserAndTeams()

  const team = teams.find(({ slug }) => slug === query.slug)
  if (!team && user.username !== query.slug)
    return {
      redirect: {
        statusCode: 301,
        destination: `/${user.username}`
      }
    }

  const projects = await fetchProjects(query)

  return {
    props: {
      slug: query.slug,
      user,
      teams,
      projects
    }
  }
}

type Props = {
  slug: string
  user: User
  teams: Teams
  projects: Projects
}

const Home: VFC<Props> = (props) => {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Header {...props} />
      </div>
    </Popover>
  )
}

export default Home
