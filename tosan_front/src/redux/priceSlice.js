import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {initialState as staticIS} from "./staticSlice";

const fetchPriceData = createAsyncThunk(
    'price/fetchPriceData',
    async (arg=undefined, thunkAPI) => {
        return fetch(staticIS.domain + '/products/')
            .then(res => res.json())
    }
)

const initialState = null

const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPriceData.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
    },
})

export {fetchPriceData}
export default priceSlice.reducer