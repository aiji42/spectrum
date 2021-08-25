import { Dispatch, useEffect, useMemo, useRef, useState, VFC } from 'react'
import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { Splits, SplitFormAction, Project, Team, Deployments } from '@/types'
import { useDeployments } from '@/hooks/use-deployments'

type Props = {
  dispatch: Dispatch<SplitFormAction>
  editingKey: string
  splitsData: Splits
  project: Project
  team: Team | null
}

type FormInput = {
  name: string
  path: string
  original: { branch: string; host: string; weight: number }
  challenger: { branch: string; host: string; weight: number }
  cookie: {
    maxAge: number
  }
}

export const SplitForm: VFC<Props> = (props) => {
  const { dispatch, editingKey, splitsData } = props
  const { register, handleSubmit } = useForm<FormInput>()
  const onSubmit = handleSubmit((data) => {
    dispatch({
      type: editingKey === '' ? 'CREATE' : 'UPDATE',
      key: editingKey,
      newKey: data.name,
      data: {
        path: data.path,
        hosts: {
          [data.original.branch]: {
            host: data.original.host,
            weight: data.original.weight
          },
          [data.challenger.branch]: {
            host: data.challenger.host,
            weight: data.challenger.weight
          }
        },
        cookie: data.cookie
      }
    })
  })

  const data = useMemo(() => {
    const [original, challenger] = Object.entries(
      splitsData[editingKey]?.hosts ?? {}
    )
    return {
      name: editingKey,
      path: splitsData[editingKey]?.path,
      cookieMaxAge: splitsData[editingKey]?.cookie?.maxAge ?? 60 * 60 * 24,
      originalBranch: original?.[0],
      originalHost: original?.[1]?.host,
      originalWeight: original?.[1]?.weight ?? 1,
      challengerBranch: challenger?.[0],
      challengerHost: challenger?.[1]?.host,
      challengerWeight: challenger?.[1]?.weight ?? 1
    }
  }, [editingKey, splitsData])

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-900"
        >
          A/B Tests
        </Dialog.Title>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Test Name
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('name', { required: true })}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                placeholder="test1"
                defaultValue={data.name}
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Path pattern
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('path', { required: true })}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                placeholder="/foo/bar"
                defaultValue={data.path}
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Original branch
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('original.branch', { required: true })}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                placeholder="main"
                defaultValue={data.originalBranch}
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Original deployment host
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('original.host', { required: true })}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                placeholder="original.example.com"
                defaultValue={data.originalHost}
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Challenger branch
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('challenger.branch', { required: true })}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                placeholder="challenger"
                defaultValue={data.challengerBranch}
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Challenger deployment host
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('challenger.host', { required: true })}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                placeholder="challenger.example.com"
                defaultValue={data.challengerHost}
              />
            </div>
            <DeploymentsPanel {...props} />
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Allocate weight for original
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('original.weight', { required: true, min: 1 })}
                type="number"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                defaultValue={data.originalWeight}
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Allocate weight for challenger
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('challenger.weight', { required: true, min: 1 })}
                type="number"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                defaultValue={data.challengerWeight}
              />
            </div>
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Sticky max age (cookie max-age seconds)
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                {...register('cookie.maxAge', { required: true, min: 1 })}
                type="number"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                defaultValue={data.cookieMaxAge}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Save
        </button>
        {editingKey && (
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => dispatch({ type: 'DELETE', key: editingKey })}
          >
            Delete
          </button>
        )}
      </div>
    </form>
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
    <div className="mt-1 bg-white rounded-md shadow overflow-scroll h-80">
      <div className="py-2">
        {deployments.map(({ uid, meta, url, state }) => (
          <div
            key={uid}
            className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
          >
            <div className="text-gray-600 text-sm mx-2">
              <p className="text-gray-400">
                {getBranchName(meta).slice(0, 45)}
              </p>
              <p className="text-gray-400">
                {getCommitMessage(meta).slice(0, 45)}
              </p>
              <p className="text-green-300">{state}</p>
              <p className="">{url}</p>
            </div>
          </div>
        ))}
      </div>
      {data?.next && (
        <div
          onClick={() => setNext(data?.next)}
          className="block bg-gray-800 text-white text-center font-bold py-2"
        >
          See More
        </div>
      )}
    </div>
  )
}

const getBranchName = (meta: Record<string, string>): string => {
  const [, branchName] =
    Object.entries(meta).find(([key]) => key.includes('CommitRef')) ?? []
  return branchName ?? ''
}

const getCommitMessage = (meta: Record<string, string>): string => {
  const [, message] =
    Object.entries(meta).find(([key]) => key.includes('CommitMessage')) ?? []
  return message ?? ''
}
