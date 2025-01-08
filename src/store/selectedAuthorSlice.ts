import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypesAuthor, TypesText, TypesWords } from "../const/types";
import { getAuthorById, getTexts } from "../api";

interface TypePayloadFetch{
  id:string
}

interface TypeReturnFetch{
  data:TypesAuthor,
  texts:TypesText[]
}



export const fetchAuthor = createAsyncThunk<TypeReturnFetch, TypePayloadFetch, {rejectValue:string}>(
    'selectedAuthor/fetchAuthor',
    async function ({id}, { rejectWithValue }){
        try{
          const data = await getAuthorById(id)
          const texts = await getTexts({params: {authorId: id}})
          return {
            data,
            texts
          }
        } catch (e) {
            return rejectWithValue((e as Error).message)
        }
    }
)

interface TypeState extends TypesAuthor {
  isLoading: boolean,
  error: string | null
  listTexts : TypesText[],
  // name: string,
  // translationName: string,
  // year: string,
  // biography:string,
}

const initialState: TypeState = {
  isLoading: false,
  error: null,
  listTexts : [],
  name: '',
  translationName: '',
  years: '',
  biography:'',
  id:'', 
  photoUrl:''
}

const slise = createSlice({
    name:"selectedAuthor",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthor.pending, (state)=>{
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchAuthor.fulfilled, (state, action)=>{
                state.isLoading = false
                state.name = action.payload.data.name
                state.translationName = action.payload.data.translationName
                state.years = action.payload.data.years
                state.biography = action.payload.data.biography
                state.listTexts = action.payload.texts
            })
            .addCase(fetchAuthor.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload ? action.payload : null
            })

    }
})

export const {  } = slise.actions
export default slise.reducer