// Тип для слова приходящего с бэка
export interface TypesReceivedWords {
    id:string,
    letter:string,
    wordEng:string,
    wordRU:string,
    meaningsEN:string[],
    meaningsRU:string[],
}

export interface TypesReceivedAuthors {
    id:string,
    year:string,
    name:string,
    biography:string,
    translationName:string,
    photoUrl:string
}

// Тип для объекта слова
export interface TypesWords {
    id:string,
    meaningsEN:string[],
    meaningsRU:string[],
    letter:string,
    href:string,
    en:string,
    ru:string,
}

// Тип для текста приходящего с бэка
export interface TypesReceivedText {
    id:string,
    author:TypesAuthor,
    word:TypesWords,
    title:string,
    titleRU:string,
    description:string,
    rubric?:string,
    pubYear?:string,
    translator:TypeTranslator | null,
    originalLang?:string,
    pubPlace?:string,
    publisher?:string,
    catalogNum?:string,
    storage?:string,
    size?:string,
    type:string,
    texts:TypePartText[]|null,
}

// Тип для объекта текста
interface TypeTranslator {
    name: string
}

interface TypePart{
    id:string,
    language: string,
    parentPartId:string,
    text:string
}

interface TypePartText {
    translations: TypePart[]
}

export interface TypesText {
    id:string,
    author:TypesAuthor | null,
    word:TypesWords,
    title:string,
    titleRU:string,
    description:string,
    rubric?:string,
    pubYear?:string,
    translator:TypeTranslator | null,
    originalLang?:string,
    pubPlace?:string,
    publisher?:string,
    catalogNum?:string,
    storage?:string,
    size?:string,
    type:string,
    texts:TypePartText[]|null,
}

// Тип для объекта Автора
export interface TypesAuthor {
    id:string,
    years:string,
    name:string,
    biography:string,
    translationName:string,
    photoUrl:string
}
