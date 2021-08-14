import { StopIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useRef, VFC } from 'react'
import { Project } from '@/hooks/use-projects'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import equal from 'fast-deep-equal'

const splits: Record<
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

type EditingSplit = {
  name: string
  path: string
  originalBranch: string
  originalHost: string
  originalWeight: number
  challengerBranch: string
  challengerHost: string
  challengerWeight: number
  stickyMaxAge: number
} | null

type Props = {
  project: Project
}

export const SplitTestsCard: VFC<Props> = ({ project }) => {
  const [editingSplit, setEditingSplit] = useState<EditingSplit>(null)
  const currentSplits = useRef(splits)
  const makeClickHandler = (name: string) => () => {
    const split = currentSplits.current[name]
    const [[originalBranch, original], [challengerBranch, challenger]] =
      Object.entries(split.hosts)
    setEditingSplit({
      name,
      path: split.path,
      originalBranch,
      originalHost: original.host,
      originalWeight: original.weight,
      challengerBranch,
      challengerHost: challenger.host,
      challengerWeight: challenger.weight,
      stickyMaxAge: split.cookie.maxAge
    })
  }
  const handleCancel = () => setEditingSplit(null)
  const handleSave = (key: string | null, data: EditingSplit) => {
    if (!key && data) {
      currentSplits.current = {
        ...currentSplits.current,
        [data.name]: {
          path: data.path,
          hosts: {
            [data.originalBranch]: {
              host: data.originalHost,
              weight: data.originalWeight
            },
            [data.challengerBranch]: {
              host: data.challengerHost,
              weight: data.challengerWeight
            }
          },
          cookie: {
            maxAge: data.stickyMaxAge
          }
        }
      }
      setEditingSplit(null)
      return
    }

    if (!data) {
      const newSplits = Object.entries(currentSplits.current).reduce<
        typeof splits
      >((res, [name, split]) => {
        if (key === name) return res
        return { ...res, [name]: split }
      }, {})
      currentSplits.current = newSplits
      setEditingSplit(null)
      return
    }

    const newSplits = Object.entries(currentSplits.current).reduce<
      typeof splits
    >((res, [name, split]) => {
      if (key === name)
        return {
          ...res,
          [data.name]: {
            path: data.path,
            hosts: {
              [data.originalBranch]: {
                host: data.originalHost,
                weight: data.originalWeight
              },
              [data.challengerBranch]: {
                host: data.challengerHost,
                weight: data.challengerWeight
              }
            },
            cookie: {
              maxAge: data.stickyMaxAge
            }
          }
        }
      return { ...res, [name]: split }
    }, {})
    currentSplits.current = newSplits
    setEditingSplit(null)
  }

  return (
    <div className="shadow sm:rounded-lg">
      <div className="flex items-center justify-between bg-gray-800 px-5 py-4 sm:rounded-t-lg">
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-xl sm:truncate">Split Tests</h3>
        </div>
        {!equal(currentSplits.current, splits) && (
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

      {Object.entries(currentSplits.current).map(([key, split]) => (
        <div
          className="py-4 bg-white cursor-pointer hover:bg-gray-50"
          key={key}
          onClick={makeClickHandler(key)}
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
      <div className="flex justify-start py-4 px-4 sm:px-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          onClick={() => {
            setEditingSplit({
              name: '',
              path: '',
              originalBranch: '',
              originalHost: '',
              originalWeight: 1,
              challengerBranch: '',
              challengerHost: '',
              challengerWeight: 1,
              stickyMaxAge: 60 * 60 * 24
            })
          }}
        >
          <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Split Test
        </button>
      </div>
      <EditModal
        {...{
          handleCancel,
          handleSave,
          editingSplit,
          name: editingSplit?.name ?? ''
        }}
      />
    </div>
  )
}

type EditModalProps = {
  name: string | null
  editingSplit: EditingSplit
  handleCancel: () => void
  handleSave: (key: string | null, data: EditingSplit) => void
}

const EditModal: VFC<EditModalProps> = ({
  name,
  editingSplit,
  handleCancel,
  handleSave
}) => {
  return (
    <Transition.Root show={!!editingSplit} as={Fragment}>
      <Dialog
        as="div"
        auto-reopen="true"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleCancel}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const {
                    testName,
                    path,
                    originalBranch,
                    originalHost,
                    originalWeight,
                    challengerBranch,
                    challengerHost,
                    challengerWeight,
                    stickyMaxAge
                  } = e.currentTarget
                  handleSave(name, {
                    name: testName.value,
                    path: path.value,
                    originalBranch: originalBranch.value,
                    originalHost: originalHost.value,
                    originalWeight: Number(originalWeight.value),
                    challengerBranch: challengerBranch.value,
                    challengerHost: challengerHost.value,
                    challengerWeight: Number(challengerWeight.value),
                    stickyMaxAge: Number(stickyMaxAge.value)
                  })
                }}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Split Tests
                  </Dialog.Title>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Test Name
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="testName"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="test1"
                          defaultValue={editingSplit?.name}
                          required
                        />
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Path pattern
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="path"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="/foo/bar"
                          defaultValue={editingSplit?.path}
                          required
                        />
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Original branch
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="originalBranch"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="main"
                          defaultValue={editingSplit?.originalBranch}
                          required
                        />
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Original deployment host
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="originalHost"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="original.example.com"
                          defaultValue={editingSplit?.originalHost}
                          required
                        />
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Challenger branch
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="challengerBranch"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="challenger"
                          defaultValue={editingSplit?.challengerBranch}
                          required
                        />
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Challenger deployment host
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="challengerHost"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="challenger.example.com"
                          defaultValue={editingSplit?.challengerHost}
                          required
                        />
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Allocate weight for original
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="originalWeight"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={editingSplit?.originalWeight ?? 1}
                          required
                        />
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Allocate weight for challenger
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="challengerWeight"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={editingSplit?.challengerWeight ?? 1}
                          required
                        />
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mt-4">
                      Split sticky max age (cookie max-age seconds)
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="stickyMaxAge"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={
                            editingSplit?.stickyMaxAge ?? 60 * 60 * 24
                          }
                          required
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  {name && (
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleSave(name, null)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
