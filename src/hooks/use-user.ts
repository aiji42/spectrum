import useSWR from 'swr'
import { User } from '@/types'
import { ENDPOINTS } from '@/endpoints'

export const useUser = (): User | undefined => {
  const { data } = useSWR<User>(ENDPOINTS.user)

  return data
}
