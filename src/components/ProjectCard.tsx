import { useReducer, VFC, Fragment, useEffect } from 'react'
import { Project, Team, User } from '@/types'
import dayjs from 'dayjs'
import { isControllableDeploy } from '@/utils'
import {
  ExternalLinkIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon
} from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useProject } from '@/hooks/use-projects'

type Props = {
  project: Project
  user: User
  team: Team | null
}

export const ProjectCard: VFC<Props> = (props) => {
  const [isOpenModal, modalDispatch] = useReducer(
    (state: boolean, action: boolean | undefined) =>
      typeof action === 'boolean' ? action : !state,
    false
  )
  const project = useProject({ refreshInterval: 5000 }) ?? props.project
  useEffect(() => {
    modalDispatch(!isControllableDeploy(props.project))
  }, [props.project])

  return (
    <div className="bg-white shadow-md overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {project.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Latest production deployment information.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span
                className={
                  project.targets.production.readyState === 'READY'
                    ? 'text-green-600'
                    : project.targets.production.readyState === 'ERROR'
                    ? 'text-red-600'
                    : project.targets.production.readyState === 'BUILDING'
                    ? 'text-yellow-600'
                    : 'text-gray-600'
                }
              >
                {project.targets.production.readyState}
              </span>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Domains</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {project.alias.map((alias) => (
                <p key={alias.domain}>{alias.domain}</p>
              ))}
              {project.targets.production.alias.map((alias) => (
                <p key={alias}>{alias}</p>
              ))}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {dayjs(project.targets.production.createdAt).format(
                'YYYY-MM-DD HH:mm:ss'
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Webhook</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span
                className={`${
                  isControllableDeploy(project)
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {isControllableDeploy(project) ? 'Created' : 'Not Created'}
              </span>
              {!isControllableDeploy(project) && (
                <QuestionMarkCircleIcon
                  className="ml-2 mr-2 h-5 w-5 cursor-pointer inline-block"
                  aria-hidden="true"
                  onClick={() => modalDispatch(undefined)}
                />
              )}
            </dd>
          </div>
        </dl>
      </div>

      <Transition.Root show={isOpenModal} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={modalDispatch}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <Dialog.Title
                    as="h3"
                    className="leading-6 text-2xl font-medium text-gray-900"
                  >
                    <LightBulbIcon
                      className="mb-2 mr-2 h-6 w-6 inline-block text-green-500"
                      aria-hidden="true"
                    />
                    Create a webhook for Spectrum.
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="mt-1 text-base text-gray-600">
                      In order for Spectrum to control the A/B testing of your
                      website, it needs a hook to run deployments. Please follow
                      the instructions below to operate the Vercel web console.
                    </p>
                    <p className="mt-3 max-w-2xl text-base text-gray-500">
                      <b>Project Settings</b> &gt; <b>git</b> &gt;{' '}
                      <b>Deploy Hooks</b>{' '}
                      <a
                        href={`https://vercel.com/${
                          props.team?.slug ?? props.user.username
                        }/${props.project.name}/settings/git  `}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLinkIcon className="ml-2 inline-block w-4 h-4 text-indigo-500 hover:text-indigo-600" />
                      </a>
                    </p>
                    <div className="opacity-80">
                      <Image
                        src="/deploy-hook-sample.png"
                        alt="deploy hook sample"
                        width={778}
                        height={329}
                      />
                    </div>
                    <p className="mt-1 text-base text-gray-600">
                      Name must be{' '}
                      <span className="bg-gray-100 text-red-400 p-1">
                        for-spectrum
                      </span>{' '}
                      and branch must be the same as the value registered in the
                      production deployment (e.g. main). Spectrum automatically
                      retrieves this webhook, so you don&apos;t need to remember
                      the URL.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => modalDispatch(undefined)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
