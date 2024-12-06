const BASE_URL = process.env.NODE_ENV === "production" ? "http://localhost:3000" : "http://localhost:3000"

export const WORDS = `${BASE_URL}/words`
export const WORDS_ID= `${BASE_URL}/words/:id`

export const AUTORS = `${BASE_URL}/autors`
export const AUTORS_WORD_ID = `${BASE_URL}/autors/:wordId`

export const TEXTS = `${BASE_URL}/texts`
export const TEXTS_WORD_ID = `${BASE_URL}/texts/word/:wordId`
export const TEXTS_AUTOR_ID = `${BASE_URL}/texts/author/:autorId`
