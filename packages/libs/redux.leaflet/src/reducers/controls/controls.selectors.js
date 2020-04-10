import { createSelector } from '@ttungbmt/redux-toolkit'
import { KEY } from '../../consts/index'
import { get } from '@ttungbmt/utils'

export const getControls = createSelector([[KEY, 'controls']], controls => controls || {})

export const getControl = createSelector([getControls, (_, name) => name], (controls, name) => get(controls, name) || {})
