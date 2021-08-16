import { createContext } from 'react'
import firebase from 'firebase'

type User = firebase.User

const AuthContext = createContext<User | Record<string, never>>({})
export default AuthContext
