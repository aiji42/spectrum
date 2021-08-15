import { Project } from '@/types'

export const getSplitEnvFromProject = (
  project: Project
): Project['env'][number] | undefined =>
  project.env.find(({ key }) => key === 'SPLIT_CONFIG_BY_SPECTRUM')

export const isRunningSplitTests = (project: Project): boolean =>
  Object.keys(JSON.parse(getSplitEnvFromProject(project)?.value ?? '{}'))
    .length > 0
