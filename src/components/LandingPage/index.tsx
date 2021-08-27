import { VFC } from 'react'
import { HeroHome } from '@/components/LandingPage/HeroHome'
import { InstallSteps } from '@/components/LandingPage/InstallSteps'
import { FeaturesBoxes } from '@/components/LandingPage/FeatureBoxes'

export const LandingPage: VFC = () => {
  return (
    <>
      <HeroHome />
      <FeaturesBoxes />
      <InstallSteps />
    </>
  )
}
