import { WORDS } from "../../const/constRoutsApi";
import $api from "../const";

interface IParams {
  wordRU:string,
  wordEng:string,
  meaningsEN:string[],
  meaningsRU:string[]
}

interface IParamsUpdate extends  IParams{
  id:string,
}


// const $api = axios.create({})

export const createWords = (params:IParams) => {
  return $api.post(WORDS, params)
    .then(res=>res.data)
}

export const deleteWords = (id:string) => {
  return $api.delete(WORDS, { data: {id} })
    .then(res=>res.data)
}

export const updateWords = (params:IParamsUpdate) => {
  return $api.put(WORDS, params)
    .then(res=>res.data)
}