import {
  ApplicationDTO,
  AxiosRequestConfig,
  CreateServiceDto,
} from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type CreateApplicationConfig = AxiosRequestConfig<CreateServiceDto>
export const createApplication = ({
  params,
  config,
}: CreateApplicationConfig) =>
  api.post<ApplicationDTO>('/services', params, config)
