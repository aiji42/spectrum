import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (!['POST', 'PATCH'].includes(req.method ?? '')) {
    res.status(400).end()
    return
  }
  const { projectId, splits, teamId, envId } = req.body
  if (!projectId || !splits) {
    res.status(400).end()
    return
  }

  const url = `https://api.vercel.com/v8/projects/${projectId}/env/${
    envId ?? ''
  }${teamId ? `?teamId=${teamId}` : ''}`

  const responseData = await fetch(url, {
    method: envId ? 'PATCH' : 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'plain',
      key: 'SPLIT_CONFIG_BY_SPECTRUM',
      target: ['production'],
      value: JSON.stringify(splits)
    })
  }).then((res) => res.json())

  console.log(responseData)

  res.status(200).end()
}

export default handler