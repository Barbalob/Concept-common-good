const BASE_URL = process.env.NODE_ENV === "production" ? "http://localhost:3000" : "http://localhost:3000"

export const WORDS = `${BASE_URL}/words`
export const WORDS_ID= `${BASE_URL}/words/:id`

export const AUTORS = `${BASE_URL}/authors`
export const AUTORS_ID = `${BASE_URL}/authors/:id`

export const TEXTS = `${BASE_URL}/texts`
export const TEXTS_ID = `${BASE_URL}/texts/:id`
export const TEXTS_WORD_ID = `${BASE_URL}/texts/word/:wordId`
export const TEXTS_AUTOR_ID = `${BASE_URL}/texts/author/:autorId`

// export const AUTHORIZATION = `${BASE_URL}/authorization`
export const AUTHORIZATION = `${BASE_URL}`
export const REFRESH = `${BASE_URL}/refresh`
