import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    'quickFilterInput': '',
    'checkBoxFilter': {
        'split': [],
    },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setQuickFilterInput(state, action) {
            state.quickFilterInput = action.payload
        },
        setCheckBoxFilter: {
            reducer: (state, action) => {
                if (action.payload.add) {
                    state.checkBoxFilter[action.payload.name].push(action.payload.value)
                } else {
                    state.checkBoxFilter[action.payload.name] = state.checkBoxFilter[action.payload.name]
                        .filter(item => item !== action.payload.value)
                }
            },
            prepare: (name, value, add) => {
                return {
                    payload: {
                        name,
                        value,
                        add,
                    }
                }
            }
        },
    },
})

export const {setQuickFilterInput, setCheckBoxFilter} = filterSlice.actions
export default filterSlice.reducer