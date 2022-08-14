import React from 'react'
import Form from './Form'
import { userLogin } from './../store/userSlice'
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hook';
import { useAuth } from 'hooks/useAuth';

const Login: React.FC = () => {

   const { isAuth, email, id } = useAuth()

   const dispatch = useAppDispatch()

   const handleLogin = (email: string, password: string) => {
      dispatch(userLogin({ email, password }))
   }

   return (
      <>
         {isAuth ? <Navigate to='/' /> : < Form title='Login' handleClick={handleLogin} />}
      </>
   )
}

export default Login