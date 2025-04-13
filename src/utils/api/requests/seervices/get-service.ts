import { AxiosRequestConfig, GetServiceParams, Service } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type GetServicesConfig = AxiosRequestConfig<GetServiceParams>
export const getService = async ({ config, params }: GetServicesConfig) =>
  api.get<Service>(`/services/${params?.id}`, config)
