import { VFC } from 'react'
import { auth, Login, Logout } from '@/libs/firebase/firebase'

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
