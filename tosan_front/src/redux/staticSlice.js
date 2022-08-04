import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    'domain': 'http://localhost:8000',
    'apiDomain': 'http://localhost:8000/api',
    'wpDomain': 'https://wp.tosanfoolad.com',
}

const staticSlice = createSlice({
    name: 'static',
    initialState,
    reducers: {

    },
})

// export const {} = staticSlice.actions
export {initialState}
export default staticSlice.reducer
