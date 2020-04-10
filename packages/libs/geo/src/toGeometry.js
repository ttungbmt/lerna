import {Buffer} from 'buffer'
import {isString} from 'lodash-es'
import {parseJSON} from '@ttungbmt/utils'
import wkx from 'wkx'

const toGeometry = (value, type = 'geojson') => {
    let geometry = null

    switch (type) {
        case 'ewkb':
        case 'wkb':
            value = Buffer.from(value, 'hex');
            geometry = wkx.Geometry.parse(value)
            break;
        case 'geojson':
            if (isString(value)) value = parseJSON(value)
            geometry = wkx.Geometry.parseGeoJSON(value)
            break;
        default:
            // support type: wkt
            geometry = wkx.Geometry.parse(value)
    }

    return geometry
}

export default toGeometry