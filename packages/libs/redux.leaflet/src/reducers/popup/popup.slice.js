import { createSlice } from '@ttungbmt/redux-toolkit'
import { defaults } from '@ttungbmt/utils'
import { KEY } from "../../consts"
import * as selectors from './popup.selectors'
import * as actions from "./popup.actions"
import { mergeFilter } from "@ttungbmt/utils";
import { uniqid } from "@ttungbmt/utils";
import { toCenter } from "@ttungbmt/geo";

export const name = `${KEY}/popup`

const initialState = {
    uuid: null,
    keys: [],
    items: []
}

const reducers = {
    resetPopup: (state, {payload}) => {
        return {...initialState, keys: state.keys}
    },
    setPopup: (state, {payload}) => {
        return {...state, ...payload}
    },
    setPopupKeys: (state, {payload}) => {
        state.keys = payload
    },
    updatePopupContent: (state, {payload}) => {
        const {uuid, content, model} = payload
        mergeFilter(state.items, {uuid}, {loaded: true, content, model})
    },
    createPopup: (state, {payload}) => {
        const geometry = payload.model.geometry
        state.uuid = uniqid()
        state.position = geometry ? toCenter(geometry): null
        state.items = [{
            key: payload.key,
            loaded: true,
            model: payload.model
        }]
    }
}

const popupSlice = createSlice({
    name,
    initialState,
    reducers,
})

popupSlice.selectors = selectors
popupSlice.actions = defaults(popupSlice.actions, actions)

export default popupSlice