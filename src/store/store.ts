import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './notesSlice'
import filterReducer from './filterSlice'
import userReducer from './userSlice'

const store = configureStore({
   reducer: {
      notes: notesReducer,
      filters: filterReducer,
      user: userReducer
   },
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch  = typeof store.dispatch