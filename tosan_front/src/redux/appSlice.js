import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {initialState as staticIS} from "./staticSlice";

const fetchAppData = createAsyncThunk(
    'app/fetchAppData',
    async (arg=undefined, thunkAPI) => {
        return fetch(staticIS.apiDomain + '/page_data/main_page/')
            .then(res => res.json())
    }
)

const initialState = null

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