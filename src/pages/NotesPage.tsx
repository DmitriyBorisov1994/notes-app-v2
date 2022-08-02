import React, { useState, useEffect } from 'react'
import { addNewNote, fetchNotes } from '../store/notesSlice'
import { useAppDispatch, useAppSelector } from './../hook'
import AddTodo from '../components/AddNote'
import { Spin } from 'antd';
import NotesList from '../components/NotesList'

const NotesPage: React.FC = () => {

   const [text, setText] = useState('')

   const { loading, error } = useAppSelector(state => state.notes)

   const dispatch = useAppDispatch()


   const onAddNote = () => {
      if (text.trim().length) {
         dispatch(addNewNote(text))
      }
      setText('')
   }

   const onSetText = (text: string) => {
      setText(text)
   }

   useEffect(() => {
      dispatch(fetchNotes())
   }, [])

   return (
      <>
         <AddTodo onAddNote={onAddNote} text={text} onSetText={onSetText} />
         {loading === true && <Spin />}
         {error && <div>Ошибка! {error}</div>}
         <NotesList />
      </>
   )
}

export default NotesPage