import { createSelector } from '@ttungbmt/redux-toolkit'
import { KEY } from '../../consts/index'

export const getOptions = createSelector([[KEY, 'options']], options => options || {})
export const getMapOptions = createSelector([getOptions], options => options.map || {})
export const getLoading = createSelector([getOptions], options => options.loading)
