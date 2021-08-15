import { VFC } from 'react'
import { Popover } from '@headlessui/react'
import { GetServerSideProps } from 'next'
import { Header } from '@/components/Header'
import { ProjectCard } from '@/components/ProjectCard'
import { SplitTestsCard } from '@/components/SplitTestsCard'
import { fetchProjects, fetchUserAndTeams } from '@/lib/server-side'
import { Project, Projects, Splits, Team, Teams, User } from '@/types'
import { getSplitEnvFromProject } from '@/utils'

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
  const project = projects.find(({ name }) => name === query.project)

  if (!project)
    return {
      redirect: {
        statusCode: 301,
        destination: `/${query.slug}`
      }
    }

  const splits = JSON.parse(getSplitEnvFromProject(project)?.value ?? '{}')

  return {
    props: {
      project,
      slug: query.slug,
      user,
      team,
      teams,
      projects,
      splits
    }
  }
}

type Props = {
  project: Project
  slug: string
  user: User
  teams: Teams
  team?: Team
  projects: Projects
  splits: Splits
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
