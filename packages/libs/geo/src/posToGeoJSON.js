import L from 'leaflet'

function posToGeoJSON(position) {
    return L.marker(position).toGeoJSON()
}

export default posToGeoJSON