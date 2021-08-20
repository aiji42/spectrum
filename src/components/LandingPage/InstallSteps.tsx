import { VFC } from 'react'
import Image from 'next/image'

export const InstallSteps: VFC = () => {
  return (
    <section className="max-w-7xl mx-auto py-10">
      <div>
        <div className="flex flex-row">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 py-5 border border-green-300 rounded mr-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-black text-gray-500 uppercase">
                Step 1
              </div>
              <div className="text-gray-500 text-sm">Project code</div>
            </div>
            <div className="h-full border-l-4 border-transparent">
              <div className="border-l-4 mr-4 h-full border-green-300 border-dashed" />
            </div>
          </div>
          <div className="flex-auto border rounded  border-green-300">
            <div className="flex md:flex-row flex-col items-center">
              <div className="flex-1">
                <div className="md:hidden text-sm font-normal pt-3 pl-3 text-gray-500">
                  <span className="font-black uppercase">Step 1</span> - Project
                  code
                </div>
                <div className="p-4 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 font-medium">
                  Change the next.config.js and deploy the project.
                </div>
                <div className="px-4 pb-6">
                  Install{' '}
                  <span className="bg-gray-100 text-red-400 p-1">
                    nex-with-split
                  </span>{' '}
                  (e.g.{' '}
                  <span className="bg-gray-100 text-red-400 p-1">
                    yarn add next-with-split
                  </span>
                  ) and update{' '}
                  <span className="bg-gray-100 text-red-400 p-1">
                    next.config.js
                  </span>{' '}
                  following the sample code. Then deploy the project as usual on
                  Vercel.
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src="/sample-code.svg"
                  alt="sample code"
                  width={886}
                  height={364}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start flex-row">
          <div className="border-t-4 border-r-4 border-transparent">
            <div className="w-16 ml-16 h-16 border-l-4 border-green-300 border-dashed border-b-4 rounded-bl-full" />
          </div>
          <div className="border-t-4 border-transparent flex-auto">
            <div className="h-16 border-b-4 border-green-300 border-dashed" />
          </div>
          <div className="w-16 mt-16 mr-16 h-16 border-r-4 border-green-300 border-dashed border-t-4 rounded-tr-full" />
        </div>
        <div className="flex flex-row-reverse">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 py-5 border border-green-300 rounded ml-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-black uppercase text-gray-500">
                Step 2
              </div>
              <div className="text-gray-500 text-sm">Vercel</div>
            </div>
            <div className="h-full border-r-4 border-transparent">
              <div className="border-l-4 ml-4 h-full border-green-300 border-dashed" />
            </div>
          </div>
          <div className="flex-auto border rounded border-green-300">
            <div className="flex md:flex-row flex-col items-center">
              <div className="flex-1">
                <div className="md:hidden text-sm font-normal pt-3 pl-3 text-gray-500">
                  <span className="font-black uppercase">Step 2</span> - Vercel
                </div>
                <div className="p-4 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 font-medium">
                  Enable a webhook for your projects.
                </div>
                <div className="px-4 pb-6">
                  <p>
                    Spectrum must deploy to start or update for split tests, so
                    register your web hook in Vercel web console.
                  </p>
                  <p className="mt-2">
                    <b>Project Settings</b> &gt; <b>git</b> &gt;{' '}
                    <b>Deploy Hooks</b>.
                  </p>
                  <p className="mt-2">
                    Name must be{' '}
                    <span className="bg-gray-100 text-red-400 p-1">
                      for-spectrum
                    </span>{' '}
                    and branch must be the same as the value registered in the
                    production deployment (e.g. main).
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src="/deploy-hook-sample.png"
                  alt="deploy hook sample"
                  width={778}
                  height={329}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start flex-row-reverse">
          <div className="border-t-4 border-l-4 border-transparent">
            <div className="w-16 mr-16 h-16 border-r-4 border-green-300 border-dashed border-b-4 rounded-br-full" />
          </div>
          <div className="border-t-4 border-transparent flex-auto">
            <div className="h-16 border-b-4 border-green-300 border-dashed" />
          </div>
          <div className="w-16 mt-16 ml-16 h-16 border-l-4 border-green-300 border-dashed border-t-4 rounded-tl-full" />
        </div>
        <div className="flex flex-row">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 py-5 border border-green-300 rounded mr-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-black uppercase text-gray-500">
                Step 3
              </div>
              <div className="text-gray-500 text-sm">Vercel</div>
            </div>
            <div className="h-full border-l-4 border-transparent">
              <div className="border-l-4 mr-4 h-full border-green-300 border-dashed" />
            </div>
          </div>
          <div className="flex-auto border rounded  border-green-300">
            <div className="flex md:flex-row flex-col items-center">
              <div className="flex-1">
                <div className="md:hidden text-sm font-normal pt-3 pl-3 text-gray-500">
                  <span className="font-black　uppercase">Step 3</span> - Vercel
                </div>
                <div className="p-4 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 font-medium">
                  Get an API token.
                </div>
                <div className="px-4 pb-6">
                  From the Vercel web console, go to <b>Settings</b> &gt;{' '}
                  <b>Tokens</b> to generate a token.
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src="/sample-token.png"
                  alt="create token"
                  width={1019}
                  height={442}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start flex-row">
          <div className="border-t-4 border-r-4 border-transparent">
            <div className="w-16 ml-16 h-16 border-l-4 border-green-300 border-dashed border-b-4 rounded-bl-full" />
          </div>
          <div className="border-t-4 border-transparent flex-auto">
            <div className="h-16 border-b-4 border-green-300 border-dashed" />
          </div>
          <div className="w-16 mt-16 mr-16 h-16 border-r-4 border-green-300 border-dashed border-t-4 rounded-tr-full" />
        </div>
        <div className="flex flex-row-reverse">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 py-5 border border-green-300 rounded ml-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-black text-gray-500 uppercase">
                Step 4
              </div>
              <div className="text-gray-500 text-sm">Spectrum</div>
            </div>
            <div className="h-full border-r-4 border-transparent">
              <div className="border-l-4 ml-4 h-full border-green-300 border-dashed" />
            </div>
          </div>
          <div className="flex-auto border rounded  border-green-300">
            <div className="flex md:flex-row flex-col items-center">
              <div className="flex-1">
                <div className="md:hidden text-sm font-normal pt-3 pl-3 text-gray-500">
                  <span className="font-black uppercase">Step 4</span> - on
                  Spectrum
                </div>
                <div className="p-4 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 font-medium">
                  Sign up and regist the API token.
                </div>
                <div className="px-3 pb-6">
                  Sign up at this site (Spectrum) and follow the on-screen
                  instructions to register the API token you created in the
                  previous step.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start flex-row-reverse">
          <div className="border-t-4 border-l-4 border-transparent">
            <div className="w-16 mr-16 h-16 border-r-4 border-green-300 border-dashed border-b-4 rounded-br-full" />
          </div>
          <div className="border-t-4 border-transparent flex-auto">
            <div className="h-16 border-b-4 border-green-300 border-dashed" />
          </div>
          <div className="w-16 mt-16 ml-16 h-16 border-l-4 border-green-300 border-dashed border-t-4 rounded-tl-full" />
        </div>
        <div className="flex flex-row">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 py-5 border border-green-300 rounded mr-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-black uppercase text-gray-500">
                Goal
              </div>
              <div className="text-gray-500 text-sm">Spectrum</div>
            </div>
          </div>
          <div className="flex-auto border rounded  border-green-300">
            <div className="flex md:flex-row flex-col items-center">
              <div className="flex-auto">
                <div className="md:hidden text-sm font-normal pt-3 pl-3 text-gray-500">
                  <span className="font-black　uppercase">Goal</span> - Spectrum
                </div>
                <div className="p-4 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 font-medium">
                  Congratulations!
                </div>
                <div className="px-4 pb-6">
                  Setup is complete! You can start, stop, and change your A/B
                  test at any time through this Spectrum. Let&apos;s start the
                  A/B immediately.
                </div>
              </div>
              <div className="px-16">
                <Image
                  src="/party-popper.svg"
                  alt="congratulations"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
