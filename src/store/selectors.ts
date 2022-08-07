import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';

export const selectAllNotes = (state:RootState) => {
   return state.notes.list
};
export const selectActiveFilter = (state:RootState) => state.filters.filter;

export const selectNotesByFilter = createSelector(

   [selectAllNotes, selectActiveFilter],
   (allNotes, activeFilter) => {
      if (activeFilter === 'all') return allNotes;

      if (activeFilter === 'important') {
         return allNotes.filter(note => note.isImportant);
      }

      return allNotes.filter(note => !note.isImportant);
   },
);