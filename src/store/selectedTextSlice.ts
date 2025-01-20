import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypesText } from "../const/types";
import { getTextsById } from "../api";



export const fetchTextsById= createAsyncThunk<TypesText, string, {rejectValue:string}>(
  'selectedTexts/fetchTextsById',
  async function (id, { rejectWithValue }){
    try{
      const data = await getTextsById(id)
      return data
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)


interface TypeState extends TypesText {
  isLoading: boolean,
  error: string | null,
}

const initialState: TypeState = {
  isLoading: false,
  error: null,
  id:'',
  author:null,
  word:[],
  translators: null,
  title:'',
  titleRU:'',
  description:'',
  type:'',
  texts:[],
}

const authorSlise = createSlice({
    name:"selectedTexts",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTextsById.pending, (state)=>{
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchTextsById.fulfilled, (state, action)=>{
              state.id = action.payload.id
              state.author = action.payload.author
              state.word = action.payload.word
              state.title = action.payload.title
              state.titleRU = action.payload.titleRU
              state.description = action.payload.description
              state.rubric = action.payload.rubric
              state.pubYear = action.payload.pubYear
              state.translators = action.payload.translators
              state.originalLang = action.payload.originalLang
              state.pubPlace = action.payload.pubPlace
              state.publisher = action.payload.publisher
              state.catalogNum = action.payload.catalogNum
              state.storage = action.payload.storage
              state.size = action.payload.size
              state.type = action.payload.type
              state.texts = action.payload.texts

              state.isLoading= false
              
            })
            .addCase(fetchTextsById.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload ? action.payload : null
            })

    }
})

export const {  } = authorSlise.actions
export default authorSlise.reducer