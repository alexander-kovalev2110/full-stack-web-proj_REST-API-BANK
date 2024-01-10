import  { combineReducers } from 'redux'
import { alert } from "./alertReducer"
import { cust } from "./custReducer"
import { modalWind } from "./modalWindReducer"
import { trans } from "./transReducer"

const rootReducer = combineReducers({
    alert,
    cust,
    modalWind,
    trans
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
