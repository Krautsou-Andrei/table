import { AddCityParams, AxiosRequestConfig } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type AddCityConfig = AxiosRequestConfig<AddCityParams>
export const addCity = ({ params, config }: AddCityConfig) => api.post('/cities', params, config)
