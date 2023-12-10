import  { combineReducers } from 'redux'
import custReducer from "./custReducer"
import alertReducer from "./alertReducer"
import transReducer from "./transReducer"
import modalWindReducer from "./modalWindReducer"

const rootReducer = combineReducers({
    alertRed: alertReducer,
    custRed: custReducer,
    transRed: transReducer,
    modalWindRed: modalWindReducer
})

export default rootReducer
