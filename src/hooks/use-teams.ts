import useSWR from 'swr'

const URL = 'https://api.vercel.com/v13/teams'

export type Team = {
  id: string
  slug: string
  name: string
}

export type Teams = {
  teams: Team[]
}

export const useTeams = (): Teams | undefined => {
  const { data } = useSWR<Teams>(URL)

  return data
}
