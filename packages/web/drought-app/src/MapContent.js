import React, {memo, useEffect, useState, useContext} from 'react'
import {MapContainer, WMSTileLayer, useLeaflet, Popup} from '@ttungbmt/redux-leaflet'
import {uniqid} from "@ttungbmt/utils";
import {getWMSLayers} from '@ttungbmt/geo'
import L from "leaflet"
import {http} from '@ttungbmt/react.http'
import {get} from 'lodash-es'
import StoreContext from "contexts/store";

function useMapClick({setPop}) {
    const {map} = useLeaflet()

    useEffect(() => {

        const showInfo = ({latlng}) => {
            let info = {
                uuid: uniqid(),
                position: [latlng.lat, latlng.lng],
                items: []
            }


            map.eachLayer(l => {
                if (l._wmsVersion) {
                    let infoUrl = l.getFeatureInfoUrl(latlng)
                    setPop(false)

                    http.get(infoUrl).then(({data}) => {
                        let props = get(data, 'features.0.properties')
                        if(props) setPop({
                            position: [latlng.lat, latlng.lng],
                            content: `Tọa độ: ${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)} - Giá trị: ${props.val}`
                        })

                    })
                }
            })

        }

        map.on('click', showInfo)

        return () => {
            map.off('click', showInfo)
        }
    }, [])
}

function MapContent() {
    const {result, khuvuc} = useContext(StoreContext)
    const [pop, setPop] = useState()
    useMapClick({setPop})

    console.log(result, khuvuc)


    return (
        <>
            {pop && (
                <Popup position={pop.position}>
                    {pop.content}
                </Popup>
            )}
            {result && <WMSTileLayer layers={result.layers} url={'/geoserver/ows?'} transparent={true} format={'image/png'} zIndex={1000} />}
            {khuvuc && <WMSTileLayer layers={'drought:hc_tinh'} url={'/geoserver/ows?'} transparent={true} format={'image/png'} zIndex={1000} cql_filter={khuvuc.cql} tiled={true}/>}
        </>

    )
}

export default memo(MapContent)