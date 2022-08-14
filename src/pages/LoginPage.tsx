import Login from 'components/Login';
import React from 'react'
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
   return (
      <>
         <h1>Login</h1>
         <Login />
         <p>Or <Link to='/register'>Register</Link></p>
      </>

   )
}

export default LoginPage