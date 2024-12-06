import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypesWords } from "../const/types";
import { getDictionary, getDictionaryById } from "../api";

interface DictionaryState {
    letter: string,
    input: string,
    listWords: TypesWords[],
    isLoading:boolean,
    error:string|null
}
interface TypeSetLetter {
    letter: string,
}
interface TypeSetInput {
    input: string,
}

const initialState:DictionaryState = {
    letter:'',
    input:'',
    listWords:[],
    isLoading:false,
    error:null
}


interface TypePayloadFetchDictionary {
    letter?: string,
    word?: string,
}

export const fetchDictionary = createAsyncThunk<TypesWords[], TypePayloadFetchDictionary, {rejectValue:string}>(
    'dictionary/fetchDictionary',
    async function ({letter, word}, { rejectWithValue }){
        try{
            const params = {
                params: {
                    letter: letter ? letter : undefined,
                    word: word ? word : undefined,
                }
            }
            const data = await getDictionary(params)
            return data
            
                

        } catch (e) {
            return rejectWithValue((e as Error).message)
        }
    }
)

const dictionarySlise = createSlice({
    name:"dictionary",
    initialState,
    reducers:{
        setLetter(state, action:PayloadAction<TypeSetLetter>){
            state.letter = action.payload.letter
        },
        setInput(state, action:PayloadAction<TypeSetInput>){
            state.input = action.payload.input
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDictionary.pending, (state)=>{
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchDictionary.fulfilled, (state, action)=>{
                state.isLoading = false
                state.listWords = action.payload
            })
            .addCase(fetchDictionary.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload ? action.payload : null
            })

    }
})

export const { setLetter,setInput } = dictionarySlise.actions
export default dictionarySlise.reducer