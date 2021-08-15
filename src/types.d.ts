export type User = {
  uid: string
  username: string
}

export type Team = {
  id: string
  slug: string
  name: string
}

export type Teams = Team[]

export type Project = {
  id: string
  name: string
  targets: {
    production: {
      alias: string[]
      deploymentHostname: string
      meta: Record<string, string>
      name: string
      readyState: 'QUEUED' | 'CANCELED' | 'BUILDING' | 'READY' | 'ERROR'
      createdAt: number
    }
  }
  link: {
    deployHooks: Array<{
      id: string
      name: string
      ref: string
      url: string
    }>
  }
  env: Array<{
    type: string
    value: string
    target: string[]
    id: string
    key: string
    createdAt: number
    updatedAt: number
  }>
}

export type Projects = Project[]
