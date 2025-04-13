import { AxiosRequestConfig, CityEvent, CreateEventDTO } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type CreateEventConfig = AxiosRequestConfig<CreateEventDTO>
export const createEvent = ({ params, config }: CreateEventConfig) => {
  return api.post<CityEvent>('/events', params, config)
}
