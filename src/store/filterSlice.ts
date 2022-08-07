import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SegmentedValue } from 'antd/lib/segmented';

export interface FilterState {
   filter: SegmentedValue
}

const initialState: FilterState = {
   filter: 'all',
 }

export const filterSlice = createSlice({
   name:'filters',
   initialState,
   reducers: {
      changeFilter: (state, action:PayloadAction<SegmentedValue>) => {
         state.filter = action.payload
      },
   },
})

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer