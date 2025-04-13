import { AxiosRequestConfig, GetEventsParams, GetEventsResponse } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'
import { formatDate } from '@/utils/formatDate.ts'

export type GetEventsConfig = AxiosRequestConfig<GetEventsParams>
export const getEvents = async ({ params, config }: GetEventsConfig) => {
  const queryParams = new URLSearchParams()
  if (params?.cityId) {
    queryParams.append('cityId', params.cityId.toString())
  }

  if (params?.date) {
    queryParams.append('dateTime', formatDate(params.date))
  }

  if (params?.isFinished) {
    queryParams.append('isFinished', params.isFinished ? 'true' : 'false')
  }

  if (params?.userId) {
    queryParams.append('userId', params.userId.toString())
  }

  if (params?.page) {
    queryParams.append('page', params.page.toString())
  }

  if (params?.limit) {
    queryParams.append('limit', params.limit.toString())
  }

  if (params?.offset) {
    queryParams.append('offset', params.offset.toString())
  }

  return api.get<GetEventsResponse>(`/events?${queryParams.toString()}`, config)
}
