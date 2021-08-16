import { VFC, useContext, FocusEvent } from 'react'
import firebase from 'firebase'
import AuthContext from '@/libs/firebase/AuthContext'

const db = firebase.firestore()

const Setting: VFC = () => {
  const user = useContext(AuthContext)
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    user.uid &&
      db
        .collection('users')
        .doc(user.uid)
        .set({
          vercelToken: e.target.value
        })
        .then(console.log)
  }

  return <input type="text" name="vercelToken" onBlur={handleBlur} />
}

export default Setting
