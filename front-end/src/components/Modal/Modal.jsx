import './Modal.css';

import { IoIosClose } from "react-icons/io";

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            <IoIosClose className='icon'/>
          </button>
          {children}
        </div>
      </div>
    );
  };