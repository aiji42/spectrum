import { StopIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useCallback, useEffect, useReducer, VFC } from 'react'
import { Project } from '@/hooks/use-projects'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import equal from 'fast-deep-equal'
import { SplitForm } from '@/components/SpritForm'

export const splits: Record<
  string,
  {
    path: string
    hosts: Record<string, { host: string; weight: number }>
    cookie: { maxAge: number }
  }
> = {
  example1: {
    path: '/ohaka/pref-:pref(\\w+)/link',
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
    },
    cookie: {
      maxAge: 60 * 60 * 12
    }
  }
}

type Props = {
  project: Project
}

export type SplitFormAction =
  | {
      type: 'UPDATE' | 'CREATE'
      key: string
      newKey: string
      data: typeof splits[string]
    }
  | {
      type: 'DELETE'
      key: string
    }

const reducer = (state: typeof splits, action: SplitFormAction) => {
  const newState = { ...state }
  if (action.type === 'DELETE') {
    delete newState[action.key]
    return newState
  }
  if (action.type === 'UPDATE') {
    delete newState[action.key]
    newState[action.newKey] = action.data
    return newState
  }

  newState[action.newKey] = action.data
  return newState
}

export const SplitTestsCard: VFC<Props> = ({ project }) => {
  const [currentSplits, dispatch] = useReducer(reducer, splits)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const handleClose = useCallback(() => setEditingKey(null), [])
  const handleCreate = useCallback(() => setEditingKey(''), [])
  const isEditing = editingKey !== null
  useEffect(() => {
    handleClose()
  }, [currentSplits, handleClose])

  return (
    <div className="shadow sm:rounded-lg">
      <div className="flex items-center justify-between bg-gray-800 px-5 py-4 sm:rounded-t-lg">
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-xl sm:truncate">Split Tests</h3>
        </div>
        {!equal(currentSplits, splits) && (
          <span className="ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <StopIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Deploy
            </button>
          </span>
        )}
      </div>

      {Object.entries(currentSplits).map(([key, split]) => (
        <div
          className="py-4 bg-white cursor-pointer hover:bg-gray-50"
          key={key}
          onClick={() => setEditingKey(key)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className="text-xl leading-8 tracking-tight text-gray-900">
              {key}
              <span className="ml-4 text-base le text-gray-500 tracking-wide">
                {split.path}
              </span>
            </h4>
            <div className="my-4">
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
      <div className="flex justify-center py-4 px-4 mt-4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          onClick={handleCreate}
        >
          <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Split Test
        </button>
      </div>
      <Transition.Root show={isEditing} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={handleClose}
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
                <SplitForm
                  editingKey={editingKey ?? ''}
                  dispatch={dispatch}
                  splitsData={currentSplits}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
