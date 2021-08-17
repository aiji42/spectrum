import { Projects, Teams, User } from '@/types'
import { ENDPOINTS } from '@/endpoints'
import * as firebaseAdmin from 'firebase-admin'
import { FIREBASE_COOKIE_KEY } from 'next-fortress/build/constants'
import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'

if (!firebaseAdmin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  const {
    client_email: clientEmail,
    project_id: projectId,
    private_key: privateKey
  } = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail,
      projectId,
      privateKey: privateKey.replace(/\\n/g, '\n')
    })
  })
}

export const authedHeaders = (token: string): { Authorization: string } => ({
  Authorization: `Bearer ${token}`
})

export const fetchUserAndTeams = async (
  ctx: GetServerSidePropsContext
): Promise<{
  user: User | undefined
  teams: Teams | undefined
}> => {
  const token = await getToken(ctx)

  const fetchingUser = fetch(ENDPOINTS.user, {
    headers: authedHeaders(token)
  }).then((res) => res.json())

  const fetchingTeams = fetch(ENDPOINTS.teams, {
    headers: authedHeaders(token)
  }).then((res) => res.json())

  const { user }: { user: User } = await fetchingUser
  const { teams }: { teams: Teams } = await fetchingTeams

  return { user, teams }
}

export const fetchProjects = async (
  ctx: GetServerSidePropsContext
): Promise<Projects> => {
  const token = await getToken(ctx)

  return await fetch(ENDPOINTS.projects + `?slug=${ctx.query.slug}`, {
    headers: authedHeaders(token)
  }).then((res) => res.json())
}

export const getToken = async (
  ctx: Pick<GetServerSidePropsContext, 'req'>
): Promise<string> => {
  const cookies = nookies.get(ctx)
  const token = cookies[FIREBASE_COOKIE_KEY]
  const firebaseUser = await firebaseAdmin.auth().verifyIdToken(token)

  const doc = await firebaseAdmin
    .firestore()
    .collection('users')
    .doc(firebaseUser.uid)
    .get()

  if (!doc.exists) throw new Error('Could not get token.')

  return doc.data()?.vercelToken ?? ''
}
