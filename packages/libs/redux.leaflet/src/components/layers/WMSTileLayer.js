import { tileWMSLayer } from '@ttungbmt/leaflet.wms'
import { isEqual } from 'lodash-es'
import PropTypes from 'prop-types'
import { GridLayer, withLeaflet } from 'react-leaflet'

const EVENTS_RE = /^on(.+)$/i

class WMSTileLayer extends GridLayer {
    createLeafletElement(props) {
        const {url, boundary, ...params} = props

        const {leaflet: _l, ...options} = this.getOptions(params)
        return tileWMSLayer(url, options)
    }

    updateLeafletElement(fromProps: Props, toProps: Props) {
        super.updateLeafletElement(fromProps, toProps)
        const {uuid: preUuid, url: prevUrl, opacity: _po, zIndex: _pz, ...prevProps} = fromProps
        const {leaflet: _pl, ...prevParams} = this.getOptions(prevProps)
        const {uuid, url, opacity: _o, zIndex: _z, ...props} = toProps
        const {leaflet: _l, ...params} = this.getOptions(props)

        if (uuid !== preUuid) {
            this.leafletElement.uuid = uuid
        }

        if (url !== prevUrl) {
            this.leafletElement.setUrl(url)
        }
        if (!isEqual(params, prevParams)) {
            this.leafletElement.setParams(params)
        }
    }

    getOptions(params): Object {
        const superOptions = super.getOptions(params)
        return Object.keys(superOptions).reduce((options, key) => {
            if (!EVENTS_RE.test(key)) {
                options[key] = superOptions[key]
            }
            return options
        }, {})
    }
}


WMSTileLayer.propTypes = {
    layers: PropTypes.string.isRequired
}

export default withLeaflet(WMSTileLayer)