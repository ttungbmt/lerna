import toGeoJSON from './toGeoJSON'
import { get, isArray } from 'lodash-es'
import { center, getCoords, featureCollection, feature, getGeom } from '@turf/turf'

function toCenter(geom, format = 'latlng') {
    let geometry

    if(isArray(geom)){
        geometry = featureCollection(geom.map(g => feature(toGeoJSON(g))))
    } else {
        geometry = toGeoJSON(geom)
    }

    let centerGeo = center(geometry)
    if(format == 'geometry') return getGeom(centerGeo)

    let coords = getCoords(centerGeo)
    return [get(coords, '1', 0), get(coords, '0', 0)]
}

export default toCenter