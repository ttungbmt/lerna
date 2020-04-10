import L from 'leaflet'

function getWMSLayers(map) {
    let layer = []

    map.eachLayer(l => {
        if(l instanceof L.TileLayer.WMS) layer.push(l)
    })

    let timestamp = (new Date()).getTime(),
        layerOrdered = [];

    Object.keys(layer).sort().forEach(function(key) {
        layerOrdered[key] = layer[key];
        layerOrdered[key]._timestamp = timestamp
    });
    return layerOrdered
}

export default getWMSLayers