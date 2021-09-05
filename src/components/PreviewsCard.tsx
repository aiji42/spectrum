import { VFC, useEffect, useState } from 'react'
import { Deployment, Deployments, Project, Team, User } from '@/types'
import { useDeployments } from '@/hooks/use-deployments'

type Props = {
  project: Project
  user: User
  team: Team | null
}

export const PreviewsCard: VFC<Props> = (props) => {
  return (
    <div className="bg-white shadow-md overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Previews
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <DeploymentsPanel {...props} />
      </div>
    </div>
  )
}

const DeploymentsPanel: VFC<Props> = ({ team, project }) => {
  const [next, setNext] = useState<undefined | number>()
  const data = useDeployments({
    projectId: project.id,
    teamId: team?.id,
    next
  })
  const [deployments, setDeployments] = useState<Deployments>([])
  useEffect(() => {
    if (!data?.deployments) return
    setDeployments((prev) => [...prev, ...data.deployments])
  }, [data?.deployments])

  return (
    <div className="mt-1 bg-white rounded-md shadow">
      <div className="pt-2 overflow-scroll overflow-x-hidden h-96">
        {deployments.map(({ uid, meta, url, state, target }) => (
          <DeploymentsPanelItem
            key={uid}
            branchName={getBranchName(meta)}
            target={target ?? 'preview'}
            state={state}
            host={url}
          />
        ))}
      </div>
      {data?.next && (
        <button
          onClick={() => setNext(data?.next)}
          className="block w-full cursor-pointer bg-gray-700 hover:bg-gray-800 text-white text-center font-bold py-4"
        >
          See More
        </button>
      )}
    </div>
  )
}

const DeploymentsPanelItem: VFC<{
  branchName: string
  state: Deployment['state']
  host: string
  target: string
}> = ({ branchName, state, target, host }) => {
  return (
    <div className="flex items-center px-4 py-3 border-b hover:bg-gray-100 cursor-pointer">
      <div className="text-gray-400 text-sm">
        <p className="truncate pb-1">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
            className="inline-block mr-1"
          >
            <path d="M6 3v12" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 01-9 9" />
          </svg>
          {branchName}
        </p>
        <p className="truncate pb-1">
          <span className="mr-2">{target}</span>
          <span
            className={
              state === 'READY'
                ? 'text-green-600'
                : state === 'ERROR'
                ? 'text-red-600'
                : state === 'BUILDING'
                ? 'text-yellow-600'
                : 'text-gray-600'
            }
          >
            {state}
          </span>
        </p>
        <p className="truncate text-gray-600 font-bold">{host}</p>
      </div>
    </div>
  )
}

const getBranchName = (meta: Record<string, string>): string => {
  const [, branchName] =
    Object.entries(meta).find(([key]) => key.includes('CommitRef')) ?? []
  return branchName ?? ''
}
