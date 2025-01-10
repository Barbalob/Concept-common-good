import axios from "axios"
import { AUTHORIZATION } from "../const/constRoutsApi"

const $api = axios.create({
  withCredentials:true,
  baseURL: AUTHORIZATION
})

$api.interceptors.request.use((config)=>{
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $api
