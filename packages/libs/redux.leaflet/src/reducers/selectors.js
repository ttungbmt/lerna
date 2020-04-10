import { createSelector } from '@ttungbmt/redux-toolkit'
import { KEY } from '../consts/index'

export const getMap = createSelector([KEY], map => map)

