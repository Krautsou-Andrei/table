import { AxiosRequestConfig, CityEvent } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type GetMyEventsConfig = AxiosRequestConfig
export const getMyEvents = ({ config }: GetMyEventsConfig) => api.get<CityEvent[]>('/events/my',  config)
