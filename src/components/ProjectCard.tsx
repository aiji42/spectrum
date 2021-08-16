import { useReducer, VFC, Fragment } from 'react'
import { Project } from '@/types'
import dayjs from 'dayjs'
import { isControllableDeploy } from '@/utils'
import {
  ExclamationIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useProject } from '@/hooks/use-projects'

type Props = {
  project: Project
}

export const ProjectCard: VFC<Props> = (props) => {
  const [isOpenModal, modalDispatch] = useReducer((state) => !state, false)
  const project = useProject({ refreshInterval: 5000 }) ?? props.project
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
                className={statusColor(project.targets.production.readyState)}
              >
                {project.targets.production.readyState}
              </span>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Domains</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
            <dt className="text-sm font-medium text-gray-500">
              Controllable by Spectrum
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span
                className={`text-${
                  isControllableDeploy(project) ? 'green' : 'red'
                }-600`}
              >
                {isControllableDeploy(project) ? 'YES' : 'NO'}
              </span>
              {!isControllableDeploy(project) && (
                <QuestionMarkCircleIcon
                  className="ml-2 mr-2 h-5 w-5 cursor-pointer inline-block"
                  aria-hidden="true"
                  onClick={modalDispatch}
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    <ExclamationIcon
                      className="-ml-1 mr-2 h-5 w-5 inline-block text-red-800"
                      aria-hidden="true"
                    />
                    The web hook is not registered.
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Spectrum will deploy to start or update for split tests,
                      so please follow the steps below to register your web hook
                      in Vercel.
                    </p>
                    <Image
                      src="/deploy-hook-sample.png"
                      alt="deploy hook sample"
                      width={778}
                      height={329}
                    />
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      In Vercel, <b>Project Settings</b> &gt; <b>git</b> &gt;{' '}
                      <b>Deploy Hooks</b>
                    </p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Name must be &quot;<b>for-spectrum</b>&quot; and branch
                      must be the same as the value registered in the production
                      deployment (e.g. main).
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={modalDispatch}
                  >
                    Close
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

const statusColor = (
  status: Project['targets']['production']['readyState']
) => {
  return `text-${
    status === 'READY'
      ? 'green'
      : status === 'ERROR'
      ? 'red'
      : status === 'BUILDING'
      ? 'yellow'
      : 'read'
  }-600`
}
