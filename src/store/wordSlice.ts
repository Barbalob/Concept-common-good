import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypesText, TypesWords } from "../const/types";
import { getDictionaryById, getTexts } from "../api";

interface TypePayloadFetchWord {
  id:string
}

interface TypeReturnFetchWord{
  data:TypesWords,
  texts:TypesText[]
}


interface TypeState {
  isLoading: Boolean,
  error: string | null
  en:string,
  ru:string,
  listTexts : TypesText[]
  meaningsEN:string[],
  meaningsRU:string[],
}


export const fetchWords = createAsyncThunk<TypeReturnFetchWord, TypePayloadFetchWord, {rejectValue:string}>(
    'word/fetchWords',
    async function ({id}, { rejectWithValue }){
        try{
          const data = await getDictionaryById(id)
          const texts = await getTexts({params: {wordId:id}})
          return {
            data,
            texts
          }
        } catch (e) {
            return rejectWithValue((e as Error).message)
        }
    }
)


const initialState: TypeState = {
  isLoading: false,
  error: null,
  en:'',
  ru:'',
  listTexts : [],
  meaningsEN:[],
  meaningsRU:[]
}

const wordSlise = createSlice({
    name:"word",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWords.pending, (state)=>{
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchWords.fulfilled, (state, action)=>{
                state.isLoading = false
                state.ru = action.payload.data.ru
                state.en = action.payload.data.en
                state.meaningsEN = action.payload.data.meaningsEN
                state.meaningsRU = action.payload.data.meaningsRU
                state.listTexts = action.payload.texts
            })
            .addCase(fetchWords.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload ? action.payload : null
            })

    }
})

export const {  } = wordSlise.actions
export default wordSlise.reducer