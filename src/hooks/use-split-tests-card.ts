import { Dispatch, useCallback, useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { deploySplitTest } from '@/lib/client-side'
import { Project, SplitFormAction, Splits, Team } from '@/types'

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
  { editingKey: string | null; currentSplits: Splits },
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
    deploySplitTest(project, team, currentSplits).finally(() => {
      router.reload()
    })
  }, [currentSplits, project, router, team])

  return [
    { editingKey, currentSplits },
    { handleClose, handleCreate, handleEdit, handleDeploy, formDispatch }
  ]
}
