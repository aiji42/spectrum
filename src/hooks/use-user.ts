import useSWR from 'swr'

const URL = 'https://api.vercel.com/www/user'

export type User = {
  user: {
    uid: string
    username: string
  }
}

export const useUser = (): User | undefined => {
  const { data } = useSWR<User>(URL)

  return data
}
