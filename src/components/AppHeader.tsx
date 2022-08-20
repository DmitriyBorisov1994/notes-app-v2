import { Header } from 'antd/lib/layout/layout'
import { useAuth } from 'hooks/useAuth'
import { Col, Row } from 'antd';
import React from 'react'
import AnimatedSvgButton from './AnimatedSvgButton';
import { LogoutOutlined } from '@ant-design/icons';
import { removeUser } from 'store/userSlice';
import { useAppDispatch } from 'hooks/hook';

const AppHeader: React.FC = () => {

  const { email } = useAuth()
  const dispatch = useAppDispatch()

  return (
    <Header className='bg-primary-dark header'>
      <Row justify='space-between'>
        <Col xs={6}><h1 className='text-light'>Заметки</h1></Col>
        {!!email && <Col xs={18}>
          <div style={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: 'white', marginRight: '1rem', fontSize: '.8rem' }}>{email}</span>
            <div className='header-logout'>
              <AnimatedSvgButton Icon={LogoutOutlined} styles={{ fontSize: '1.4rem' }} onClick={() => { dispatch(removeUser()) }} />
              <span style={{ fontSize: '.7rem', lineHeight: '1rem' }}>Выйти</span>
            </div>
          </div>
        </Col>}
      </Row>
    </Header>
  )
}

export default AppHeader