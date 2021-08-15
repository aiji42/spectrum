import { getSplitEnvFromProject } from '@/utils'
import { Project, Splits } from '@/types'

export const deploySplitTest = (
  project: Project,
  teamId: string | null,
  splits: Splits
): ReturnType<typeof fetch> => {
  return fetch('/api/update-split', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      projectId: project.id,
      teamId,
      envId: getSplitEnvFromProject(project)?.id,
      splits
    })
  })
}
