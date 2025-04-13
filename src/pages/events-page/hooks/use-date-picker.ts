import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setFilterDate } from '@/utils/redux/filter-settings-slice'
import { RootState } from '@/utils/redux/store'

interface UseDatePickerParams {
  numberOfDays: number
}

export const useDatePicker = ({ numberOfDays }: UseDatePickerParams) => {
  const filterSettings = useSelector((state: RootState) => state.filterSettings)

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    filterSettings.date ? new Date(filterSettings.date) : null
  )
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedDate) {
      dispatch(setFilterDate(selectedDate.toISOString()))
    }
  }, [dispatch, selectedDate])

  useEffect(() => {
    return () => {
      setSelectedDate(null)
    }
  }, [])

  const currentDate = selectedDate ? new Date(selectedDate) : new Date()
  const dayOfWeek = currentDate.getDay()
  const daysToMonday = (dayOfWeek + 6) % 7

  currentDate.setDate(currentDate.getDate() - daysToMonday)

  const dates = Array.from({ length: numberOfDays }, (_, i) => {
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() + i)
    return date
  })

  const todayIndex = useMemo(
    () =>
      dates.findIndex((date) => {
        const today = selectedDate ? new Date(selectedDate) : new Date()

        today.setHours(0, 0, 0, 0)
        date.setHours(0, 0, 0, 0)

        return date.getTime() === today.getTime()
      }),
    [dates, selectedDate]
  )

  const handleTriggerCalendar = () => {
    setIsOpenCalendar((prev) => !prev)
  }

  const handleSetDate = (date?: Date) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  return {
    state: { dates, isOpenCalendar, todayIndex },
    functions: { handleSetDate, handleTriggerCalendar, setSelectedDate },
  }
}
