import React, { memo, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { get, omit } from 'lodash-es'
// import $ from 'jquery'
import { useFormContext } from "react-hook-form"
// import 'bootstrap-datepicker'
// import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.vi.min.js'
// import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'

// function useDatepicker({as, name}, ref) {
//     const {control, setValue} = useFormContext()
//
//     useEffect(() => {
//         if (as === 'datepicker') {
//             ref.current = get(control, `fields.${name}.ref`)
//             let options = {
//                     format: "dd/mm/yyyy",
//                     todayBtn: "linked",
//                     clearBtn: true,
//                     language: "vi",
//                     autoclose: true,
//                     todayHighlight: true
//                 }
//
//             $(ref.current).datepicker(options).on('changeDate', e => setValue(e.target.value))
//         }
//
//         return () => {
//             if (as === 'datepicker') $(ref.current).datepicker('destroy')
//         }
//     }, [])
//
// }

function Input({register, children, ...props}) {
    let ref = useRef(props)
    // useDatepicker(props, ref)

    return (
        <Form.Control ref={register} {...omit(props, ['as'])}>
        </Form.Control>
    )
}

export default memo(Input)