import { useQuery } from '@tanstack/react-query'
import { useInitData } from '@vkruglikov/react-telegram-web-app'
import { AxiosError } from 'axios'

import { authMe } from '../../requests/auth/me'
import { login, LoginConfig } from '../../requests/auth/login'

import { QUERY_KEYS } from '@/consts/query-keys'
import { showErrorMessage } from '@/utils/notify'

export const useAuthMe = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_initDataUnsafe, initData] = useInitData()

  const query = useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: async () => {
      try {
        return await authMe()
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          if (initData) {         
            const loginConfig: LoginConfig = {
              params: { initData: { initData: initData } },
            }
            try {
              await login(loginConfig)
              return await authMe()
            } catch (loginError) {
              showErrorMessage('Аутентификация не удалась')
            }
          }
          showErrorMessage('Ошибка аутентификации')
        }
        showErrorMessage('Что-то пошло не так!')
      }
    },
    select: (data) => (data ? data : null),
    retry: false,
    refetchOnWindowFocus: 'always',
  })

  return { ...query }
}
