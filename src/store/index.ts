import { configureStore } from "@reduxjs/toolkit";
import dictionaryConceptsReducer from './dictionarySlice' 
import wordReducer from './wordSlice' 
import authorsReducer from './authorsSlice'   
import selectedAuthorsReducer from './selectedAuthorSlice' 
import textsReducer from './textsSlice' 
import selectedTextsReducer from './selectedTextSlice' 
import authReducer from './authSlice' 

const store = configureStore({
    reducer: {
        dictionary: dictionaryConceptsReducer,
        word: wordReducer,
        authors: authorsReducer,
        selectedAuthors: selectedAuthorsReducer,
        texts: textsReducer,
        selectedText: selectedTextsReducer,
        auth: authReducer,
    }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch