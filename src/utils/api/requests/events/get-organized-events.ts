import { AxiosRequestConfig, CityEvent } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type GetOrganizedEventsConfig = AxiosRequestConfig
export const getOrganizedEvents = ({ config }: GetOrganizedEventsConfig) =>
  api.get<CityEvent[]>('/events/organized', config)
