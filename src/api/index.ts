import axios from "axios";
import { TypesReceivedText, TypesReceivedWords } from "../const/types";
import { TEXTS, WORDS, WORDS_ID } from "../const/constRoutsApi";
import { transformReceivedTextList, transformReceivedWord, transformReceivedWordsList } from "../const/helpers";

interface TypeParamsDictionary{
  params:{
    letter?:string,
    word?:string
  }
}
interface TypeParamsTexts{
  params:{
    wordId?:string,
    authorId?:string
  }
}

export const getDictionary = (params:TypeParamsDictionary) => 
  axios.get<TypesReceivedWords[]>(WORDS, params)
    .then(res=>res.data)
    .then(res=>transformReceivedWordsList(res))  

export const getDictionaryById = (id:string) => 
  axios.get<TypesReceivedWords>(WORDS_ID.replace(':id', id))
    .then(res=>res.data)
    .then(res=>transformReceivedWord(res))


export const getTexts = (param:TypeParamsTexts) => {
  return  axios.get<TypesReceivedText[]>(TEXTS, param)
  .then(res=>res.data)
  .then(res=>transformReceivedTextList(res))

}

