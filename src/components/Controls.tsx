import React, { useState } from 'react'
import { Modal, Col, Button, Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import SearchNote from './SearchNote';
import AddNote from './AddNote';

type ControlsProps = {
   handleSearch: (search: string) => void,
   onAddNote: () => void,
   text: string,
   onSetText: (text: string) => void
}


const Controls: React.FC<ControlsProps> = ({ handleSearch, onAddNote, text, onSetText }) => {

   const [isModalVisible, setIsModalVisible] = useState(false);

   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleOk = () => {
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   return (
      <Row gutter={[8, 8]}>
         <Col xs={24} sm={16} md={20}>
            <SearchNote handleSearch={handleSearch} />
         </Col>
         <Col xs={24} sm={8} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" onClick={showModal} style={{ height: '100%', width: '100%', maxWidth: '270px' }} ><PlusCircleOutlined />Создать заметку</Button>
            <Modal
               title="Создать заметку"
               cancelText="Отмена"
               okText="Добавить"
               visible={isModalVisible}
               onOk={() => {
                  onAddNote()
                  handleOk()
               }} onCancel={handleCancel}>
               <AddNote text={text} onSetText={onSetText} />
            </Modal>
         </Col>
      </Row>
   )
}

export default Controls