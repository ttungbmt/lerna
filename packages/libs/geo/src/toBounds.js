import { map, isEmpty } from 'lodash-es'
import { latLngBounds } from 'leaflet'
import { feature, getCoords, flip, bboxPolygon, bbox, featureCollection, circle, getType } from '@turf/turf'

const pointToCir = (pt, radius = 200) => circle(pt, radius, {units: 'meters'})

const toBounds = (items) => {
    if(isEmpty(items)) return null

    let collection = featureCollection(items.map(i => {
            let item = i.type === 'Feature' ? i : feature(i)
            if (getType(item) === 'Point') {
                item = pointToCir(item)
            }

            return item
        })),
        bounds = latLngBounds(getCoords(flip(bboxPolygon(bbox(collection))))),
        southWest = map(bounds.getSouthWest()),
        northEast = map(bounds.getNorthEast())

    if (JSON.stringify(southWest) === JSON.stringify(northEast)) {
        let item = pointToCir(southWest.reverse())
        return toBounds([item])
    }

    return [southWest, northEast]
}

export default toBounds