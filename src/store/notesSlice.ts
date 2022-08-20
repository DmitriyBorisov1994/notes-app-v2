import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { getNotes, getNote, deleteNote, updNote, addNote } from '../api/notesApi'
import { uid } from 'uid'

export type Note = {
   noteId: string;
   text: string;
   isImportant: boolean;
}

export type NotesState = {
   list: Note[];
   loading: boolean;
   error: string | null;
}

const initialState: NotesState = {
   list: [],
   loading: false,
   error: null,
}

export const fetchNotes = createAsyncThunk<Note[], string, { rejectValue: string }>(
   'notes/fetchNotes',
   async function (userId, { rejectWithValue }) {
      try {
         const response = await getNotes(userId) as any
         return response as Note[]
      } catch (err) {
         if (err instanceof TypeError) {
            if (err.message === 'Cannot convert undefined or null to object') return rejectWithValue('У вас пока нет заметок!')
         }
         return rejectWithValue('Server Error:' + err)
      }
   }
)

export const fetchNote = createAsyncThunk<Note[], { userId: string, noteId: string }, { rejectValue: string }>(
   'notes/fetchNote',
   async function ({ userId, noteId }, { rejectWithValue }) {
      try {
         const response = await getNote(userId, noteId)
         return new Array(response) as Note[]
      } catch (err) {
         return rejectWithValue('Server Error' + err)
      }
   }
)

export const removeNote = createAsyncThunk<string, { userId: string, noteId: string }, { rejectValue: string }>(
   'notes/removeNote',
   async function ({ userId, noteId }, { rejectWithValue }) {
      try {
         const response = await deleteNote(userId, noteId)
      } catch (err) {
         return rejectWithValue('Can\'t delete note. server error: ' + err)
      }
      return noteId

   }
)

export const toggleStatus = createAsyncThunk<string, { userId: string, noteId: string }, { rejectValue: string, state: { notes: NotesState } }>(
   'notes/toggleStatus',
   async function ({ userId, noteId }, { rejectWithValue, getState }) {

      const note = getState().notes.list.find(n => n.noteId === noteId)

      if (note) {
         try {
            const response = await updNote(userId, noteId, { ...note, isImportant: !note.isImportant })
            return noteId
         } catch (err) {
            return rejectWithValue('can\'t update note. server error ' + err)
         }
      }
      return rejectWithValue('Unable to find todo')
   }

)

export const updateNote = createAsyncThunk<string, { userId: string, noteId: string, text: string }, { rejectValue: string, state: { notes: NotesState } }>(
   'notes/updateNote',
   async function ({ userId, noteId, text }, { rejectWithValue, getState }) {

      const note = getState().notes.list.find(n => n.noteId === noteId)

      if (note) {
         try {
            const response = await updNote(userId, noteId, { ...note, text: text })
            return text
         } catch (err) {
            return rejectWithValue('can\'t update note. server error' + err)
         }
      }
      return rejectWithValue('Unable to find todo')
   }

)

export const addNewNote = createAsyncThunk<Note, { userId: string, text: string }, { rejectValue: string }>(
   'notes/addNewNote',
   async function ({ userId, text }, { rejectWithValue }) {

      const newNote: Note = {
         noteId: uid(),
         text: text,
         isImportant: false,
      }

      try {
         await addNote(userId, newNote)
      } catch (err) {
         return rejectWithValue('Can\'t create note. Server error:' + err)
      }

      return newNote as Note
   }

)


const notesSlice = createSlice({
   name: 'notes',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchNotes.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchNotes.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
         })
         .addCase(fetchNote.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchNote.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
         })
         .addCase(addNewNote.pending, (state) => {
            state.error = null;
         })
         .addCase(addNewNote.fulfilled, (state, action) => {
            state.list.push(action.payload);
         })
         .addCase(toggleStatus.fulfilled, (state, action) => {
            const toggledNote = state.list.find(note => note.noteId === action.payload);
            if (toggledNote) {
               toggledNote.isImportant = !toggledNote.isImportant;
            }
         })
         .addCase(removeNote.fulfilled, (state, action) => {
            state.list = state.list.filter(note => note.noteId !== action.payload);
         })
         .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
         });
   }
})

export default notesSlice.reducer

function isError(action: AnyAction) {
   return action.type.endsWith('rejected');
}