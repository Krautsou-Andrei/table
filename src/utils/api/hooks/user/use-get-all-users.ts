import { useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { getAllUsers } from '../../requests/user/get-all-users'

import { QUERY_KEYS } from '@/consts/query-keys'
import { GetEventsParams, GetUsersResponse } from '@/types/api'

export const useGetAllUsers = (params: GetEventsParams, isFetch: boolean = true) => {
  const offsetRef = useRef(0)
  
  return useInfiniteQuery<AxiosResponse<GetUsersResponse>, Error>({
    queryKey: [QUERY_KEYS.ALL_USERS],
    queryFn: async (): Promise<AxiosResponse<GetUsersResponse>> => {
      const updatedParams = { ...params, offset: offsetRef.current }

      try {
        const result = await getAllUsers({ params: updatedParams })
        return result
      } catch (error) {
        console.error('Error fetching users:', error)
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
