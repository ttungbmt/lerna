import { createSelector } from '@ttungbmt/redux-toolkit'
import { KEY } from '../../consts/index'
import { get, find, head } from '@ttungbmt/utils'

export const getPopup = createSelector([[KEY, 'popup']], popup => popup || {})

export const getPopupKeys = createSelector([getPopup], popup => popup.keys || [])
export const getPopItems = createSelector([getPopup], popup => popup.items || [])
export const getPopItemById = createSelector([getPopItems, (_, id) => id], (items, id) => {
    return find(items, i => get(i, 'model.gid') === id) || {}
})

export const getCurrentPopup = createSelector([getPopup], popup => {
    let items = get(popup, 'items', []).filter(i => i.loaded),
        item = head(items)

    if (!get(item, 'loaded')) return null
    return {position: popup.position, _key: item.key, ...item}
})
