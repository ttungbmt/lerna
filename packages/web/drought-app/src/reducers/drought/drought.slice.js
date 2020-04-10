import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'drought',
    initialState: {
        result: null
    },
    reducers: {
        setResult(state, {payload}) {
            state.result = payload
        },
        removeResult(state, action) {
            state.result = null
        }
    }
})


export default slice