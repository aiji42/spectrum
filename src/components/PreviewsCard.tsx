import { VFC } from 'react'
import { Deployment, Project, Team, User } from '@/types'
import { useDeployments } from '@/hooks/use-deployments'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

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
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Up to 20 latest preview deployments.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <DeploymentsPanel {...props} />
      </div>
    </div>
  )
}

const DeploymentsPanel: VFC<Props> = ({ team, project }) => {
  const deployments = useDeployments(
    {
      projectId: project.id,
      teamId: team?.id,
      target: 'preview',
      limit: 20
    },
    { refreshInterval: 5000 }
  )

  return (
    <div className="bg-white rounded-md shadow">
      {deployments?.deployments.map(({ uid, meta, url, state, createdAt }) => (
        <DeploymentsPanelItem
          key={uid}
          branchName={getBranchName(meta)}
          commitMessage={getCommitMessage(meta)}
          committer={getCommitter(meta)}
          state={state}
          host={url}
          createdAt={createdAt}
        />
      ))}
    </div>
  )
}

const DeploymentsPanelItem: VFC<{
  branchName: string
  commitMessage: string
  committer: string
  state: Deployment['state']
  host: string
  createdAt: number
}> = ({ branchName, commitMessage, committer, state, host, createdAt }) => {
  return (
    <div className="py-3 px-4 sm:px-0 border-b">
      <div className="text-gray-600 text-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <p className="truncate font-bold text-gray-700 max-w-xs">{host}</p>
        <p className="pb-1 sm:ml-4  max-w-xs">
          <p className="truncate">{commitMessage}</p>
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
        <p className="pb-1 sm:ml-4">
          <p
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
          </p>
          <p className="pb-1">
            {dayjs().to(dayjs(createdAt))} by {committer}
          </p>
        </p>
      </div>
    </div>
  )
}

const getBranchName = (meta: Record<string, string>): string => {
  const [, branchName] =
    Object.entries(meta).find(([key]) => key.includes('CommitRef')) ?? []
  return branchName ?? ''
}

const getCommitMessage = (meta: Record<string, string>): string => {
  const [, msg] =
    Object.entries(meta).find(([key]) => key.includes('CommitMessage')) ?? []
  return msg ?? ''
}

const getCommitter = (meta: Record<string, string>): string => {
  const [, msg] =
    Object.entries(meta).find(([key]) => key.includes('CommitAuthorLogin')) ??
    []
  return msg ?? ''
}
