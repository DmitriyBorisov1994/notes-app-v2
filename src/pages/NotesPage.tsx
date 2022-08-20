import React, { useState, useEffect } from 'react'
import { addNewNote, fetchNotes } from '../store/notesSlice'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { Spin } from 'antd';
import NotesList from '../components/NotesList'
import { Note } from '../store/notesSlice';
import Controls from '../components/Controls';
import Filter from '../components/Filter';
import { selectNotesByFilter } from '../store/selectors';
import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

const NotesPage: React.FC = () => {

   const { isAuth, userId } = useAuth()

   const notes = useAppSelector(selectNotesByFilter)

   const [text, setText] = useState('')
   const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

   const { loading, error } = useAppSelector(state => state.notes)

   const dispatch = useAppDispatch()

   const handleSearch = (search: string) => {
      let data = notes;
      if (search) {
         data = data.filter((note) => note.text.toLowerCase().includes(search.toLowerCase()))
      };
      setFilteredNotes(data)
   }


   const onAddNote = () => {
      if (text.trim().length && userId) {
         dispatch(addNewNote({ userId, text }))
      }
      setText('')
   }

   const onSetText = (text: string) => {
      setText(text)
   }

   useEffect(() => {
      if (!!userId) dispatch(fetchNotes(userId))
   }, [])

   useEffect(() => {
      setFilteredNotes(notes)
   }, [notes])

   return (
      <>
         {isAuth
            ? <>
               {loading === true
                  ? <Spin />
                  : <>
                     <Controls handleSearch={handleSearch} onAddNote={onAddNote} text={text} onSetText={onSetText} />
                     <Filter />
                     <NotesList notes={filteredNotes} />
                     {error && <div className='text-light error-block'>{error}</div>}
                  </>
               }
            </>
            : <Navigate to='/login' />
         }
      </>

   )
}

export default NotesPage