import { useEffect } from "react"
import {useDispatch, useSelector } from "@ttungbmt/redux-toolkit"
// import { selectors, actions as mapActs, useLeaflet } from "../index"
import { selectors, actions as mapActs, useLeaflet } from "../index"
import { uniqid } from '@ttungbmt/utils'
import { getWMSLayers } from "@ttungbmt/geo";


export function usePopupInfo() {
    const dispatch = useDispatch()

    const layers = useSelector(selectors.getLayers)

    useEffect(() => {
        const showInfo = ({latlng}) => {
            let info = {
                uuid: uniqid(),
                position: [latlng.lat, latlng.lng],
                items: []
            }

            getWMSLayers(map).map(l => {
                let infoUrl = l.getFeatureInfoUrl(latlng)
                info.items.push({
                    loaded: false,
                    infoUrl,
                    layers: l.options.layers,
                    zIndex: l.options.zIndex,
                    uuid: l.uuid,
                    content: ''
                })
            })

            dispatch(mapActs.getWMSInfo(info))
        }

        map.on('click', showInfo)

        return () => {
            map.off('click', showInfo)
        }
    }, [JSON.stringify(layers)])

}