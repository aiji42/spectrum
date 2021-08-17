import firebase from 'firebase'

export type State = {
  user: firebase.User
  storeDoc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
} | null

export type Action =
  | {
      type: 'login'
      payload: {
        user: firebase.User
        storeDoc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
      }
    }
  | {
      type: 'logout'
    }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'login':
      return action.payload
    case 'logout':
      return null
    default:
      return state
  }
}
