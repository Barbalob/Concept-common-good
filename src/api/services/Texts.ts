import { TEXTS } from "../../const/constRoutsApi";
import $api from "../const";

interface IFragment {
  id: string,
  language: string,
  text: string,
}


interface IParamsCreate {
  authorId: string,
  translators: string[],
  wordsId: string[],
  parts: IFragment[][],
  title: string,
  titleRU: string,
  description: string,
  rubric:string,
  pubYear:string,
  originalLang:string,
  pubPlace:string,
  publisher:string,
  catalogNum:string,
  storage:string,
  size:string,
  type:string,
}
interface IParamsUpdate extends IParamsCreate{
  id:string,
}

export const createText = (params:IParamsCreate) => {
  return $api.post(TEXTS, params)
    .then(res=>res.data)
}

export const deleteText = (id:string) => {
  return $api.delete(TEXTS, { data: {id} })
    .then(res=>res.data)
}

export const updateText = (params:IParamsUpdate) => {
  return $api.put(TEXTS, params)
    .then(res=>res.data)
}