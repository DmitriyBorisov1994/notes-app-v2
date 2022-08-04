import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook'
import { fetchNote, updateNote } from '../store/notesSlice'
import { useParams } from "react-router-dom";
import EditNote from '../components/EditNote';
import { Spin } from 'antd';

const EditTodo: React.FC = () => {

   const { noteID } = useParams() as any

   const dispatch = useAppDispatch()

   const updateNoteText = (id: string, text: string) => {
      dispatch(updateNote({ id, text }))
   }

   useEffect(() => {
      dispatch(fetchNote(noteID))
   }, [noteID])

   const { loading, error } = useAppSelector(state => state.notes)
   const note = useAppSelector(state => state.notes.list)

   return (
      <>
         {loading === true
            ? <Spin />
            : <>
               {error && <div>Ошибка: {error}</div>}
               <EditNote onUpdate={updateNoteText} note={note} />
            </>
         }
      </>
   )
}

export default EditTodo