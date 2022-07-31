import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    'domain': 'http://localhost:8000',
}

const staticSlice = createSlice({
    name: 'static',
    initialState,
    reducers: {

    },
})

// export const {} = staticSlice.actions
export default staticSlice.reducer