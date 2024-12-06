import { configureStore } from "@reduxjs/toolkit";
import dictionaryConceptsReducer from './dictionarySlice' 
import wordReducer from './wordSlice' 

const store = configureStore({
    reducer: {
        dictionary: dictionaryConceptsReducer,
        word: wordReducer,
    }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch