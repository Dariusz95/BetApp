import { AxiosRequestConfig } from 'axios'
import { requests } from './Api'
import { LoginRequest } from './models/Login'

export const Authorization = {
  login: (loginRequest: LoginRequest, options: AxiosRequestConfig = {}): Promise<any> =>
    requests.post('login', loginRequest),
}
