import { VFC } from 'react'
import { GetServerSideProps } from 'next'
import {
  fetchProjects,
  fetchUserAndTeams,
  isLoggedIn
} from '@/libs/server-side'
import { Projects, Teams, User } from '@/types'
import { ProjectTitleCard } from '@/components/ProjectTitleCard'
import Link from 'next/link'

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

  const team = teams.find(({ slug }) => slug === query.slug)
  if (!team && user.username !== query.slug)
    return {
      redirect: {
        statusCode: 302,
        destination: `/vercel/${user.username}`
      }
    }

  const projects = await fetchProjects(ctx)

  return {
    props: {
      slug: query.slug as string,
      user,
      teams,
      projects,
      loggedIn
    }
  }
}

type Props = {
  slug: string
  user: User
  teams: Teams
  projects: Projects
  loggedIn: boolean
}

const Home: VFC<Props> = (props) => {
  return (
    <div className="mt-8">
      {props.projects.map((pjt) => (
        <div key={pjt.id} className="mt-2">
          <Link href={`/vercel/${props.slug}/${pjt.name}`}>
            <a>
              <ProjectTitleCard project={pjt} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home
