import  { combineReducers } from 'redux'
import indexReducer from './indexReducer'
import pageReducer from "./pageReducer"
import apiReducer from "./apiReducer"

const rootReducer = combineReducers({
    indexRed: indexReducer,
    apiRed: apiReducer,
    pageRed: pageReducer
})

export default rootReducer
