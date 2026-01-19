import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthorKind } from '../../shared/interfaces'
import { TransAction } from '../../shared/ui-actions'

type ModalState = {
    authorOpen: boolean,
    transOpen: boolean,
    authorKind: AuthorKind          // 'Login' / 'Register'
    transAction: TransAction | null
}

const initialState: ModalState = {
    authorOpen: false,
    transOpen: false,
    authorKind: AuthorKind.Login,
    transAction: null,
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
    // openTrans: (state ) => { state.transOpen = true },
    openTrans(state, action: PayloadAction<TransAction>) {
      state.transOpen = true
      state.transAction = action.payload
    },
    closeTrans:  (state) => { state.transOpen = false },
  }
})

export const { openAuthor, closeAuthor, openTrans, closeTrans } = modalSlice.actions
export default modalSlice.reducer
