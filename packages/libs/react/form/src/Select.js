import React, {memo, useEffect, useState} from 'react'
import { Form } from 'react-bootstrap'
import { map, get, isArray, omit } from 'lodash-es'
import {  useFormContext  } from "react-hook-form"
import $ from 'jquery'
import 'dependent-dropdown'

const transOpts = (opts) => {
    if(!opts) return []
    if(isArray(opts)) return opts

    return map(opts, (v, k) => ({value: k, label: v}))
}

const useUrl = ({url, depends, ajaxSettings, placeholder = 'Chọn...', name, path, ...props}, {setData}) => {
    const { control } = useFormContext()
    useEffect(() => {
        if(url){
          if(depends) {
              let el = get(control, `fieldsRef.current.${name}.ref`)
              $(el).depdrop({
                  depends,
                  url,
                  loadingText: 'Đang tải ...',
                  placeholder,
                  emptyMsg: 'Không có dữ liệu',
                  ajaxSettings
              })
          } else {
              $.get(url, (opts) => {
                  setData(transOpts(path ? get(opts, path) : opts))
              })
          }
        }
    }, [])
}


function Select({register, children, options, ...props}) {
    const [data, setData] = useState(transOpts(options))
    const dropProps = omit(props, ['ajaxSettings'])
    useUrl(props, {setData})

    useEffect(() => {
        setData(transOpts(options))
    }, [JSON.stringify(options)])

    return (
        <Form.Control as="select" ref={register} {...dropProps} defaultValue={props.selected}>
            {data.length > 0 && <option value="">{props.placeholder}</option>}
            {children}
            {map(data, ({value, label}, k) => (<option key={k} value={value}>{label}</option>))}
        </Form.Control>
    )
}

export default memo(Select)