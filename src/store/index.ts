import { configureStore } from "@reduxjs/toolkit";
import dictionaryConceptsReducer from './dictionarySlice' 
import wordReducer from './wordSlice' 
import authorsReducer from './authorsSlice' 
import selectedAuthorsReducer from './selectedAuthorSlice' 
import textsReducer from './textsSlice' 
import selectedTextsReducer from './selectedTextSlice' 

const store = configureStore({
    reducer: {
        dictionary: dictionaryConceptsReducer,
        word: wordReducer,
        authors: authorsReducer,
        selectedAuthors: selectedAuthorsReducer,
        texts: textsReducer,
        selectedText: selectedTextsReducer
    }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch