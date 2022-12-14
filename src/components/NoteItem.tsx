import { useAppDispatch } from '../hooks/hook'
import { removeNote, toggleStatus } from '../store/notesSlice'
import { Card } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useSpring, animated, easings } from 'react-spring'
import { useState } from 'react';
import AnimatedSvgButton from './AnimatedSvgButton';
import { useAuth } from 'hooks/useAuth';

interface NoteItemProps {
   noteId: string,
   text: string,
   isImportant: boolean,
}

const NoteItem: React.FC<NoteItemProps> = ({ noteId, text, isImportant }) => {

   const { userId } = useAuth()

   const dispatch = useAppDispatch()
   const onRemoveTodo = (userId: string, noteId: string) => dispatch(removeNote({ userId, noteId }))
   const onToggleTodo = (userId: string, noteId: string) => dispatch(toggleStatus({ userId, noteId }))
   let navigate = useNavigate();

   const [flip, set] = useState(false)

   const importantStyles = useSpring({
      to: { background: 'linear-gradient(to top, white 80%, #ef5350 )', transform: 'scale(0.97)' },
      from: { background: 'linear-gradient(to top, white 100%, #ffcdd2 )', transform: 'scale(1)' },
      reset: true,
      reverse: flip,
      delay: 300,
      config: {
         duration: 1000,
         easing: easings.easeInOutSine,
      },
      onRest: () => set(!flip),
   })

   const AnimatedCard = animated(Card)

   return (
      <AnimatedCard
         bordered={false}
         style={isImportant ? importantStyles : {}}
         className='card'
         hoverable={true}
         key={noteId}
         actions={[
            <AnimatedSvgButton
               Icon={ExclamationCircleOutlined}
               styles={{ color: isImportant ? '#f44336' : '#ffc107' }}
               onClick={() => {
                  if (!!userId && !!noteId) onToggleTodo(userId, noteId)
               }}
               tooltipTitle='Пометить'
            />,
            <AnimatedSvgButton
               Icon={EditOutlined}
               styles={{ color: '#ffc107' }}
               onClick={() => { navigate(`/${noteId}`) }}
               tooltipTitle='Открыть'
            />,
            <AnimatedSvgButton
               Icon={DeleteOutlined}
               styles={{ color: '#ffc107' }}
               onClick={() => {
                  if (!!userId && !!noteId) onRemoveTodo(userId, noteId)
               }}
               tooltipTitle='Удалить'
            />
         ]}
      >
         {text.length > 30 ? text.substr(0, 30) + '...' : text}
      </AnimatedCard>
   )
}

export default NoteItem