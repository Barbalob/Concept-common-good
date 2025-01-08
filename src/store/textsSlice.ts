import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypesText } from "../const/types";
import { getAuthors, getDictionaryById, getTexts } from "../api";

interface TypePayloadFetchWord {
  word?: string,
}

interface TypeSetInput{
  searchWord:string
}


export const fetchTexts= createAsyncThunk<TypesText[], TypePayloadFetchWord, {rejectValue:string}>(
  'texts/fetchTexts',
  async function ({word}, { rejectWithValue }){
    try{
      const params = {
          params: {
              word: word ? word : undefined,
          }
      }
      const data = await getTexts(params)
      return data
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)


interface TypeState {
  isLoading: boolean,
  error: string | null,
  searchWord:string,
  listTexts : TypesText[]
}

const initialState: TypeState = {
  isLoading: false,
  error: null,
  searchWord: '',
  listTexts: []
}

const authorSlise = createSlice({
    name:"texts",
    initialState,
    reducers:{
      setSearchWordTexts(state, action:PayloadAction<TypeSetInput>){
        state.searchWord = action.payload.searchWord
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTexts.pending, (state)=>{
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchTexts.fulfilled, (state, action)=>{
                state.isLoading = false
                state.listTexts = action.payload
            })
            .addCase(fetchTexts.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload ? action.payload : null
            })

    }
})

export const { setSearchWordTexts } = authorSlise.actions
export default authorSlise.reducer