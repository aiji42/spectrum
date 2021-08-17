import { VFC } from 'react'
import { Header } from '@/components/Header'
import { Popover } from '@headlessui/react'
import { SettingForm } from '@/components/SettingForm'

const Setting: VFC = () => {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Header teams={[]} projects={[]} />

        <div className="mt-8">
          <SettingForm />
        </div>
      </div>
    </Popover>
  )
}

export default Setting
