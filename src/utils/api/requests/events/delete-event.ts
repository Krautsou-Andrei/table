import { AxiosRequestConfig, CityEvent, DeleteEventParams } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type DeleteEventConfig = AxiosRequestConfig<DeleteEventParams>
export const deleteEvent = ({ params, config }: DeleteEventConfig) =>
  api.delete<CityEvent>(`/events/${params?.id}`, config)
