import {hot} from 'react-hot-loader/root'
import {compose} from '@ttungbmt/redux.toolkit'
import React, {memo, useEffect, useState} from 'react'
import {Layout as LAYOUT} from "@ttungbmt/react.layout"
import {MapContainer, WMSTileLayer} from "@ttungbmt/redux-leaflet"
import Box from '@ttungbmt/react.ui.box'
import {FormControl, Nav, Form} from 'react-bootstrap'
import FormMain from './FormMain'
import MapContent from "./MapContent"
import StoreContext, {StoreProvider} from './contexts/store'

function App() {
    const [loaded, setLoaded] = useState(false)
    const Layout = LAYOUT.Map

    useEffect(() => {
        setTimeout(() => setLoaded(true), 200)
    }, [])

    return (
        <StoreProvider>
            <div className="App">
                <Layout>
                    <div slot="header" style={{height: '100%'}}>
                        <Box flex height={1}>
                            <Box flex width={380} contentBetween>
                                <Layout.Brand title={`Quản lý Hạn hán`} />
                                <button type="button" className="cursor-pointer"><i className="icon-paragraph-justify3"/></button>
                            </Box>
                            <Box flex contentBetween grow>
                                <Box flex>
                                    <Box selfCenter ml={2} width={350}>
                                        <Form inline>
                                            {/*<FormControl type="text" placeholder="Tìm kiếm" className="w-full" style={{width: '100%'}}/>*/}
                                        </Form>
                                    </Box>
                                </Box>
                                <Box>
                                    <Nav className="nav h-full content-center">
                                        <Nav.Link href="/admin/gallery">CMS</Nav.Link>
                                    </Nav>
                                </Box>
                            </Box>
                        </Box>
                    </div>
                    <div slot="left-sidebar">
                        <FormMain />
                    </div>
                    <div slot="map-content" style={{height: '100%'}}>
                        {loaded && <MapContainer><MapContent /></MapContainer>}
                    </div>
                    <div slot="right-sidebar">Right Sidebar</div>
                    <div slot="footer">Footer</div>
                </Layout>

            </div>
        </StoreProvider>

    );
}

export default compose(hot, memo)(App)
