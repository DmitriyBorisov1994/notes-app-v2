import { useAppDispatch } from '../hook'
import { removeNote, toggleStatus } from '../store/notesSlice'
import { Card, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Spring, useSpring, animated, easings, config } from 'react-spring'
import { useState } from 'react';


interface TodoItemProps {
   id: string,
   text: string,
   isImportant: boolean,
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, isImportant }) => {

   const dispatch = useAppDispatch()
   const onRemoveTodo = (id: string) => dispatch(removeNote(id))
   const onToggleTodo = (id: string) => dispatch(toggleStatus(id))
   let navigate = useNavigate();

   const [flip, set] = useState(false)
   const [pressed, setPressed] = useState(false);

   const importantStyles = useSpring({
      to: { background: 'linear-gradient(to bottom, white 0%, #ef5350 )' },
      from: { background: 'linear-gradient(to bottom, white 100%, #ffcdd2 )' },
      reset: true,
      reverse: flip,
      delay: 200,
      config: {
         duration: 1000,
         easing: easings.easeInOutSine,
      },
      onRest: () => set(!flip),
   })

   const AnimatedCard = animated(Card)
   const AnimatedImportantIcon = animated(ExclamationCircleOutlined)
   const AnimatedEditIcon = animated(EditOutlined)
   const AnimatedDeleteIcon = animated(DeleteOutlined)
   return (
      <AnimatedCard
         bordered={false}
         style={isImportant ? importantStyles : {}}
         className='card'
         hoverable={true}
         key={id}
         actions={[

            <Spring from={{ scale: 1 }} to={{ scale: pressed ? 0.8 : 1 }} config={config.wobbly}>
               {({ scale }) => (
                  <Tooltip title='Пометить'>
                     <AnimatedImportantIcon
                        key="alert"
                        style={
                           isImportant
                              ? { color: '#f44336', transform: scale.to(scale => `scale(${scale})`) }
                              : { color: '#ffc107', transform: scale.to(scale => `scale(${scale})`) }
                        }
                        onClick={() => {
                           setPressed(false)
                           onToggleTodo(id)
                        }}
                        onMouseDown={() => setPressed(true)}
                        onMouseLeave={() => setPressed(false)}
                     />
                  </Tooltip>
               )}
            </Spring>
            ,

            <Spring from={{ scale: 1 }} to={{ scale: pressed ? 0.8 : 1 }} config={config.wobbly}>
               {({ scale }) => (
                  <Tooltip title='Открыть'>
                     <AnimatedEditIcon
                        key="alert"
                        style={{ color: '#ffc107', transform: scale.to(scale => `scale(${scale})`) }}
                        onClick={() => {
                           setPressed(false)
                           navigate(`/${id}`)
                        }}
                        onMouseDown={() => setPressed(true)}
                        onMouseLeave={() => setPressed(false)}
                     />
                  </Tooltip>
               )}
            </Spring>
            ,

            <Spring from={{ scale: 1 }} to={{ scale: pressed ? 0.8 : 1 }} config={config.wobbly}>
               {({ scale }) => (
                  <Tooltip title='Удалить'>
                     <AnimatedDeleteIcon
                        key="alert"
                        style={{ color: '#ffc107', transform: scale.to(scale => `scale(${scale})`) }}
                        onClick={() => {
                           setPressed(false)
                           onRemoveTodo(id)
                        }}
                        onMouseDown={() => setPressed(true)}
                        onMouseLeave={() => setPressed(false)}
                     />
                  </Tooltip>
               )}
            </Spring>
            ,
         ]}
      >
         {text.length > 30 ? text.substr(0, 30) + '...' : text}
      </AnimatedCard>
   )
}

export default TodoItem