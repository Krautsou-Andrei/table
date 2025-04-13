import { AxiosRequestConfig, DeleteCityParams } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type DeleteCityConfig = AxiosRequestConfig<DeleteCityParams>
export const deleteCity = ({ params, config }: DeleteCityConfig) => api.delete(`cities/${params?.id}`, config)
