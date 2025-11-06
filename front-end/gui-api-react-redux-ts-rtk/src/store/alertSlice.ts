import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alertOpen: false,
    errMessage: ''
  },
  reducers: {
    closeAlert: (state) => {
        state.alertOpen = false
        state.errMessage = ''  
    },
    openAlert: (state, action: PayloadAction<string>) => {
      state.alertOpen = true  
      state.errMessage = action.payload
    }
  }
})

export const { openAlert, closeAlert } = alertSlice.actions
export default alertSlice.reducer
