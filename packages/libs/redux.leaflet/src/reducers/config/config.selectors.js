import { createSelector } from '@ttungbmt/redux-toolkit'
import { KEY } from "../../consts";

export const getConfig = createSelector([[KEY, 'config']], config => config || {})
export const getZoom = createSelector([getConfig], config => config.zoom)
