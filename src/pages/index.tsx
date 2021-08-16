import { VFC } from 'react'
import { GetServerSideProps } from 'next'
import { fetchUserAndTeams } from '@/libs/server-side'
import { auth, Login, Logout } from '@/libs/firebase/firebase'

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { user } = await fetchUserAndTeams()
//
//
// }

const Home: VFC = () => {
  return (
    <>
      {!auth.currentUser ? (
        <button onClick={() => Login()}>
          <h2>Login</h2>
          <p>You are Not logged in.</p>
        </button>
      ) : (
        <button onClick={() => Logout()}>
          <h2>Logout</h2>
          <p>You are logged in.</p>
        </button>
      )}
    </>
  )
}

export default Home
