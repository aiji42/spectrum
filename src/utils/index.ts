import { Environment, Project } from '@/types'

export const getSplitEnvFromProject = (
  project: Project
): Environment | undefined =>
  project.env?.find(({ key }) => key === 'SPLIT_CONFIG_BY_SPECTRUM')

export const isRunningSplitTests = (project: Project): boolean =>
  Object.keys(JSON.parse(getSplitEnvFromProject(project)?.value ?? '{}'))
    .length > 0

export const getWebhookByProject = (project: Project): string | undefined =>
  project.link?.deployHooks.find(({ name }) => name === 'for-spectrum')?.url

export const isControllableDeploy = (project: Project): boolean =>
  !!getWebhookByProject(project)
