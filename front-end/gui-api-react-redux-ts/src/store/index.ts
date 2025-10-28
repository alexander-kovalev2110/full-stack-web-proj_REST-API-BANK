// src/store/index.ts
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Импорт редьюсеров
import { alert } from './reducers/alertReducer'
import { cust } from './reducers/custReducer'
import { modalWind } from './reducers/modalWindReducer'
import { trans } from './reducers/transReducer'

// Корневой редьюсер
const rootReducer = combineReducers({
  alert,
  cust,
  modalWind,
  trans,
})

// Создание стора
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// Типы стора
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
