import { AxiosResponse } from 'axios'
import { useEffect, useRef } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'

import { getEvents } from '../../requests/events/get-events'

import { QUERY_KEYS } from '@/consts/query-keys'
import { GetEventsParams, GetEventsResponse } from '@/types/api'

export const useGetEvents = (params: GetEventsParams, isFetch: boolean = true) => {
  const offsetRef = useRef(0)

  useEffect(() => {
    offsetRef.current = 0
  }, [params])

  return useInfiniteQuery<AxiosResponse<GetEventsResponse>, Error>({
    queryKey: [QUERY_KEYS.GET_EVENTS, params.cityId, params.date, params.isFinished, params.userId, params.offset],
    queryFn: async (): Promise<AxiosResponse<GetEventsResponse>> => {
      const updatedParams = { ...params, offset: params.offset ?? offsetRef.current }

      try {
        const result = await getEvents({ params: updatedParams })
        return result
      } catch (error) {
        console.error('Error fetching events:', error)
        throw error
      }
    },
    enabled: isFetch,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { offset, limit, total } = lastPage.data.meta

      if (offset + limit >= total) {
        return undefined
      }

      const newOffset = offset + limit
      offsetRef.current = newOffset

      return newOffset
    },
    select: (data) => data,
  })
}
