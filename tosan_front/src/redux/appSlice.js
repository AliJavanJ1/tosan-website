import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const dummy_data = {
    'a':'a'
}

const fetchAppData = createAsyncThunk(
    'app/fetchAppData',
    async (arg=undefined, thunkAPI) => {
        return dummy_data
    }
)

const initialState = {}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAppData.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
    },
})

export {fetchAppData}
export default appSlice.reducer