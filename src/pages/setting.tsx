import { VFC, useContext, FocusEvent } from 'react'
import AuthContext from '@/libs/firebase/AuthContext'

const Setting: VFC = () => {
  const authInfo = useContext(AuthContext)
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    authInfo?.storeDoc.ref
      .set({
        vercelToken: e.target.value
      })
      .catch(console.log)
  }

  return <input type="text" name="vercelToken" onBlur={handleBlur} />
}

export default Setting
