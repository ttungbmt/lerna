import React, {memo} from 'react'
import * as Space from 'react-spaces'
import {Slot} from 'react-slot'

function LayoutSidebar({children}) {
    return (
        <Space.Fill>
            <Space.Top size={0} order={1}>
                <Slot name='sb.header' content={children}/>
            </Space.Top>
            <Space.Top size={0} order={2}>
                <Slot name='sb.toolbar' content={children}/>
            </Space.Top>
            <Space.Fill scrollable={true}>
                <Slot content={children}/>
            </Space.Fill>
            <Space.Bottom size={0}>
                <Slot name='sb.footer' content={children}/>
            </Space.Bottom>
        </Space.Fill>
    )
}

export default memo(LayoutSidebar)