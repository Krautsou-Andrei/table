import { useGetEvents } from '@/utils/api/hooks/events/use-get-events'
import { useMemo } from 'react'

export const useHomeEvents = () => {
  const { data: allEvents } = useGetEvents({ isFinished: false, offset: 0 })

  const isNotFinishedAll = useMemo(() => {
    return allEvents?.pages.some((page) => page.data.items.some((item) => item.isFinished === false))
  }, [allEvents])

  return { state: { allEvents, isNotFinishedAll }, functions: {} }
}
