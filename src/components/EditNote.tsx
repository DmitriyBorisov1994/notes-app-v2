import React, { useState, useEffect } from 'react'
import { Col, Row, Card, Typography, Tooltip } from 'antd';
import { CheckCircleOutlined, ArrowLeftOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

type Note = {
   id: string;
   text: string;
   isImportant: boolean;
}

interface EditNoteProps {
   note: Note[],
   onUpdate: (id: string, text: string) => void
}

const EditNote: React.FC<EditNoteProps> = ({ note, onUpdate }) => {

   const [editableStr, setEditableStr] = useState('');

   const navigate = useNavigate();


   useEffect(() => {
      setEditableStr(note[0].text)
   }, [note])

   return (
      <Row justify='center'>
         {note.map(n => (
            <Col key={n.id} xs={24} sm={12}>
               <Card
                  key={n.id}
                  className='card'
                  actions={[
                     <Tooltip title='Назад'><ArrowLeftOutlined key="alert" style={{ color: '#ffc107', fontSize: '1.5rem' }} onClick={() => { navigate(-1) }} /></Tooltip>,
                     <Tooltip title='Отменить ввод'><CloseCircleOutlined style={{ color: '#F44336', fontSize: '1.5rem' }} onClick={() => setEditableStr(n.text)} /></Tooltip>,
                     <Tooltip title='Сохранить'><CheckCircleOutlined style={{ color: '#4CAF50', fontSize: '1.5rem' }} key="delete" onClick={() => { onUpdate(n.id, editableStr) }} /></Tooltip>,
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