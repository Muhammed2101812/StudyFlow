import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

const Modal = ({ isOpen, onClose, children, size = 'md', closeOnBackdropClick = true }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with fade-in animation */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 fade-in"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal with scale-in animation */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className={clsx(
            'relative bg-white rounded-lg shadow-xl w-full scale-in',
            sizes[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const ModalHeader = ({ children, onClose }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 id="modal-title" className="text-lg font-semibold text-gray-900">{children}</h3>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors focus-ring rounded"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

const ModalBody = ({ children, className }) => {
  return (
    <div className={clsx('px-6 py-4', className)}>
      {children}
    </div>
  );
};

const ModalFooter = ({ children, className }) => {
  return (
    <div className={clsx('px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg', className)}>
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
