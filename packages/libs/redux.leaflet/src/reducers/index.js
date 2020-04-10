import { combineReducers } from '@ttungbmt/redux-toolkit'

import configSlice from './config/config.slice';
import layersSlice from './layers/layers.slice';
import controlsSlice from './controls/controls.slice';
import optionsSlice from './options/options.slice';
import popupSlice from './popup/popup.slice';

import * as generalSelectors from './selectors'
import * as generalActions from './actions'

export const reducer = combineReducers({
    config: configSlice.reducer,
    layers: layersSlice.reducer,
    controls: controlsSlice.reducer,
    options: optionsSlice.reducer,
    popup: popupSlice.reducer,
})

export const actions = {
    ...generalActions,
    ...configSlice.actions,
    ...layersSlice.actions,
    ...controlsSlice.actions,
    ...optionsSlice.actions,
    ...popupSlice.actions,
}

export const selectors = {
    ...generalSelectors,
    ...configSlice.selectors,
    ...layersSlice.selectors,
    ...controlsSlice.selectors,
    ...optionsSlice.selectors,
    ...popupSlice.selectors,
}

export const slices = {
    ...configSlice,
    ...layersSlice,
    ...controlsSlice,
    ...optionsSlice,
    ...popupSlice,
}

