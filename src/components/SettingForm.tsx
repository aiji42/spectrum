import { useContext, VFC } from 'react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import AuthContext from '@/libs/firebase/AuthContext'
import { FirestoreDocumentData } from '@/types'
import { useForm } from 'react-hook-form'
import { Logout } from '@/libs/firebase/firebase'
import { useSnackbar } from '@/components/Snackbar'

export const SettingForm: VFC = () => {
  const authInfo = useContext(AuthContext)
  const router = useRouter()
  const showSnackbar = useSnackbar()

  const { register, handleSubmit: _handleSubmit } =
    useForm<FirestoreDocumentData>()
  const handleSubmit = _handleSubmit((data) => {
    authInfo?.storeDoc.ref
      .set(data)
      .then(() => {
        showSnackbar(
          { type: 'success', label: 'Success:', text: 'Updated the token.' },
          2000
        ).then(() => router.push('/vercel/_dummy'))
      })
      .catch((e) => {
        showSnackbar({ type: 'alert', label: 'Error:', text: e.message }, 10000)
      })
  })

  return (
    <div className="mt-8 md:grid md:grid-cols-12 md:gap-6">
      <div className="md:col-span-5">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Tokens
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            You need a Vercel API token to operate the Spectrum.
          </p>
          <p className="mt-1 text-sm text-gray-600">
            From the Vercel console, go to <b>Settings</b> &gt; <b>Tokens</b> to
            generate a token.
            <a
              href="https://vercel.com/account/tokens"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLinkIcon className="ml-2 inline-block w-4 h-4 text-indigo-500 hover:text-indigo-600" />
            </a>
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-7">
        <form onSubmit={handleSubmit}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Vercel Token
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        {...register('vercelToken', { required: true })}
                        defaultValue={authInfo?.storeDoc.data()?.vercelToken}
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 flex justify-between sm:px-6">
              <a
                href="#"
                onClick={Logout}
                className="py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                Sign out
              </a>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
