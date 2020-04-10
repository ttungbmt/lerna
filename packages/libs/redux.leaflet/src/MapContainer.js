import React, {memo, useEffect, useState} from 'react'
import layers from './baselayers'
import {map, isEmpty} from 'lodash-es'
import {Map, Marker, Popup, TileLayer, LayersControl, GeoJSON, useLeaflet} from 'react-leaflet'

const {BaseLayer, Overlay} = LayersControl

function MapContainer({children, loaded}) {
    const position = [16.3109371, 103.8910913]

    if(!loaded) return null

    return (
        <Map center={position} zoom={6} style={{width: '100%', height: '100%'}}>
            <LayersControl position="topright">
                {map(layers, ({title, active = false, options}, k) => (
                    <BaseLayer key={k} checked={active} name={title}>
                        <TileLayer {...options}/>
                    </BaseLayer>
                ))}

            </LayersControl>
            {children}
        </Map>
    )
}

MapContainer.defaultProps = {
    loaded: true
}

export default memo(MapContainer)