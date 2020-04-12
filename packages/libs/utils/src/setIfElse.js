import {set} from 'lodash-es'

function setIfElse(data, condition, v1, v2) {
    if(condition){
        set(data, path, v1)
    } else {
        set(data, path, v2)
    }
}

export default setIfElse