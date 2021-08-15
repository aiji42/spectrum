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

export type Splits = Record<
  string,
  {
    path: string
    hosts: Record<string, { host: string; weight: number }>
    cookie: { maxAge: number }
  }
>

export type SplitFormAction =
  | {
      type: 'UPDATE' | 'CREATE'
      key: string
      newKey: string
      data: Splits[string]
    }
  | {
      type: 'DELETE'
      key: string
    }
  | {
      type: 'RELOAD'
      data: Splits
    }
