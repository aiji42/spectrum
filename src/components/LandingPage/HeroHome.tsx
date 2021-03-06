import { VFC } from 'react'

export const HeroHome: VFC = () => {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-24 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12">
            <h1 className="text-6xl text-gray-800 md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4">
              Make your website{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                powerful
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600">
                If you&apos;re using Next.js and Vercel on your website, you
                can&apos;t afford not to use this service named Spectrum.
                Spectrum assists you in improving your website through A/B
                testing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
