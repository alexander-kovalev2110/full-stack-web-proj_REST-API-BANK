// src/store/index.ts
import { legacy_createStore as createStore, applyMiddleware, combineReducers, AnyAction } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Importing Reducers
import { alert } from './reducers/alertReducer'
import { cust } from './reducers/custReducer'
import { modalWind } from './reducers/modalWindReducer'
import { trans } from './reducers/transReducer'

const rootReducer = combineReducers({
  alert,
  cust,
  modalWind,
  trans,
})

// Store Creating 
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// Types of store
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>

export default store
