import { createSelector } from '@reduxjs/toolkit'

export const getDrought = createSelector(state => state.drought, v => v)

export const getResult = createSelector(getDrought, v => v.result)
