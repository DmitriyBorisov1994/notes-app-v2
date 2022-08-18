import React, { useState, useEffect } from 'react'
import { Col, Row, Card, Typography, Tooltip } from 'antd';
import { CheckCircleOutlined, ArrowLeftOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import AnimatedSvgButton from './AnimatedSvgButton';
import { Note } from './../store/notesSlice'
const { Paragraph } = Typography;

interface EditNoteProps {
   note: Note[],
   userId: string | null,
   onUpdate: (userId: string, noteId: string, text: string) => void
}

const EditNote: React.FC<EditNoteProps> = ({ userId, note, onUpdate }) => {

   const [editableStr, setEditableStr] = useState('');

   const navigate = useNavigate();


   useEffect(() => {
      setEditableStr(note[0].text)
   }, [note])

   return (
      <Row justify='center'>
         {note.map(n => (
            <Col key={n.noteId} xs={24} sm={12}>
               <Card
                  key={n.noteId}
                  className='card'
                  actions={[
                     <AnimatedSvgButton
                        Icon={ArrowLeftOutlined}
                        styles={{ color: '#ffc107' }}
                        onClick={() => { navigate(-1) }}
                        tooltipTitle='Назад'
                     />,
                     <AnimatedSvgButton
                        Icon={CloseCircleOutlined}
                        styles={{ color: '#f44336' }}
                        onClick={() => setEditableStr(n.text)}
                        tooltipTitle='Отменить ввод'
                     />,
                     <AnimatedSvgButton
                        Icon={CheckCircleOutlined}
                        styles={{ color: '#4caf50' }}
                        onClick={() => {
                           if (userId) onUpdate(userId, n.noteId, editableStr)
                           navigate(-1)
                        }}
                        tooltipTitle='Сохранить'
                     />,
                  ]}
               >
                  <Paragraph
                     editable={{
                        triggerType: ['text'],
                        onChange: setEditableStr
                     }}
                  >{editableStr}</Paragraph>
               </Card>
            </Col>))}
      </Row>
   )
}

export default EditNote