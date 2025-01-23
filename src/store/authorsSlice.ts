import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypesAuthor } from "../const/types";
import { getAuthors } from "../api";

interface TypePayloadFetchWord {
  word?: string,
}

interface TypeSetInput{
  searchWord:string
}


export const fetchAuthors = createAsyncThunk<TypesAuthor[], TypePayloadFetchWord, {rejectValue:string}>(
  'authors/fetchAuthors',
  async function ({word}, { rejectWithValue }){
    try{
      const params = {
          params: {
              word: word ? word : undefined,
          }
      }
      const data = await getAuthors(params)
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
  listAuthor : TypesAuthor[]
}

const initialState: TypeState = {
  isLoading: false,
  error: null,
  searchWord: '',
  listAuthor: []
}

const authorSlise = createSlice({
    name:"authors",
    initialState,
    reducers:{
      setSearchWordAuthors(state, action:PayloadAction<TypeSetInput>){
        state.searchWord = action.payload.searchWord
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state)=>{
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchAuthors.fulfilled, (state, action)=>{
                state.isLoading = false
                state.listAuthor = action.payload
            })
            .addCase(fetchAuthors.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload ? action.payload : null
            })

    }
})

export const { setSearchWordAuthors } = authorSlise.actions
export default authorSlise.reducer