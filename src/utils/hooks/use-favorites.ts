import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getLocalStorage, setLocalStorage } from '../lib/local-storage'
import { RootState } from '../redux/store'
import { setFavorites } from '../redux/favorites'

import { LOCAL_STORAGE_CONSTANTS } from '@/consts/local-storage-constants'

export const useFavorites = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.favorites)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localFavorites = useCallback(
    getLocalStorage(LOCAL_STORAGE_CONSTANTS.FAVORITES)
      ? JSON.parse(getLocalStorage(LOCAL_STORAGE_CONSTANTS.FAVORITES))
      : [],
    []
  )

  useEffect(() => {
    dispatch(setFavorites(localFavorites))
  }, [dispatch, localFavorites])

  const handleToggle = (id: string) => {
    const updatedFavorites = [...favorites]
    const newFavorites = updatedFavorites.includes(id)
      ? updatedFavorites.filter((favoriteId) => favoriteId !== id)
      : [...updatedFavorites, id]

    dispatch(setFavorites(newFavorites))

    setLocalStorage(LOCAL_STORAGE_CONSTANTS.FAVORITES, JSON.stringify(newFavorites))

    return updatedFavorites
  }

  return { state: { favorites }, functions: { handleToggle } }
}
