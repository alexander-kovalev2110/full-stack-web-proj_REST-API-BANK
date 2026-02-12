// store/ui.slice.ts
import { createSlice, isPending, isRejected, isFulfilled } from "@reduxjs/toolkit"

interface UIState {
  loading: boolean
  error: string | null
}

const initialState: UIState = {
  loading: false,
  error: null,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 pending
      .addMatcher(isPending, (state) => {
        state.loading = true
        state.error = null
      })
      // ✅ fulfilled (success)
      .addMatcher(isFulfilled, (state) => {
        state.loading = false
      })
      // ❌ rejected (error)
      .addMatcher(isRejected, (state, action) => {
        state.loading = false
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Unknown error"
      })
  },
})

export const { clearError } = uiSlice.actions
export default uiSlice.reducer
