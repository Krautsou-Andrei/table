import { AxiosRequestConfig, CityEvent, FinishEventParams } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type FinishEventConfig = AxiosRequestConfig<FinishEventParams>
export const finishEvent = ({ params, config }: FinishEventConfig) =>
  api.patch<CityEvent>(`/events/${params?.id}/finish`, config)
