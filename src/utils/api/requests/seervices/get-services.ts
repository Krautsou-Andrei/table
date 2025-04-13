import { AxiosRequestConfig, Service } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type GetServicesConfig = AxiosRequestConfig
export const getServices = async ({ config }: GetServicesConfig) => api.get<Service[]>('/services', config)
