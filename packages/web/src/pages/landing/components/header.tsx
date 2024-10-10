import React, { useState } from 'react';
import './header.css';
import { LuPalmtree } from "react-icons/lu";
import Modal from '../../components/modal';
import { useNavigate } from 'react-router-dom';
import { isUserAllowed, UserRoles } from '../../utils/isUserAllowed';
import { useAlert } from '../../../api/providers/alertContext';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showAlert } = useAlert();
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const inputStyle: React.CSSProperties = { 
    borderRadius: '5px',
    border: 'none',
    outline: 'none'
  };

  const navigate = useNavigate()

  return (
    <>
      <header className="header m-4">
        <span className="logo-container">
          <LuPalmtree color='#ff5a5f' />
          <div className="logo" onClick={() => navigate('/')}>Travel Buddy</div>
        </span>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="#destinations" onClick={() => showAlert('Test Alert', 'info')}>Destinations</a>
          <a href="#experiences">Experiences</a>
          <a href='/b/login'>Business</a>
          <a href="#contact" onClick={openModal}>Contact</a>
          <button className="btn-primary">Book Now</button>
          {isUserAllowed({requiredRoles: [UserRoles.moderator, UserRoles.admin, UserRoles.super_admin]}) && 
            <a href='/admin'><button className='btn-secondary ml-2'>Admin Dashboard</button></a>
          }
        </nav>
      </header>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Contact Us">
        <div>
          <p>Your Email</p>
          <input type="text" style={inputStyle} placeholder='example@example.com' />
        </div>
        <div>
          <button className='btn-primary' onClick={closeModal}>Submit</button>
        </div>
      </Modal>
    </>
  );
};

export default Header;
