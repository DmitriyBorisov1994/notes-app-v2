import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { fetchNote, updateNote } from '../store/notesSlice'
import { useParams } from "react-router-dom";
import EditNote from '../components/EditNote';
import { Spin } from 'antd';
import { useAuth } from 'hooks/useAuth';

const EditTodo: React.FC = () => {

   const { noteId } = useParams()
   const { userId } = useAuth()
   const dispatch = useAppDispatch()

   const updateNoteText = (userId: string, noteId: string, text: string) => {
      dispatch(updateNote({ userId, noteId, text }))
   }

   useEffect(() => {
      console.log('use effect fetch note')
      console.log(!!userId && !!noteId)
      console.log('userId' + userId + 'noteId' + noteId)
      if (!!userId && !!noteId) dispatch(fetchNote({ userId, noteId }))
   }, [noteId])

   const { loading, error } = useAppSelector(state => state.notes)
   const note = useAppSelector(state => state.notes.list)
   console.log(note)

   return (
      <>
         {loading === true
            ? <Spin />
            : <>
               {error && <div>Ошибка: {error}</div>}
               <EditNote userId={userId} onUpdate={updateNoteText} note={note} />
            </>
         }
      </>
   )
}

export default EditTodo