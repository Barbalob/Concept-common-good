import { AuthResponse } from "../../models/response/AuthResponse";
import $api from "../const";

import { AxiosResponse } from "axios";

export default class Auth{
  static async login(email:string, password:string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login',{email,password})
  }

  static async registration(email:string, password:string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration',{email,password})
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}
