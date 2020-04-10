import toGeometry from './toGeometry'

const toGeoJSON = (value, type) => {
    let geometry = toGeometry(value, type)
    if(!geometry) return null

    return geometry.toGeoJSON()
}

export default toGeoJSON