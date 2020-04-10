import { combineReducers } from 'redux'

const createReducer = (asyncReducers = {}, history) =>
    combineReducers({

        ...asyncReducers
    });

export default createReducer
