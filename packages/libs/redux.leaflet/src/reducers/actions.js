import { createAction } from "@ttungbmt/redux-toolkit"
import { KEY } from "../consts";
// import { KEY } from '../consts/index'
// import { actions } from './index'

export const setMap = createAction(`${KEY}/SET_MAP`)
export const getWMSInfo = createAction(`${KEY}/GET_WMS_INFO`)
export const setMapLoading = createAction(`${KEY}/LOADING`)
export const setMapLoaded = createAction(`${KEY}/LOADED`)


//
// export const saveMap = (builder) => (dispatch, getState) => {
//     const {app, config, options, layers, controls} = builder
//     const {setApp, setConfig, setOptions, setLayers, setControls} = actions
//
//     dispatch(setApp(app))
//     dispatch(setConfig(config))
//     dispatch(setOptions(options))
//     dispatch(setLayers(layers))
//     dispatch(setControls(controls))
// }
//
