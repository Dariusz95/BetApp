import { requests } from './Api'
import { LoginRequest } from './models/Login'

export const Authorization = {
  login: (loginRequest: LoginRequest): Promise<any> => requests.post('login', loginRequest),
}
