import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { ROUTES } from '@/consts/routes'

import { formatDateDots } from '@/utils/formatDate'
import { RootState } from '@/utils/redux/store'
import { useGetCities } from '@/utils/api/hooks/cities/use-get-cities'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'
import { useGetUser } from '@/utils/api/hooks/user/use-get-user'
import { setFilterCitiId } from '@/utils/redux/filter-settings-slice'

import { VARIABLES } from '@/consts/variables'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FilterCityFormValues, filterCitySchema } from '@/utils/shema/fiter-city-schema'

export const useHeader = () => {
  const { pathname } = useLocation()
  const { data: authMe } = useAuthMe()

  const dispatch = useDispatch()

  const [isOpenSelectCity, setIsOpenSelectCity] = useState(false)

  const { data: user } = useGetUser({ userId: authMe?.id! }, Boolean(authMe?.id))

  const cities = useGetCities()

  const filterSettings = useSelector((state: RootState) => state.filterSettings)

  const isEventPage = useMemo(() => {
    if (pathname === ROUTES.EVENTS) {
      return true
    }
    return false
  }, [pathname])

  const currentDate = new Date()
  const date = formatDateDots(currentDate)
  const currentCity = cities.data?.find((city) => city.id === Number(filterSettings.citiId))

  const form = useForm<FilterCityFormValues>({
    resolver: zodResolver(filterCitySchema),
    defaultValues: {
      [VARIABLES.REGISTER_FIELD_CITY_ID]: '1',
    },
  })

  const onSubmit = (date: FilterCityFormValues) => {
    const currentCity = cities.data?.find((city: { name: string }) => city.name === date.cityId)
    if (currentCity) {
      dispatch(setFilterCitiId(String(currentCity.id)))
    }
  }
  const handleIsOpenSelectCity = useCallback(() => {
    setIsOpenSelectCity((prev) => !prev)
  }, [])

  return {
    state: {
      allCities: cities.data,
      authMe,
      currentCity,
      isEventPage,
      isOpenSelectCity,
      filterSettings,
      form,
      date,
      user,
    },
    functions: { handleIsOpenSelectCity, onSubmit, setIsOpenSelectCity },
  }
}
