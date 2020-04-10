import { createSlice } from '@ttungbmt/redux-toolkit'
import { defaults } from '@ttungbmt/utils'
import { KEY } from "../../consts"
import * as selectors from './controls.selectors'
import * as actions from "./controls.actions"

export const name = `${KEY}/controls`

const initialState = {
    zoom: {
        enabled: true,
        position: 'bottomright'
    },
    layers: {
        position: 'topright',
        autoZIndex: false,
    },
    scale: {
        position: 'bottomleft'
    },
    locate: {
        position: 'bottomright'
    },
    ruler: {
        enabled: false,
        position: 'topleft'
    },
    exportMap: {
        enabled: true,
    }
}

const reducers = {
    setControl: (state, {payload}) => {

    },
    setControls: (state, {payload}) => {

    },
    addControls: (state, {payload}) => {

    },
    removeControl: (state, {payload}) => {

    },
    toggleControl: (state, {payload: name}) => {
        state[name].enabled = !state[name].enabled
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