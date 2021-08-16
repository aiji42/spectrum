import { VFC } from 'react'
import { Project } from '@/types'
import { isControllableDeploy, isRunningSplitTests } from '@/utils'
import { LightningBoltIcon as LightningBoltIconSolid } from '@heroicons/react/solid'
import { LightningBoltIcon } from '@heroicons/react/outline'

type Props = {
  project: Project
}

export const ProjectTitleCard: VFC<Props> = ({ project }) => {
  return (
    <div className="bg-white shadow-md sm:rounded-lg hover:bg-gray-50">
      <div className="px-4 py-5 sm:px-6 flex items-start">
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {project.name}
          </h3>
          <span className="text-sm text-gray-500">
            {!isControllableDeploy(project) && 'Not '}
            Controllable
          </span>
        </div>
      </div>
    </div>
  )
}
