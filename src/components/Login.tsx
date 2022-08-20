import React from 'react'
import Form from './Form'
import { userLogin } from './../store/userSlice'
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hook';
import { useAuth } from 'hooks/useAuth';
import MyForm from './Form';

const Login: React.FC = () => {

   const { isAuth, email, userId } = useAuth()

   const dispatch = useAppDispatch()

   const handleLogin = (email: string, password: string) => {
      dispatch(userLogin({ email, password }))
   }

   return (
      <>
         {isAuth ? <Navigate to='/' /> : <MyForm title='Вход' handleClick={handleLogin} />}
      </>
   )
}

export default Login