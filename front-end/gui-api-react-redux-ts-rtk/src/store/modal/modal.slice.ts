import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransAction } from '../../shared/ui-actions'

type ModalState = {
    authorOpen: boolean,
    transOpen: boolean,
    transAction: TransAction | null
}

const initialState: ModalState = {
    authorOpen: false,
    transOpen: false,
    transAction: null,
}
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAuthor: (state) => { state.authorOpen = true },

    closeAuthor:  (state) => { state.authorOpen = false },
   
    openTrans(state, action: PayloadAction<TransAction>) {
      state.transOpen = true
      state.transAction = action.payload
    },
    
    closeTrans:  (state) => { state.transOpen = false },
  }
})

export const { openAuthor, closeAuthor, openTrans, closeTrans } = modalSlice.actions
export default modalSlice.reducer
