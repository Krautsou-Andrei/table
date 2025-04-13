export const addAuthorizationHeader = (config: any) => {
  const token = localStorage.getItem('token')

  const newConfig = { ...config }
  newConfig.headers = newConfig.headers || {}

  if (token) {
    newConfig.headers['Authorization'] = `Bearer ${token}`
  }

  return newConfig
}
