import { createContext } from 'react'
import { State } from './authReducer'

const AuthContext = createContext<State>(null)
export default AuthContext
