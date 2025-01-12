import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
        onClick={onClose}>
        <div className="animate-modalZoomIn text-center bg-white p-6 rounded-2xl shadow-lg relative max-w-[90%] md:max-w-[50%] lg:max-w-[33%]" 
        onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
      </div>
    );
};

export default Modal;