import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    'quickFilterInput': '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setQuickFilterInput(state, action){
            state.quickFilterInput = action.payload
        },
    },
})

export const {setQuickFilterInput} = filterSlice.actions
export default filterSlice.reducer