import { ApplicationDTO, AxiosRequestConfig, PatchServiceParams } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type EditApplicationConfig = AxiosRequestConfig<PatchServiceParams>
export const editApplication = ({ params, config }: EditApplicationConfig) =>
  api.patch<ApplicationDTO>(`/services/${params?.serviceId}`, params?.dto, config)
