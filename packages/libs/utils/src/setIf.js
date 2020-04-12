import {set} from 'lodash-es'

function setIf(data, condition, path, value) {
    if (condition) set(data, path, value)
}

export default setIf