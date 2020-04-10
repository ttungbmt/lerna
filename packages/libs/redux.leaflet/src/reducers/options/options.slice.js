import { createSlice } from '@ttungbmt/redux-toolkit'
import { defaults } from '@ttungbmt/utils'
import { map } from '@ttungbmt/utils'
import { KEY } from "../../consts"
import * as selectors from './options.selectors'
import * as actions from "./options.actions"

export const name = `${KEY}/options`

const initialState = {
    map: {
        zoomControl: false
    },
    loading: true,
}

const reducers = {
    setOptions: (state, {payload}) => {
        map(payload, (v, k) => {
            state[k] = v
        })
    },
    setMapOptions: (state, {payload}) => {
        state.map = payload
    },
    setLoading: (state, {payload}) => {
        state.loading = payload
    },
}

const optionsSlice = createSlice({
    name,
    initialState,
    reducers,
})

optionsSlice.selectors = selectors
optionsSlice.actions = defaults(optionsSlice.actions, actions)

export default optionsSlice