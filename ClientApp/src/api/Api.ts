import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 15000,
})

const getJwt = () => {
  return localStorage.getItem('jwt')
}

const setJwt = (jwt: string) => {
  localStorage.setItem('jwt', jwt)
}

// Funkcja do usuwania JWT z local storage
const removeJwt = () => {
  localStorage.removeItem('jwt')
}

instance.interceptors.request.use(
  (config) => {
    const token = getJwt()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (originalConfig.url !== '/login' && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const rs = await instance.post('/refreshToken', {
            refreshToken: getJwt(),
          })

          const { accessToken } = rs.data

          return instance(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err)
  },
)
export const responseBody = (response: AxiosResponse) => response.data

export const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: object) => instance.post(url, body).then(responseBody),
  put: (url: string, body: object) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
}
