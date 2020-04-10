import { createSelector } from '@ttungbmt/redux-toolkit'
import { KEY } from '../../consts/index'
import { find, filter, includes } from '@ttungbmt/utils'
import _ from 'lodash-es'
import { BASEMAP, OVERLAY } from "../../index";
import { layerFn } from '../../utils'

export const getLayers = createSelector([`${KEY}.layers`], layers => layers || [])

export const getLayer = createSelector(
    [getLayers, (_, id) => id],
    (layers, id) => find(layers, {uuid: id}) || {}
)

export const getLayersControl = createSelector([getLayers], layers => {
    let basemap = filter(layers, {control: BASEMAP}).map(layerFn),
        overlay = filter(layers, i => i.control !== BASEMAP).map(layerFn)

    return basemap.concat(overlay)
})

export const getLayersById = createSelector([getLayers, (_, id) => id], (layers, id) => {
    return filter(layers, l => includes(id, l.uuid))
})

export const getFancytreeSource = createSelector([getLayers], layers => {
    let basemap = {
            title: "Basemap",
            extraClasses: 'font-weight-semibold',
            expanded: true,
            folder: true,
            checkbox: false,
            radiogroup: true,
            children: []
        },
        overlay = {
            title: "Overlay",
            extraClasses: 'font-weight-semibold',
            expanded: true,
            folder: true,
            checkbox: false,
            children: []
        }


    _.chain(layers).filter(l => l.control === BASEMAP).map(i => {
        basemap.children = basemap.children.concat({
            title: i.title || 'None',
            selected: i.active,
            icon: false,
            data: i
        })
    }).value()

    _.chain(layers).filter(l => l.control !== BASEMAP).map(i => {
        overlay.children = overlay.children.concat({
            title: i.title || 'None',
            selected: i.active,
            icon: false,
            data: i
        })
    }).value()

    return [basemap, overlay]
})

