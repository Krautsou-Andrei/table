import { useQuery } from '@tanstack/react-query'
import { login } from '@/utils/api/requests/auth/login.ts'
import { QUERY_KEYS } from '@/consts/query-keys'

export const useLogin = (initDataString?: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.LOGIN],
    queryFn: async () => {
      if (initDataString) {
        const result = await login({ params: { initData: { initData: initDataString } } })

        const newToken = result.data.token
        localStorage.setItem('token', newToken)
      }
      return Promise.reject('Invalid init data')
    },
    staleTime: 60 * 60 * 1000,
    select: (data) => data,
  })

  return { ...query }
}
