import { createSlice } from '@reduxjs/toolkit'

const PAGE_SIZE = 5

interface PaginationState {
  page: number
  pageSize: number
}

const initialState: PaginationState = {
  page: 0,
  pageSize: PAGE_SIZE,
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page++
    },
    previousPage: (state) => {
      state.page--
    },
    resetPagination: () => initialState,
  },
})

export const { previousPage, nextPage } = paginationSlice.actions
export default paginationSlice.reducer
