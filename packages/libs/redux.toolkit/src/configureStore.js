import { routerMiddleware } from 'connected-react-router'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import createSagaMiddleware from 'redux-saga'
import {configureStore as configureDefaultStore, getDefaultMiddleware,} from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import createReducer from './rootReducer.js'

export default function configureStore(initialState = {}, asyncReducers = {}, history) {
    let middleware = [],
        asyncR1 = {
            router: connectRouter(history),
            ...asyncReducers
        }


    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    middleware = [
        ...getDefaultMiddleware(),
        sagaMiddleware,
        loadingBarMiddleware({
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
        })
    ]

    if(history) middleware.push(routerMiddleware(history))

    const store = configureDefaultStore({
        reducer: createReducer(asyncR1),
        preloadedState: initialState,
        middleware,
    })


    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedSagas = {}; // Saga registry
    store.injectedReducers = {}; // Reducer registry
    store.createReducer = (asyncR2) => createReducer({...asyncR1, ...asyncR2})

    // // Make reducers hot reloadable
    // if (process.env.NODE_ENV === 'development' && module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         const newRootReducer = createReducer(store.injectedReducers)
    //         store.replaceReducer(newRootReducer)
    //     })
    // }

    return store
}

