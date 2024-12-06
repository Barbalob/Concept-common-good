// Тип для слова приходящего с бэка
export interface TypesReceivedWords {
    id:string,
    letter:string,
    wordEng:string,
    wordRU:string,
}

// Тип для объекта слова
export interface TypesWords {
    id:string,
    letter:string,
    href:string,
    en:string,
    ru:string,
}

// Тип для текста приходящего с бэка
export interface TypesReceivedText {
    author: {
        id: string,
        name: string,
        photoUrl: string,
    },
    id:string,
    text:string,
    title:string,
    word:{    
        id:string,
        letter:string,
        wordEng:string,
        wordRU:string,
    },
    year:string
}

// Тип для объекта текста
export interface TypesText {
    id:string,
    author:string,
    text:string,
    title:string,
    year:string,
}
