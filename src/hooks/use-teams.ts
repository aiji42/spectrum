import useSWR from "swr";

const URL = 'https://api.vercel.com/v13/teams'

type Team = {
  id: string
  slug: string
  name: string
}

type Teams = {
  teams: Team[]
}

export const useTeams = () => {
  const { data } = useSWR<Teams>(URL)

  return data
}