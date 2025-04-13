import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { zodResolver } from '@hookform/resolvers/zod'

import { useGetCities } from '@/utils/api/hooks/cities/use-get-cities'
import { FilterEventFormValues, filterEventSchema } from '@/utils/shema/filter-event-schema'
import { setFilterSettings } from '@/utils/redux/filter-settings-slice'
import { RootState } from '@/utils/redux/store'

import { EventCategory as EventCategoryObject } from '@/consts/event-category'
import { VARIABLES } from '@/consts/variables'
import { EVENT_SORT } from '@/consts/event-sort'

export const useSettingsHeader = () => {
  const dispatch = useDispatch()
  const filterSettings = useSelector((state: RootState) => state.filterSettings)

  const form = useForm<FilterEventFormValues>({
    resolver: zodResolver(filterEventSchema),
    defaultValues: {
      [VARIABLES.REGISTER_FIELD_CATEGORY]: EventCategoryObject.NOT_CATEGORY,
      [VARIABLES.REGISTER_FIELD_LOCATION]: '1',
      [VARIABLES.REGISTER_FIELD_SORT]: EVENT_SORT.SORT_DATE_AT,
    },
  })

  useEffect(() => {
    form.setValue(VARIABLES.REGISTER_FIELD_LOCATION, filterSettings.citiId)
  }, [filterSettings.citiId, form])

  const { data: allCities } = useGetCities()

  const onSubmit = (date: FilterEventFormValues) => {
    if (date.location && date.category && date.sort) {
      dispatch(
        setFilterSettings({
          citiId: date.location,
          categoty: date.category,
          sort: date.sort as EVENT_SORT,
          date: filterSettings.date,
        })
      )
    }
  }

  return { state: { allCities, form }, functions: { onSubmit } }
}
