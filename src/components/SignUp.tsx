import React from 'react'
import Form from './Form'
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
      <Form title='Sign Up' handleClick={handleSignUp} />
   )
}

export default SignUp