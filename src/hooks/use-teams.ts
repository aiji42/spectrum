import useSWR from 'swr'
import { Teams } from '@/types'
import { ENDPOINTS } from '@/endpoints'

export const useTeams = (): Teams | undefined => {
  const { data } = useSWR<Teams>(ENDPOINTS.teams)

  return data
}
