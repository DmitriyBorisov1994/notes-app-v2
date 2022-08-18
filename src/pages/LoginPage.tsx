import { Col, Row, Space } from 'antd';
import Login from 'components/Login';
import React from 'react'
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
   return (
      <>
         <Row justify='center'>
            <Col xs={24} sm={12}>
               <Space direction='vertical' style={{ width: '100%' }} size='large'>
                  <h1 style={{ color: 'white', fontSize: '1.5rem' }}>Войдите в свой аккаунт</h1>
                  <Login />
                  <p style={{ color: 'white', fontSize: '1.2rem' }}>Или <Link to='/register'><b>зарегистрируйтесь</b></Link></p>
               </Space>
            </Col>
         </Row>
      </>
   )
}

export default LoginPage