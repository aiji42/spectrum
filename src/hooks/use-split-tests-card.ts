import {
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { deploySplitTest } from '@/libs/client-side'
import { Project, SplitFormAction, Splits, Team } from '@/types'
import { isControllableDeploy } from '@/utils'
import equal from 'fast-deep-equal'
import Toast from 'tailwind-toast'

const reducer = (state: Splits, action: SplitFormAction) => {
  const newState = { ...state }
  if (action.type === 'DELETE') {
    delete newState[action.key]
    return newState
  }
  if (action.type === 'UPDATE') {
    delete newState[action.key]
    newState[action.newKey] = action.data
    return newState
  }
  if (action.type === 'RELOAD') return action.data

  newState[action.newKey] = action.data
  return newState
}

type UseSplitTestsCard = ({
  project,
  team,
  splits
}: {
  project: Project
  team: Team | undefined | null
  splits: Splits
}) => [
  {
    editingKey: string | null
    currentSplits: Splits
    deployable: boolean
    controllable: boolean
  },
  {
    handleClose: () => void
    handleCreate: () => void
    handleDeploy: () => void
    handleEdit: (key: string) => void
    formDispatch: Dispatch<SplitFormAction>
  }
]

export const useSplitTestCard: UseSplitTestsCard = ({
  project,
  team,
  splits
}) => {
  const [currentSplits, formDispatch] = useReducer(reducer, splits)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const controllable = useMemo(() => isControllableDeploy(project), [project])
  const deployable = useMemo(
    () => controllable && !equal(currentSplits, splits),
    [controllable, currentSplits, splits]
  )
  const handleClose = useCallback(() => setEditingKey(null), [])
  const handleCreate = useCallback(() => setEditingKey(''), [])
  const handleEdit = useCallback((key: string) => setEditingKey(key), [])

  useEffect(() => {
    handleClose()
  }, [currentSplits, handleClose])
  const router = useRouter()

  useEffect(() => {
    formDispatch({ type: 'RELOAD', data: splits })
  }, [splits])

  const handleDeploy = useCallback(() => {
    deploySplitTest(project, team, currentSplits)
      .then((res) => {
        if (res.ok) {
          setTimeout(router.reload, 5000)
          successToast('Please wait until deployment is complete.')
          return
        }
        res.json().then((data: { message: string }) => errorToast(data.message))
      })
      .catch((e) => errorToast(e.message))
  }, [currentSplits, project, router, team])

  return [
    { editingKey, currentSplits, deployable, controllable },
    { handleClose, handleCreate, handleEdit, handleDeploy, formDispatch }
  ]
}

const errorToast = (error: string) => {
  Toast.snackbar()
    .default('Error:', error)
    .with({
      duration: 10000,
      positionY: 'top',
      shape: 'square',
      color: 'bg-red-600',
      fontTone: '50',
      fontColor: 'gray'
    })
    .show()
}

const successToast = (message: string) => {
  Toast.snackbar()
    .default('Success:', message)
    .with({
      duration: 10000,
      positionY: 'top',
      shape: 'square',
      color: 'bg-green-500',
      fontTone: '50',
      fontColor: 'gray'
    })
    .show()
}
