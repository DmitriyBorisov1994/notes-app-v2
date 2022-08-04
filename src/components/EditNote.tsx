import React, { useState, useEffect } from 'react'
import { Col, Row, Card, Typography, Tooltip } from 'antd';
import { CheckCircleOutlined, ArrowLeftOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import AnimatedSvgButton from './AnimatedSvgButton';

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
                           onUpdate(n.id, editableStr)
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