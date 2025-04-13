import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../../consts/routes'
import { useGetServices } from '@/utils/api/hooks/services/use-get-services'
import { setIsDark } from '@/utils/redux/theme-slice'

export const useHomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isAllServices, setIsAllServices] = useState(false)

  const { data: allServices } = useGetServices()

  const handleTriggerServices = () => {
    setIsAllServices((prev) => !prev)
  }

  const handleGoEvents = () => {
    navigate(ROUTES.EVENTS)
  }

  const handleService = (id?: number) => {
    if (id) {
      dispatch(setIsDark(false))
      navigate(`/app/${id}`)
    }
  }

  return { state: { allServices, isAllServices }, functions: { handleGoEvents, handleService, handleTriggerServices } }
}
