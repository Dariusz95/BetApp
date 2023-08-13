import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import { RootState } from '../store/store'
export const selectJwtToken = (state: RootState) => state.auth.jwtToken
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 15000,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    // const token = selectJwtToken
    // // const token = getJwt()
    // console.log('token', token)
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token
    // }
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
            // refreshToken: getJwt(),
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
