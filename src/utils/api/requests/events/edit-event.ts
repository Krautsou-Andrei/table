import { AxiosRequestConfig, CityEvent, EditEventParams } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type EditEventConfig = AxiosRequestConfig<EditEventParams>
export const editEvent = ({ params, config }: EditEventConfig) =>
  api.patch<CityEvent>(`/events/${params?.id}`, params?.DTO, config)
