import getWMSLayers from './getWMSLayers'
import { find } from 'lodash-es'

function getWMSLayer(map, predicate) {
    return find(getWMSLayers(map), predicate)
}

export default getWMSLayer