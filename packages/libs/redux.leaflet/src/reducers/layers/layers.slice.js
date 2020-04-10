import { createSlice } from '@ttungbmt/redux-toolkit'
import * as selectors from './layers.selectors'
import * as actions from './layers.actions'
import { KEY } from "../../consts"
import { mergeFilter, map, get, uniqid, remove, toBool, defaults, isArray, isString  } from '@ttungbmt/utils'
import { BASEMAP } from "../../index";

import baselayers from '../../fixtures/baselayers'
import { fnDeactiveAllBasemap, fnToggleLayer } from "../../utils";

export const name = `${KEY}/layers`

const initialState = []

const reducers = {
    setLayers: (state, {payload}) => {
        if (payload) return payload.map(l => ({uuid: uniqid(), ...l}))
    },
    addLayers: (state, {payload}) => {
        map(payload, l => state.push(Object.assign(
            {},
            payload.uuid ? {uuid: payload.uuid} : {uuid: uniqid()},
            {
                control: l.control,
                active: l.active,
                type: l.type,
                title: l.title ? l.title : 'None',
                options: l.options
            }
        )))
    },

    addBasemap: {
        reducer: (state, {payload: {keys, active}}) => {
            if(isArray(keys)) {
                keys.map(k => {
                    state.push({uuid: uniqid(), key: k, active: active === k,...get(baselayers, k)})
                })
            }

            if(isString(keys)){
                fnDeactiveAllBasemap(state)
                state.push({uuid: uniqid(), key: keys, active: true, ...get(baselayers, keys)})
            }
        },
        prepare: (keys: Array|String, active) => {
            return {payload: {keys, active}}
        }
    },

    clipBasemap: {
        reducer: (state, {payload: {boundary, keys}}) => {
            if(keys){

            } else {
                state.filter(b => b.control === BASEMAP).map(i => {
                    i.options.boundary = boundary
                })
            }
        },
        prepare: (boundary: Object, keys: Array|String) => {
            return {payload: {boundary, keys}}
        }
    },


    // addBasemap: (state, p) => {
    //     // key: String|Array
    //
    //     console.log(p)
    //
    //     // if(isArray(payload)) {
    //     //
    //     // }
    //
    //
    //
    //
    //
    //     // if(isArray(key)) {
    //     //     key.map((v, k1) => {
    //     //         let layer = get(baselayers, v)
    //     //         if(layer)  state.push({uuid: uniqid(), key: v, ...layer})
    //     //     })
    //     // } else {
    //     //     let layer = get(baselayers, key)
    //     //     if (layer) {
    //     //         fnDeactiveAllBasemap(state)
    //     //         state.push({uuid: uniqid(), key, active: true, ...layer})
    //     //     }
    //     // }
    // },
    activeBasemap: (state, {payload: uuid}) => {
        fnDeactiveAllBasemap(state)
        mergeFilter(state, {uuid}, {active: true})
    },
    activeOverlay: (state, {payload: uuid}) => {
        mergeFilter(state, {uuid}, {active: true})
    },
    toggleOverlay: (state, {payload: uuid}) => {
        fnToggleLayer(state, uuid)
    },
    deactiveOverlay: (state, {payload: uuid}) => {
        mergeFilter(state, {uuid}, {active: false})
    },
    removeLayer: (state, {payload: uuid}) => {
        remove(state, i => i.uuid === uuid)
    },
    saveLayer: (state, {payload: {uuid, active, ...props}}) => {
        if (props.control === BASEMAP) fnDeactiveAllBasemap(state)
        mergeFilter(state, {uuid}, {...props, active: toBool(active)})
    },
    setZIndex: (state, {payload}) => {
        payload.map(({uuid, zIndex}) => {
            mergeFilter(state, {uuid}, {options: {zIndex}})
        })
    },
}



const layersSlice = createSlice({
    name,
    initialState,
    reducers,
})

layersSlice.selectors = selectors
layersSlice.actions = defaults(layersSlice.actions, actions)

export default layersSlice