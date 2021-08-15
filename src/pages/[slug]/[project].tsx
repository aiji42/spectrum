import { VFC } from 'react'
import { Popover } from '@headlessui/react'
import { GetServerSideProps } from 'next'
import { Header } from '@/components/Header'
import { ProjectCard } from '@/components/ProjectCard'
import { SplitTestsCard } from '@/components/SplitTestsCard'
import { fetchProjects, fetchUserAndTeams } from '@/lib/server-side'
import { Project, Projects, Teams, User } from '@/types'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { user, teams } = await fetchUserAndTeams()

  if (
    ![user.username, ...teams.map(({ slug }) => slug)].includes(
      query.slug as string
    )
  )
    return {
      redirect: {
        statusCode: 301,
        destination: `/${user.username}`
      }
    }

  const projects = await fetchProjects(query)
  const project = projects.find(
    ({ name }) => name === (query.project as string)
  )

  if (!project)
    return {
      redirect: {
        statusCode: 301,
        destination: `/${query.slug}`
      }
    }

  return {
    props: {
      project,
      slug: query.slug,
      user,
      teams,
      projects
    }
  }
}

type Props = {
  project: Project
  slug: string
  user: User
  teams: Teams
  projects: Projects
}

const Home: VFC<Props> = (props) => {
  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Header {...props} />
          <div className="mt-8">
            <ProjectCard {...props} />
          </div>
          <div className="mt-8">
            <SplitTestsCard {...props} />
          </div>
        </div>
      </Popover>
    </>
  )
}

export default Home
