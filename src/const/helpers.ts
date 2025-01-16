import { TypesWords, TypesReceivedWords, TypesReceivedText, TypesText, TypesReceivedAuthors, TypesAuthor } from "./types"

export const transformReceivedWord= (word:TypesReceivedWords):TypesWords => {
  return {
    id:word.id,
    href:"/",
    meaningsEN:word.meaningsEN,
    meaningsRU:word.meaningsRU,
    letter:word.letter,
    ru: word.wordRU,
    en: word.wordEng,
    forms: word.forms
  }
}
export const transformReceivedAuthor= (author:TypesReceivedAuthors):TypesAuthor => {
  return {
    id:author.id,
    years:author.year,
    name:author.name,
    biography:author.biography,
    translationName:author.translationName,
    photoUrl:author.photoUrl
  }
}

export const transformReceivedWordsList = (list:TypesReceivedWords[]):TypesWords[] => {
  return list.map(word => {return transformReceivedWord(word)})
}
export const transformReceivedAuthorsList = (list:TypesReceivedAuthors[]):TypesAuthor[] => {
  return list.map(author => {return transformReceivedAuthor(author)})
}

export const transformReceivedText = (text:TypesReceivedText):TypesText=>{
  return {
    ...text,
    word: text.word.map(a => transformReceivedWord(a.word))
  }
}

export const transformReceivedTextList = (texts:TypesReceivedText[]):TypesText[] => {
  return texts.map(text => {return transformReceivedText(text)})
}
