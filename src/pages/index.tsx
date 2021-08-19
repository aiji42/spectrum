import { VFC } from 'react'
import { Header } from '@/components/Header'
import { Popover } from '@headlessui/react'
import { LandingPage } from '@/components/LandingPage'

const Home: VFC = () => {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Header teams={[]} projects={[]} />
        <LandingPage />
      </div>
    </Popover>
  )
}

export default Home
