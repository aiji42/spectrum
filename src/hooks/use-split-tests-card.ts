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
import { useSnackbar } from '@/components/Snackbar'

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
  const [originalSplits, setOriginalSplits] = useState(splits)
  const [currentSplits, formDispatch] = useReducer(reducer, splits)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const controllable = useMemo(() => isControllableDeploy(project), [project])
  const deployable = useMemo(
    () => controllable && !equal(currentSplits, originalSplits),
    [controllable, currentSplits, originalSplits]
  )
  const handleClose = useCallback(() => setEditingKey(null), [])
  const handleCreate = useCallback(() => setEditingKey(''), [])
  const handleEdit = useCallback((key: string) => setEditingKey(key), [])

  useEffect(() => {
    handleClose()
  }, [currentSplits, handleClose])
  const router = useRouter()

  useEffect(() => {
    setOriginalSplits(splits)
    formDispatch({ type: 'RELOAD', data: splits })
  }, [splits])

  const showSnackbar = useSnackbar()
  const handleDeploy = useCallback(() => {
    deploySplitTest(project, team, currentSplits)
      .then((res) => {
        if (res.ok) {
          setOriginalSplits(currentSplits)
          showSnackbar(
            {
              type: 'success',
              label: 'Success:',
              text: 'Please wait until deployment is complete.'
            },
            5000
          ).then(router.reload)
          return
        }

        res.json().then((data: { message: string }) =>
          showSnackbar(
            {
              type: 'alert',
              label: 'Error:',
              text: data.message
            },
            10000
          )
        )
      })
      .catch((e) =>
        showSnackbar(
          {
            type: 'alert',
            label: 'Error:',
            text: e.message
          },
          10000
        )
      )
  }, [currentSplits, project, router.reload, showSnackbar, team])

  return [
    { editingKey, currentSplits, deployable, controllable },
    { handleClose, handleCreate, handleEdit, handleDeploy, formDispatch }
  ]
}
