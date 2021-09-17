import { Fragment, useReducer, VFC } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  LightningBoltIcon as LightningBoltIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/react/solid'
import Link from 'next/link'
import Image from 'next/image'
import {
  LightningBoltIcon,
  UserIcon,
  UsersIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { Project, Projects, Teams, User } from '@/types'
import { isRunningSplitTests } from '@/utils'
import { Login } from '@/libs/firebase/firebase'
import {
  GoogleLoginButton,
  GithubLoginButton
} from 'react-social-login-buttons'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  project?: Project
  slug?: string
  user?: User
  teams: Teams
  projects: Projects
  loggedIn: boolean
}

export const Header: VFC<Props> = ({
  project,
  projects,
  slug,
  user,
  teams,
  loggedIn
}) => {
  const [openLoginWindow, toggleLoginWindow] = useReducer(
    (state) => !state,
    false
  )
  return (
    <div className="flex items-center border-b-2 border-gray-100 py-4 justify-start space-x-10">
      <div className="flex-1 justify-start lg:w-0">
        <div className="h-10 w-auto sm:pl-4">
          <Link href="/">
            <a>
              <Image
                src="/logo.svg"
                alt="logo"
                height={40}
                width={40}
                quality={100}
                priority
              />
            </a>
          </Link>
        </div>
      </div>
      <Popover.Group as="nav" className="flex space-x-10">
        {user && (
          <Popover className="relative">
            {({ open, close }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open ? 'text-gray-900' : 'text-gray-500',
                    'mt-1 group bg-white rounded-md inline-flex items-center text-sm sm:text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                >
                  <span className="hidden sm:block">{slug ?? 'Team'}</span>
                  <UserIconSolid
                    className="sm:hidden h-6 w-6 text-gray-500 hover:text-gray-900"
                    aria-hidden="true"
                  />
                  <ChevronDownIcon
                    className={classNames(
                      open ? 'text-gray-600' : 'text-gray-400',
                      'h-6 w-6 group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 sm:w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {user && (
                          <Link href={`/vercel/${user.username}`}>
                            <a
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              onClick={() => close()}
                            >
                              <UserIcon
                                className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {user.username}
                                </p>
                              </div>
                            </a>
                          </Link>
                        )}
                        {teams.map((team) => (
                          <Link href={`/vercel/${team.slug}`} key={team.id}>
                            <a
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              onClick={() => close()}
                            >
                              <UsersIcon
                                className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {team.name}
                                </p>
                              </div>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        )}

        {user && (
          <Popover className="relative">
            {({ open, close }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open ? 'text-gray-900' : 'text-gray-500',
                    'mt-1 group bg-white rounded-md inline-flex items-center text-sm sm:text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                >
                  <span className="hidden sm:block">
                    {project?.name ?? 'Project'}
                  </span>
                  <LightningBoltIconSolid
                    className="sm:hidden h-6 w-6 text-gray-500 hover:text-gray-900"
                    aria-hidden="true"
                  />
                  <ChevronDownIcon
                    className={classNames(
                      open ? 'text-gray-600' : 'text-gray-400',
                      'ml-2 h-6 w-6 group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 sm:w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {projects.length < 1 && (
                          <div className="-m-3 p-3 flex items-start rounded-lg">
                            <div>
                              <p className="text-base font-medium text-gray-500">
                                No projects
                              </p>
                            </div>
                          </div>
                        )}
                        {projects.map((project) => (
                          <Link
                            href={`/vercel/${slug}/${project.name}`}
                            key={project.id}
                          >
                            <a
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              onClick={() => close()}
                            >
                              {isRunningSplitTests(project) ? (
                                <LightningBoltIconSolid
                                  className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : (
                                <LightningBoltIcon
                                  className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                  aria-hidden="true"
                                />
                              )}

                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  {project.name}
                                </p>
                              </div>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        )}
      </Popover.Group>
      <div className="flex items-center justify-end">
        {loggedIn ? (
          <Link href="/setting">
            <a className="mt-1 mx-4">
              <AdjustmentsIcon
                className="h-6 w-6 text-gray-500 hover:text-gray-900"
                aria-hidden="true"
              />
            </a>
          </Link>
        ) : (
          <a
            href="#"
            onClick={toggleLoginWindow}
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-400 hover:bg-green-500"
          >
            Sign in
          </a>
        )}
      </div>
      <Transition.Root show={openLoginWindow} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={toggleLoginWindow}
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-300 bg-opacity-50 transition-opacity" />
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="py-24 px-4 sm:px-12">
                  <p className="text-3xl font-bold text-center p-4">
                    Select Auth Provider
                  </p>
                  <div className="my-2">
                    <GithubLoginButton onClick={() => Login('github')} />
                  </div>
                  <div className="my-2">
                    <GoogleLoginButton onClick={() => Login('google')} />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
