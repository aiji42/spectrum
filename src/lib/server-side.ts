import { Projects, Teams, User } from '@/types'
import { ParsedUrlQuery } from 'querystring'
import { ENDPOINTS } from '@/endpoints'

const authedHeaders = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`
}

export const fetchUserAndTeams = async (): Promise<{
  user: User
  teams: Teams
}> => {
  const fetchingUser = fetch(ENDPOINTS.user, {
    headers: authedHeaders
  }).then((res) => res.json())

  const fetchingTeams = fetch(ENDPOINTS.teams, {
    headers: authedHeaders
  }).then((res) => res.json())

  const { user }: { user: User } = await fetchingUser
  const { teams }: { teams: Teams } = await fetchingTeams

  return { user, teams }
}

export const fetchProjects = async (
  query: ParsedUrlQuery
): Promise<Projects> => {
  const projects: Projects = await fetch(
    ENDPOINTS.projects + `?slug=${query.slug}`,
    {
      headers: authedHeaders
    }
  ).then((res) => res.json())

  return projects
}
