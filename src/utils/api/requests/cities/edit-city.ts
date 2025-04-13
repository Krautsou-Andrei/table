import { AxiosRequestConfig, UpdateCityParams } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type EditCityConfig = AxiosRequestConfig<UpdateCityParams>
export const editCity = ({ params, config }: EditCityConfig) => api.patch(`cities/${params?.id}`, params?.dto, config)
