import React from 'react';
import { isUserLoggedIn } from '../utils/isUserLoggedIn';
import { LoginNow } from './login-now';
import { Logout } from './logged-in';

export const LoginBusiness = () => {
  return (
  <>
    {isUserLoggedIn() ? 
    <Logout /> : <LoginNow />}
    
  </>
  )
}