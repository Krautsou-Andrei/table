import { AxiosRequestConfig, UnbanUserParams } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type UnbanUserConfig = AxiosRequestConfig<UnbanUserParams>
export const unbanUser = async ({ params, config }: UnbanUserConfig) =>
  api.post(`/user/unban/${params?.username}`, {}, config)
