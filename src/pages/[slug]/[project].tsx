import { VFC } from 'react'
import { Team, Teams } from '@/hooks/use-teams'
import { Project } from '@/hooks/use-projects'
import { Popover } from '@headlessui/react'
import { User } from '@/hooks/use-user'
import { GetServerSideProps } from 'next'
import { Header } from '@/components/Header'
import { ProjectCard } from '@/components/ProjectCard'
import { SplitTestsCard } from '@/components/SplitTestsCard'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const fetchingUser = fetch('https://api.vercel.com/www/user', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
    }
  }).then((res) => res.json())

  const fetchingTeams = fetch('https://api.vercel.com/v13/teams', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
    }
  }).then((res) => res.json())

  const { user } = await fetchingUser
  const { teams }: Teams = await fetchingTeams

  if (![user.username, ...teams.map(({ slug }) => slug)].includes(query.slug))
    return {
      redirect: {
        statusCode: 301,
        destination: `/${user.username}`
      }
    }

  const projects: Project[] = await fetch(
    'https://vercel.com/api/v2/projects/?slug=' + query.slug,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
      }
    }
  ).then((res) => res.json())

  if (!projects.map(({ name }) => name).includes(query.project as string))
    return {
      redirect: {
        statusCode: 301,
        destination: `/${query.slug}`
      }
    }

  const team = teams.find(({ slug }) => slug === query.slug)

  const project: Project = await fetch(
    `https://vercel.com/api/v2/projects/${query.project}` +
      (team ? `?teamId=${team.id}` : ''),
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
      }
    }
  ).then((res) => res.json())

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
  user: User['user']
  teams: Team[]
  projects: Project[]
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
