import { AxiosRequestConfig, BanUserParams } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type BanUserConfig = AxiosRequestConfig<BanUserParams>
export const banUser = async ({ params, config }: BanUserConfig) => api.post(`/user/ban/${params?.username}`, {}, config)
