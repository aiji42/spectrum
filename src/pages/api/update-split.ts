import { NextApiHandler } from 'next'
import { authedHeaders, getToken } from '@/libs/server-side'
import { ENDPOINTS } from '@/endpoints'

const handler: NextApiHandler = async (req, res) => {
  if (!['POST', 'PATCH'].includes(req.method ?? '')) {
    res.status(400).end()
    return
  }
  const token = await getToken({ req })
  const { projectId, splits, teamId, envId, webhook } = req.body
  if (!projectId || !splits || !webhook || !token) {
    res.status(400).end()
    return
  }

  const isCreate = !envId
  const url = isCreate
    ? ENDPOINTS.environments(projectId)
    : ENDPOINTS.environment(projectId, envId) +
      (teamId ? `?teamId=${teamId}` : '')

  let response = await fetch(url, {
    method: isCreate ? 'POST' : 'PATCH',
    headers: {
      ...authedHeaders(token),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'plain',
      key: 'SPLIT_CONFIG_BY_SPECTRUM',
      target: ['production'],
      value: JSON.stringify(splits)
    })
  })
  if (!response.ok) {
    const error = await response.json()
    console.log(error)
    await res.status(500).json({
      message: error
    })
    res.end()
    return
  }

  response = await fetch(webhook)

  if (!response.ok) {
    const error = await response.json()
    console.log(error)
    await res.status(500).json({
      message: error
    })
    res.end()
    return
  }

  res.status(200).end()
}

export default handler
