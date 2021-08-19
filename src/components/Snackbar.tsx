import {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
  VFC
} from 'react'

type DisplayOption = {
  type: 'success' | 'alert'
  label?: string
  text: string
}

export const Snackbar: VFC = () => {
  const { displayable, displayOption } = useContext(Context)

  return (
    <div
      className={`z-10 fixed ease-in-out transform duration-500 flex justify-center w-full ${
        displayable ? 'top-2' : '-top-24'
      }`}
    >
      <div
        className={`mx-4 text-white px-6 py-4 border-0 rounded relative mb-4 flex items-center justify-center ${
          displayOption.type === 'success'
            ? 'bg-green-500'
            : displayOption.type === 'alert'
            ? 'bg-red-500'
            : 'bg-bray-500'
        }`}
      >
        <span className="inline-block mr-8">
          {displayOption.label && <b className="mr-1">{displayOption.label}</b>}
          {displayOption.text}
        </span>
      </div>
    </div>
  )
}

const initialOption: DisplayOption = { type: 'success', text: '', label: '' }

const Context = createContext<{
  displayable: boolean
  displayOption: DisplayOption
  show: (option: DisplayOption, duration: number) => Promise<void>
}>({
  displayable: false,
  displayOption: initialOption,
  show: async () => {
    // noop
  }
})

export const SnackbarController: FC = ({ children }) => {
  const [[displayable, displayOption], setDisplayOption] = useState<
    [boolean, DisplayOption]
  >([false, initialOption])
  const show = useCallback(
    (option: DisplayOption, duration: number): Promise<void> => {
      return new Promise((resolve) => {
        setDisplayOption([true, option])
        setTimeout(() => {
          setDisplayOption((prev) => [false, prev[1]])
          resolve()
        }, duration)
      })
    },
    []
  )

  return (
    <Context.Provider value={{ displayable, displayOption, show }}>
      {children}
    </Context.Provider>
  )
}

export const useSnackbar = () => {
  const { show } = useContext(Context)
  return show
}
