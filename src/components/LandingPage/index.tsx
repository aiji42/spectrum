import { VFC } from 'react'
import { HeroHome } from '@/components/LandingPage/HeroHome'
import { InstallSteps } from '@/components/LandingPage/InstallSteps'

export const LandingPage: VFC = () => {
  return (
    <>
      <HeroHome />
      <InstallSteps />
    </>
  )
}
