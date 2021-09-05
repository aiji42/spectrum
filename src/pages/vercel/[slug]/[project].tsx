import { VFC } from 'react'
import { GetServerSideProps } from 'next'
import { ProjectCard } from '@/components/ProjectCard'
import { SplitTestsCard } from '@/components/SplitTestsCard'
import {
  fetchProjects,
  fetchUserAndTeams,
  isLoggedIn
} from '@/libs/server-side'
import { Project, Projects, Splits, Team, Teams, User } from '@/types'
import { getSplitEnvFromProject } from '@/utils'
import { PreviewsCard } from '@/components/PreviewsCard'

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { query } = ctx
  const loggedIn = await isLoggedIn(ctx)
  const { user, teams } = await fetchUserAndTeams(ctx)

  if (!user || !teams)
    return {
      redirect: {
        destination: '/setting',
        statusCode: 302
      }
    }

  const team = teams.find(({ slug }) => slug === query.slug) ?? null
  if (!team && user.username !== query.slug)
    return {
      redirect: {
        statusCode: 302,
        destination: `/vercel/${user.username}`
      }
    }

  const projects = await fetchProjects(ctx)
  const project = projects.find(({ name }) => name === query.project)

  if (!project)
    return {
      redirect: {
        statusCode: 302,
        destination: `/vercel/${query.slug}`
      }
    }

  const splits = JSON.parse(getSplitEnvFromProject(project)?.value ?? '{}')

  return {
    props: {
      project,
      slug: query.slug as string,
      user,
      team,
      teams,
      projects,
      splits,
      loggedIn
    }
  }
}

type Props = {
  project: Project
  slug: string
  user: User
  teams: Teams
  team: Team | null
  projects: Projects
  splits: Splits
  loggedIn: boolean
}

const Home: VFC<Props> = (props) => {
  return (
    <>
      <div className="mt-8">
        <ProjectCard {...props} />
      </div>
      <div className="mt-8">
        <SplitTestsCard {...props} />
      </div>
      <div className="mt-8">
        <PreviewsCard {...props} />
      </div>
    </>
  )
}

export default Home
