import L, { TileLayer } from 'leaflet'
import 'leaflet.nontiledlayer'
import { getFeatureInfoUrl } from '@ttungbmt/geo'
import uniqid from 'uniqid'

const getOptions = ({uuid, ...options}) => ({
    format: 'image/png',
    transparent: true,
    ...options
})

export const TileWMSLayer = TileLayer.WMS.extend({
    initialize: function(url, options = {}) {
        TileLayer.WMS.prototype.initialize.call(this, url, this.getOptions(options))
        this.uuid = options.uuid ? options.uuid : uniqid()

    },

    getOptions,

    getFeatureInfoUrl: function (latlng, params) {
        return getFeatureInfoUrl(this, latlng, params)
    }
})

export const SingleTileWMSLayer = L.NonTiledLayer.WMS.extend({
    initialize: function(url, options = {}) {
        L.NonTiledLayer.WMS.prototype.initialize.call(this, url, this.getOptions(options))
        this.uuid = options.uuid ? options.uuid : uniqid()
    },

    getOptions,

    getFeatureInfoUrl: function (latlng, params) {
        return getFeatureInfoUrl(this, latlng, params)
    }
})

L.tileWMSLayer = tileWMSLayer

export function tileWMSLayer(url, {tiled, ...options}) {
    return tiled ? new SingleTileWMSLayer (url, options) : new TileWMSLayer(url, options);
}

