import { PencilIcon, StopIcon } from '@heroicons/react/solid'
import { VFC } from 'react'
import { Project } from '@/hooks/use-projects'

const splits = {
  example1: {
    path: '/foo/:path*',
    hosts: {
      original: { host: 'example.com', weight: 1 },
      challenger: {
        host: 'challenger-for-example1.vercel.app',
        weight: 1
      }
    },
    cookie: {
      maxAge: 60 * 60 * 12
    }
  },
  example2: {
    path: '/bar/:path*',
    hosts: {
      original: { host: 'example.com', weight: 1 },
      challenger: {
        host: 'challenger-for-example2.vercel.app',
        weight: 1
      }
    }
  }
}

type Props = {
  project: Project
}

export const SplitTestsCard: VFC<Props> = ({ project }) => {
  return (
    <div className="shadow sm:rounded-lg">
      <div className="flex items-center justify-between bg-gray-800 px-5 py-4 sm:rounded-t-lg">
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-xl sm:truncate">Split Tests</h3>
        </div>
        <div className="flex mt-0 ml-4">
          <span className="block">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              Edit
            </button>
          </span>

          <span className="ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <StopIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Stop
            </button>
          </span>
        </div>
      </div>

      {Object.entries(splits).map(([key, split]) => (
        <div className="py-4 bg-white" key={key}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className="mt-2 text-xl leading-8 tracking-tight text-gray-900">
              {key}
              <span className="ml-4 text-base le text-gray-500 tracking-wide">
                {split.path}
              </span>
            </h4>
            <div className="mt-4">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {Object.entries(split.hosts).map(([branch, host], index) => (
                  <div className="relative" key={branch}>
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        {['A', 'B', 'C', 'D'][index]}
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {branch}
                      </p>
                    </dt>
                    <dd className="ml-16 text-sm text-gray-500">{host.host}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
