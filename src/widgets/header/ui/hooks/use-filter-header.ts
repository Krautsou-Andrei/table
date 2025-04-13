import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/consts/routes'

export const useFilterHeader = () => {
  const navigate = useNavigate()

  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [isOpenSettings, setIsOpenSettings] = useState(false)

  const handleGoHome = () => {
    navigate(ROUTES.HOME)
  }

  return { state: { isOpenSearch, isOpenSettings }, functions: { handleGoHome, setIsOpenSearch, setIsOpenSettings } }
}
