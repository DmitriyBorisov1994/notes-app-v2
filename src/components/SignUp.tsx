import React from 'react'
import MyForm from './Form'
import { userSignUp } from 'store/userSlice'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hook';

const SignUp: React.FC = () => {

   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   const handleSignUp = (email: string, password: string) => {
      dispatch(userSignUp({ email, password }))
      navigate("/")
   }
   return (
      <MyForm title='Регистрация' handleClick={handleSignUp} />
   )
}

export default SignUp