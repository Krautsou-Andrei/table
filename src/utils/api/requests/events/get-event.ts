import { AxiosRequestConfig, CityEvent, GetEventParams } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type GetEventConfig = AxiosRequestConfig<GetEventParams>
export const getEvent = ({ params, config }: GetEventConfig) => api.get<CityEvent>(`/events/${params?.id}`, config)
