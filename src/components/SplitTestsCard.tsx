import { PlayIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { VFC } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SplitForm } from '@/components/SplitForm'
import { Project, Splits, Team } from '@/types'
import { useSplitTestCard } from '@/hooks/use-split-tests-card'

type Props = {
  project: Project
  team: Team | null
  splits: Splits
}

export const SplitTestsCard: VFC<Props> = ({ project, team, splits }) => {
  const [status, helper] = useSplitTestCard({ project, team, splits })
  const isEditing = status.editingKey !== null

  return (
    <div className="shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-400 to-indigo-500 px-5 py-4 sm:rounded-t-lg">
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-xl sm:truncate">A/B Tests</h3>
        </div>
        {status.deployable && (
          <span className="ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={helper.handleDeploy}
            >
              <PlayIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Deploy
            </button>
          </span>
        )}
      </div>
      {Object.keys(status.currentSplits).length < 1 && (
        <p className="text-center text-gray-500 mt-6 text-lg">
          Tests are not exist.
        </p>
      )}
      {Object.entries(status.currentSplits).map(([key, split]) => (
        <div
          className={`py-4 bg-white ${
            status.controllable ? 'cursor-pointer hover:bg-gray-50' : ''
          }`}
          key={key}
          onClick={() => helper.handleEdit(key)}
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
                        {['A', 'B'][index]}
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
          className="inline-flex items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 disabled:opacity-50 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          onClick={helper.handleCreate}
          disabled={!status.controllable}
        >
          <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add
        </button>
      </div>
      <Transition.Root show={isEditing} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={helper.handleClose}
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
                  editingKey={status.editingKey ?? ''}
                  dispatch={helper.formDispatch}
                  splitsData={status.currentSplits}
                  project={project}
                  team={team}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
