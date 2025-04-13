import { AxiosRequestConfig, City, GetCityParams } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type GetCityConfig = AxiosRequestConfig<GetCityParams>
export const getCity = ({ params, config }: GetCityConfig) => api.get<City>(`cities/${params?.id}`, config)
