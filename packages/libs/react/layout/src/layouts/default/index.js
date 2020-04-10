import React, {memo} from 'react'
import * as Space from 'react-spaces'
import {Slot} from 'react-slot'
import config from "../map/config";
import LayoutMap from "../map";

function LayoutDefault({children}) {
    return (
        <Space.ViewPort className='layout-default'>
            <Space.Top as="header" size={55}>
                <Slot name='header' as='header' content={children}/>
            </Space.Top>
            <Space.Fill as="main">
                <Slot content={children} />
            </Space.Fill>
            <Space.BottomResizable as="footer" size={100}>
                <Slot name='footer' content={children}/>
            </Space.BottomResizable>
        </Space.ViewPort>
    )
}

LayoutDefault.config = {
    hello: '123'
}

export default memo(LayoutDefault)