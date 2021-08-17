export const ENDPOINTS = {
  user: 'https://api.vercel.com/www/user',
  teams: 'https://api.vercel.com/v13/teams',
  projects: 'https://vercel.com/api/v2/projects',
  environments: (projectId: string): string =>
    `https://api.vercel.com/v8/projects/${projectId}/env/`,
  environment: (projectId: string, envId: string): string =>
    `https://api.vercel.com/v8/projects/${projectId}/env/${envId}`
}
