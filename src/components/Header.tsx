import { Fragment, VFC } from 'react'
import { Popover, Transition } from '@headlessui/react'
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
import { isControllableDeploy, isRunningSplitTests } from '@/utils'
import { firebaseUser, Login } from '@/libs/firebase/firebase'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  project?: Project
  slug?: string
  user?: User
  teams: Teams
  projects: Projects
}

export const Header: VFC<Props> = ({
  project,
  projects,
  slug,
  user,
  teams
}) => {
  const isLoggedIn = !!firebaseUser()

  return (
    <div className="flex items-center border-b-2 border-gray-100 py-4 justify-start space-x-10">
      <div className="flex-1 justify-start lg:w-0">
        <div className="h-10 w-auto">
          <Image
            src="/prism.svg"
            alt="logo"
            height={44}
            width={61}
            quality={100}
            priority
          />
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
                                <span className="text-sm text-gray-500">
                                  {!isControllableDeploy(project) && 'Not '}
                                  Controllable
                                </span>
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
        {isLoggedIn ? (
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
            onClick={Login}
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign in
          </a>
        )}
      </div>
    </div>
  )
}
