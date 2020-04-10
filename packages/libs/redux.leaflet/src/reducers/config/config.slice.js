import { createSlice } from '@ttungbmt/redux-toolkit'
import { defaults, isEmpty, isArray, isPlainObject  } from '@ttungbmt/utils'
import * as selectors from './config.selectors'
import { KEY } from "../../consts"
import * as actions from "../layers/layers.actions";
import { toCenter } from "@ttungbmt/geo";

export const name = `${KEY}.config`

const initialState = {
    center: [10.804476, 106.639384],
    zoom: 10,
    // bounds: []
}

const reducers = {
    setConfig: (state, {payload}) => {
        return {...initialState, ...payload}
    },
    setCenter: (state, {payload}) => {
        state.center = toCenter(payload)
    },
    setZoom: (state, {payload}) => {
        state.zoom = payload
    },
    setBounds: (state, {payload}) => {
        if (!isEmpty(payload)) state.bounds = payload
    },
}

const configSlice = createSlice({
    name,
    initialState,
    reducers,
})

configSlice.selectors = selectors
configSlice.actions = defaults(configSlice.actions, actions)

export default configSlice