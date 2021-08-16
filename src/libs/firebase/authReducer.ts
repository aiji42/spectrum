import firebase from 'firebase'

type User = firebase.User

const initialState = {}

export type Action =
  | {
      type: 'login'
      payload: {
        user: User
      }
    }
  | {
      type: 'logout'
    }

const reducer = (
  state: User | Record<string, never>,
  action: Action
): User | Record<string, never> => {
  switch (action.type) {
    case 'login':
      return action.payload.user
    case 'logout':
      return initialState
    default:
      return state
  }
}

export default {
  initialState,
  reducer
}
