import React, {memo} from 'react'
import * as Space from 'react-spaces'
import {Slot} from 'react-slot'
import {get} from 'lodash-es'
import Box from '@ttungbmt/react.ui.box'
import config from './config'

const defaultProps = {
    config
}

const LayoutMap = memo(({children, config}) => {
    let bg_url = get(config, 'header.self.background')

    return (
        <Space.ViewPort className='layout-map'>
            <Space.Top as="header" size={55} style={{background: `url(${bg_url})`}}>
                <Slot name='header' as='header' content={children}/>
            </Space.Top>
            <Space.Fill as="main">
                <Slot content={children}>
                    <Space.LeftResizable as="aside" size={380}>
                        <Slot name="left-sidebar" content={children}/>
                    </Space.LeftResizable>
                    <Space.Fill>
                        <Space.Top size={0}>
                            <Slot name="map-toolbar" content={children}/>
                        </Space.Top>
                        <Space.Fill>
                            <Slot name="map-content" content={children}/>
                        </Space.Fill>
                    </Space.Fill>
                    <Space.RightResizable as="aside" size={0}>
                        <Slot name="right-sidebar" content={children}/>
                    </Space.RightResizable>
                </Slot>
            </Space.Fill>

            <Space.BottomResizable as="footer" size={0}>
                <Slot name='footer' content={children}/>
            </Space.BottomResizable>
        </Space.ViewPort>
    )
})

function Brand({logo, title}){
    return (
        <Box flex height={1} itemsCenter>
            {logo && <Box mh={1}><img src={logo} alt="" style={{height: 30}}/></Box>}
            <Box uppercase color="#0093dd" fontSize={21} fontWeight={700}>{title}</Box>
        </Box>
    )
}

LayoutMap.defaultProps = defaultProps

LayoutMap.Brand = memo(Brand)

export default LayoutMap