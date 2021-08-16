import { getSplitEnvFromProject, getWebhookByProject } from '@/utils'
import { Project, Splits, Team } from '@/types'

export const deploySplitTest = (
  project: Project,
  team: Team | undefined | null,
  splits: Splits
): ReturnType<typeof fetch> => {
  return fetch('/api/update-split', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      projectId: project.id,
      teamId: team?.id,
      envId: getSplitEnvFromProject(project)?.id,
      splits,
      webhook: getWebhookByProject(project)
    })
  })
}
