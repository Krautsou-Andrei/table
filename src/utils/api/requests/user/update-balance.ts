import api from '@/utils/api/axios-instance-core.ts'
import { AxiosRequestConfig, UpdateBalanceParams } from '@/types/api'

export type UpdateBalanceConfig = AxiosRequestConfig<UpdateBalanceParams>
export const updateBalance = async ({ params, config }: UpdateBalanceConfig) =>
  api.patch(`/user/${params?.userId}/balance`, params?.dto, config)
