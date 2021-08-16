import { VFC } from 'react'
import { Popover } from '@headlessui/react'
import { GetServerSideProps } from 'next'
import { Header } from '@/components/Header'
import { fetchProjects, fetchUserAndTeams } from '@/libs/server-side'
import { Projects, Teams, User } from '@/types'
import { ProjectTitleCard } from '@/components/ProjectTitleCard'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { user, teams } = await fetchUserAndTeams()

  const team = teams.find(({ slug }) => slug === query.slug)
  if (!team && user.username !== query.slug)
    return {
      redirect: {
        statusCode: 302,
        destination: `/vercel/${user.username}`
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
      </div>
    </Popover>
  )
}

export default Home
