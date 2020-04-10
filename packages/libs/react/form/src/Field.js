import React, {memo} from 'react'
import { Form } from 'react-bootstrap'
import {  useFormContext  } from 'react-hook-form'

import Select from './Select'
import Input from './Input';

function Field({children, label, as, ...props}) {
    const { register } = useFormContext()

    let Control = () => <></>

    switch (as){
        case 'select':
            Control = Select
            break
        case 'datepicker':
        case 'input':
            Control = Input
            break
        default:
            Control = Input
            break
    }


    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Control register={register} {...props} as={as}>
                {children}
            </Control>
        </Form.Group>
    )
}

export default memo(Field)
