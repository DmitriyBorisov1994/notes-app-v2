import SignUp from 'components/SignUp';
import React from 'react'
import { Link } from "react-router-dom";
import { Col, Row, Space } from 'antd';

const RegisterPage: React.FC = () => {
   return (
      <>
         <Row justify='center'>
            <Col xs={24} sm={12}>
               <Space direction='vertical' style={{ width: '100%' }} size='large'>
                  <h1 style={{ color: 'white', fontSize: '1.5rem' }}>Зарегистрируйтесь</h1>
                  <SignUp />
                  <p style={{ color: 'white', fontSize: '1.2rem' }}>Или <Link to='/login'><b>войдите в свой аккаунт</b></Link></p>
               </Space>
            </Col>
         </Row>
      </>
   )
}

export default RegisterPage