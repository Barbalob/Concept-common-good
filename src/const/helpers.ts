import { TypesWords, TypesReceivedWords, TypesReceivedText, TypesText } from "./types"

export const transformReceivedWord= (word:TypesReceivedWords):TypesWords => {
  return {
    id:word.id,
    href:"/",
    letter:word.letter,
    ru: word.wordRU,
    en: word.wordEng,
  }
}

export const transformReceivedWordsList = (list:TypesReceivedWords[]):TypesWords[] => {
  return list.map(word => {return transformReceivedWord(word)})
}

export const transformReceivedTextList = (texts:TypesReceivedText[]):TypesText[] => {
  return texts.map(text => {return {
    id:text.id,
    author:text.author.name,
    text:text.text,
    title:text.title,
    year:'1703',
  }})
}