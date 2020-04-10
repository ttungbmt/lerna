import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import {serviceWorker} from '@ttungbmt/react.core'
import {Provider} from '@ttungbmt/redux.toolkit'

import store from './store'
import './styles/index.scss'
import App from './App'

// const {PUBLIC_URL} = process.env

ReactDOM.render((
        <StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </StrictMode>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
