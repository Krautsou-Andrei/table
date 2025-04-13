import { ApplicationDTO, AxiosRequestConfig, DeleteApplicationParam } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type DeleteApplicationConfig = AxiosRequestConfig<DeleteApplicationParam>
export const deleteApplication = ({ params, config }: DeleteApplicationConfig) =>
  api.delete<ApplicationDTO>(`/services/${params?.applicationId}`, config)
