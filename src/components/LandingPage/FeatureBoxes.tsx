import { VFC } from 'react'

export const FeaturesBoxes: VFC = () => {
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-500 rounded-full h-14 w-14 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                  className="pl-1 text-white"
                >
                  <path d="M6 3v12" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 01-9 9" />
                </svg>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight my-4 text-gray-700">
                Branch Based
              </h4>
              <p className="text-gray-600 text-center">
                Since there is no need to duplicate code, it is easier to manage
                and prevents the bundle size from increasing.
              </p>
            </div>

            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-500 rounded-full h-14 w-14 flex items-center justify-center">
                <svg
                  width="1155"
                  height="1000"
                  viewBox="0 0 1155 1000"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 pb-1"
                >
                  <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="white" />
                </svg>
              </div>

              <h4 className="text-xl font-bold leading-snug tracking-tight my-4 text-gray-700">
                Vercel Based
              </h4>
              <p className="text-gray-600 text-center">
                Set the deployment on Vercel as a challenger, and split the
                access by CDN to serve the content.
              </p>
            </div>

            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-500 rounded-full h-14 w-14 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight my-4 text-gray-700">
                Quick & Easy
              </h4>
              <p className="text-gray-600 text-center">
                You can control the start, stop, and modification of A/B tests
                all from this Spectrum web console.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
