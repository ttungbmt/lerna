import React, {memo} from 'react'
import {createContext} from 'react'
import {useImmerReducer} from 'use-immer'
import {includes, keys} from 'lodash-es'

const initialState = {
    popup: null,
    khuvuc: null,
    result: null
}

const caseReducer = {
    ['setKhuvuc']: (state, {payload}) => {
        state.khuvuc = payload
    },
    ['setResult']: (state, {payload}) => {
        state.result = payload
    },
    ['resetResult']: (state, {payload}) => {
        state.result = null
    }
}

const reducer = (state, action) => includes(keys(caseReducer), action.type) ? caseReducer[action.type](state, action) : state

const StoreContext = createContext()

const StoreProvider = memo(({initialState, children}) => {
    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const dispatchfn = (type, payload) => dispatch(({type, payload}))

    return (
        <StoreContext.Provider value={{...state, dispatch: dispatchfn}}>
            {children}
        </StoreContext.Provider>
    )
})


StoreProvider.defaultProps = {initialState}

export default StoreContext
export {StoreProvider}