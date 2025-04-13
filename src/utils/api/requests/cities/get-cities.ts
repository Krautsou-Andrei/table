import { AxiosRequestConfig, City } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type GetCitiesConfig = AxiosRequestConfig
export const getCities = async ({ config }: GetCitiesConfig) => api.get<City[]>('/cities', config)
