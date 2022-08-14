import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { getNotes, getNote, deleteNote, toggleNote, addNote } from '../api/notesApi'

export type Note = {
   id: string;
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

export const fetchNotes = createAsyncThunk<Note[], undefined, { rejectValue: string }>(
   'notes/fetchNotes',
   async function (_, { rejectWithValue }) {
      const response = await getNotes()
      if (response.status !== 200) {
         return rejectWithValue('Server Error')
      }
      return response.data
   }
)

export const fetchNote = createAsyncThunk<Note[], string, { rejectValue: string }>(
   'notes/fetchNote',
   async function (id, { rejectWithValue }) {
      const response = await getNote(id)
      if (response.status !== 200) {
         return rejectWithValue('Server Error')
      }
      const arrdata = [response.data]
      return arrdata
   }
)

export const removeNote = createAsyncThunk<string, string, { rejectValue: string }>(
   'notes/removeNote',
   async function (id, { rejectWithValue }) {
      const response = await deleteNote(id)
      if (response.status !== 200) {
         return rejectWithValue('can\'t delete note. server error')
      }
      return id

   }
)

export const toggleStatus = createAsyncThunk<Note, string, { rejectValue: string, state: { notes: NotesState } }>(
   'notes/toggleStatus',
   async function (id, { rejectWithValue, getState }) {

      const note = getState().notes.list.find(n => n.id === id)

      if (note) {
         const response = await toggleNote(id, { isImportant: !note.isImportant })
         if (response.status !== 200) {
            return rejectWithValue('can\'t update note. server error')
         }
         return response.data
      }
      return rejectWithValue('Unable to find todo')
   }

)

export const updateNote = createAsyncThunk<Note, { id: string, text: string }, { rejectValue: string, state: { notes: NotesState } }>(
   'notes/updateNote',
   async function ({ id, text }, { rejectWithValue, getState }) {

      const note = getState().notes.list.find(n => n.id === id)

      if (note) {
         const response = await toggleNote(id, { text: text })
         if (response.status !== 200) {
            return rejectWithValue('can\'t update note. server error')
         }
         return response.data
      }
      return rejectWithValue('Unable to find todo')
   }

)

export const addNewNote = createAsyncThunk<Note, string, { rejectValue: string }>(
   'notes/addNewNote',
   async function (text, { rejectWithValue }) {

      const newNote: Note = {
         id: `${Date.now()}`,
         text: text,
         isImportant: false,
      }

      const response = await addNote(newNote)
      if (response.status !== 201) {
         return rejectWithValue('can\'t create note. server error')
      }

      return response.data as Note
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
            const toggledTodo = state.list.find(todo => todo.id === action.payload.id);
            if (toggledTodo) {
               toggledTodo.isImportant = !toggledTodo.isImportant;
            }
         })
         .addCase(removeNote.fulfilled, (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload);
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