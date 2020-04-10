import {createBrowserHistory} from 'history'
import {configureStore} from "@ttungbmt/redux.toolkit";

import reducers from "./reducers"

export const history = createBrowserHistory()

const store = configureStore({}, reducers, history)

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        const newRootReducer = store.createReducer(reducers)
        store.replaceReducer(newRootReducer)
    })
}

export default store