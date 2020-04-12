import {set} from 'lodash'

export const setIf = (data, condition, path, value) => {
    if (condition) set(data, path, value)
}