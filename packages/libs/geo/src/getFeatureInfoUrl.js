import {round} from 'lodash-es'
import {Util} from 'leaflet'

function getFeatureInfoUrl(layer, latlng, params) {
    const map = layer._map;
    const url = layer._url;

    let point = map.latLngToContainerPoint(latlng, map.getZoom()),
        size = map.getSize(),
        bounds = map.getBounds().toBBoxString(),
        wmsParams = layer.wmsParams;

    // var sw = bounds.getSouthWest(),
    //     ne = bounds.getNorthEast(),
    //     sw = crs.projection._proj.forward([sw.lng, sw.lat]),
    //     ne = crs.projection._proj.forward([ne.lng, ne.lat]),
    //     bbox = [sw.join(','), ne.join(',')].join(',');

    let defaultParams = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326', //layer._crs.code,
        transparent: wmsParams.transparent,
        styles: wmsParams.styles,
        version: wmsParams.version, //layer._wmsVersion,
        env: wmsParams.env,
        viewparams: wmsParams.viewparams,
        format: layer.options.format,
        bbox: bounds,
        height: size.y,
        width: size.x,
        layers: layer.options.layers,
        query_layers: layer.options.layers,
        info_format: 'application/json'
    };

    params = Util.extend(defaultParams, params || {});
    // Remove undefined field from object
    Object.keys(params).forEach(key => params[key] === undefined ? delete params[key] : '');

    params[params.version === '1.3.0' ? 'i' : 'x'] = round(point.x); // Fix WMS X and Y incorrectly specified
    params[params.version === '1.3.0' ? 'j' : 'y'] = round(point.y);

    return url + Util.getParamString(params, url, true);
}

export default getFeatureInfoUrl