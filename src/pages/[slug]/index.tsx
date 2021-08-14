import { VFC } from 'react'
import { Team, Teams } from '@/hooks/use-teams'
import { Project } from '@/hooks/use-projects'

import { Popover } from '@headlessui/react'
import { User } from '@/hooks/use-user'
import { GetServerSideProps } from 'next'
import { Header } from '@/components/Header'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { user } = await fetch('https://api.vercel.com/www/user', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
    }
  }).then((res) => res.json())

  const { teams }: Teams = await fetch('https://api.vercel.com/v13/teams', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
    }
  }).then((res) => res.json())

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
  user: User['user']
  teams: Team[]
  projects: Project[]
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
