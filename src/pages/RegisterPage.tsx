import SignUp from 'components/SignUp';
import React from 'react'
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
   return (
      <>
         <h1>Register</h1>
         <SignUp />
         <p>Or <Link to='/login'>Log in</Link></p>
      </>
   )
}

export default RegisterPage