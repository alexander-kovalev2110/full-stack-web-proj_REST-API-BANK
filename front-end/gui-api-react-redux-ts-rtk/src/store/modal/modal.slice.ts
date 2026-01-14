import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthorKind } from '../../shared/interfaces'

type ModalState = {
    authorOpen: boolean,
    transOpen: boolean,
    authorKind: AuthorKind          // 'Login' / 'Register'
}

const initialState: ModalState = {
    authorOpen: false,
    transOpen: false,
    authorKind: AuthorKind.Login
}
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAuthor: (state, action: PayloadAction<AuthorKind>) => {
      state.authorOpen = true  
      state.authorKind = action.payload
    },
    closeAuthor:  (state) => { state.authorOpen = false },
    openTrans: (state ) => { state.transOpen = true },
    closeTrans:  (state) => { state.transOpen = false },
  }
})

export const { openAuthor, closeAuthor, openTrans, closeTrans } = modalSlice.actions
export default modalSlice.reducer
