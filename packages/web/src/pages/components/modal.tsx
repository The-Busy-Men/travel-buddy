import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content ${isOpen ? 'modal-enter' : 'modal-exit'}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {title && <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
