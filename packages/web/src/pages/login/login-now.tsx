import { useState } from 'react';
import './components/login-business.css';
import { FaLockOpen } from "react-icons/fa";
import { loginUser } from './hooks/login';
import { useNavigate } from 'react-router-dom';

export const LoginNow = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const handleLogin = async () => {
    const response = await loginUser(email, password);
    const token = response.access_token.access_token;
    console.log(token)

    localStorage.setItem('access_token', token)
    navigate('/test')
  };

  return (
  <>
    <section className="section">
      <div className="section-content">
        <FaLockOpen size={50} className='lock' />
        <h1>Login</h1>
        <div className="login-container">
          <form action="" className="form">
            <span className="form-col">
              <p>E-Mail</p>
              <input type="email" className="form-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </span>
            <span className="form-col">
              <p>Password</p>
              <input type="password" className="form-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </span>
            <button type="button" className="form-button" onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </section>
  </>
  )
}