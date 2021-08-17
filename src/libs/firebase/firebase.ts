import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Dispatch } from 'react'
import { Action } from './authReducer'

type Unsubscribe = firebase.Unsubscribe
type User = firebase.User

export const config = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? '{}'
)

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export const auth = firebase.auth()
export const Firebase = firebase

export const Login = (): void => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.log(error)
      const errorCode = error.code
      console.log(errorCode)
      const errorMessage = error.message
      console.log(errorMessage)
    })
}

export const listenAuthState = (dispatch: Dispatch<Action>): Unsubscribe => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      dispatch({
        type: 'logout'
      })
      return
    }

    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (!doc.exists)
          doc.ref.set({
            vercelToken: null
          })
        dispatch({
          type: 'login',
          payload: {
            user,
            storeDoc: doc
          }
        })
      })
  })
}

export const firebaseUser = (): User | null => {
  return firebase.auth().currentUser
}

export const Logout = (): void => {
  auth.signOut().then(() => {
    window.location.reload()
  })
}
