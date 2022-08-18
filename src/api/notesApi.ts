import { Note } from './../store/notesSlice';
import { db } from './../firebase'
import { set, ref, remove, update, get } from "firebase/database";

export const getNotes = (userId: string) => {
   return (get(ref(db, `/${userId}/notes`))
      .then((snapshot) => Object.values(snapshot.val())))
}

export const deleteNote = (userId: string, noteId: string) => {
   return remove(ref(db, `/${userId}/notes/${noteId}`))
}

export const updNote = (userId: string, noteId: string, note: Note) => {
   return update(ref(db, `/${userId}/notes/${noteId}`), { ...note })
}

export const addNote = (userId: string, note: Note) => {
   return set(ref(db, `/${userId}/notes/${note.noteId}`), {
      ...note
   });
}

export const getNote = (userId: string, noteId: string) => {
   return (get(ref(db, `/${userId}/notes/${noteId}`))
      .then((snapshot) => snapshot.val()))
}
