import axios from "axios";
import { TypesReceivedAuthors, TypesReceivedText, TypesReceivedWords } from "../const/types";
import { AUTORS, AUTORS_ID, TEXTS, TEXTS_ID, WORDS, WORDS_ID,  } from "../const/constRoutsApi";
import { transformReceivedAuthor, transformReceivedAuthorsList, transformReceivedText, transformReceivedTextList, transformReceivedWord, transformReceivedWordsList } from "../const/helpers";

interface TypeParamsDictionary{
  params:{
    letter?:string,
    word?:string
  }
}
interface TypeParamsTexts{
  params:{
    word?:string,
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

export const getAuthors = (params:TypeParamsDictionary) => 
  axios.get<TypesReceivedAuthors[]>(AUTORS, params)
    .then(res=>res.data)
    .then(res=>transformReceivedAuthorsList(res))  

export const getAuthorById = (id:string) => 
  axios.get<TypesReceivedAuthors>(AUTORS_ID.replace(':id', id))
    .then(res=>res.data)
    .then(res=>transformReceivedAuthor(res))


export const getTexts = (param:TypeParamsTexts) => {
  return  axios.get<TypesReceivedText[]>(TEXTS, param)
  .then(res=>res.data)
  .then(res=>transformReceivedTextList(res))

}
export const getTextsById = (id:string) => {
  return  axios.get<TypesReceivedText>(TEXTS_ID.replace(':id', id))
  .then(res=>res.data)
  .then(res=>transformReceivedText(res))

}

