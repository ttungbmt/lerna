import React, {memo, useState, useContext} from 'react'
import {useForm, Form, Field, FormContext} from '@ttungbmt/react.form'
import {useFetch} from "@ttungbmt/react.http";
import Box from '@ttungbmt/react.ui.box';
import {find} from 'lodash-es'
import {useDispatch} from '@ttungbmt/redux.toolkit'

import StoreContext from "contexts/store"

function Badge({title}) {
    return <Box mb={1} className="badge badge-light badge-striped badge-striped-left border-left-primary" textSm>{title}</Box>
}

function FormMain() {
    const {dispatch: dsp, khuvuc} = useContext(StoreContext)
    const methods = useForm()

    const {data, loading} = useFetch({
        key: 'todos',
        url: '/api/dm/results',
        transformResponse: 'data',
        initialData: {}
    })

    const onVung = (e) => {
        let value = parseInt(e.target.value),
            vung = find(data.vungs, {value})

        dsp('setKhuvuc', vung)
    }

    const onTinh = (e) => {
        let value = parseInt(e.target.value)
        dsp('setKhuvuc', {cql: 'gid=' + value})
    }

    const onXuly = (e) => {
        let value = parseInt(e.target.value),
            layers = find(data.results, {value})

        if (layers) {
            dsp('setResult', {id: layers.value, layers: layers.layers})
        } else {
            dsp('resetResult')
        }
    }

    if(!loading || !data)  return null

    return (
        <Box p={1}>
            <FormContext {...methods}>
                <Form>
                   {/* <div>
                        <Badge title={`Khu vực`}/>
                        <Box>
                            <Field
                                className="mt-1"
                                label="Vùng"
                                name="mavung"
                                as="select"
                                options={data.vungs || []}
                                placeholder="Chọn vùng..."
                                id="drop-vung"
                                onChange={onVung}
                            />
                            <Field label="Tỉnh" name="matinh" as="select" url={'/api/dm/tinh'}
                                   placeholder="Chọn tỉnh..." depends={['drop-vung']}
                                   onChange={onTinh}
                            />
                        </Box>
                    </div>*/}
                    <div className="mt-2">
                        <Badge title={`CDI`}/>
                        <Box>
                            <Field
                                name="ma_kq"
                                as="select"
                                options={data.results || []}
                                placeholder="Chọn kết quả..."
                                onChange={onXuly}
                            />
                        </Box>
                    </div>
                </Form>
            </FormContext>
        </Box>


    )
}

export default memo(FormMain)
