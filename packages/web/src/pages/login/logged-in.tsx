import React from 'react';
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './components/logout-business.css'

export const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/');
  };

  return (
    <section className="section">
    <div className="section-content">
      <FaLock size={50} className='lock-o' />
      <h1>Logout</h1>
      <div className="login-container">
        <button className='logout-button' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  </section>
  );
}

export default Logout;
