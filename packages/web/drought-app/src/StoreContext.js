import React, {memo} from 'react'
import { createContext } from 'react'
import { useImmerReducer } from "use-immer"


const initialState = {
    popup: null,
    result: null
}

export const StoreContext = createContext()

const reducer = () => {

}


function StoreProvider({ initialState, children }) {
    const [state, dispatch] = useImmerReducer(reducer, initialState)

    return (
        <StoreContext.Provider value={{ ...state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

StoreProvider.defaultProps = {initialState}

export default memo(StoreProvider)