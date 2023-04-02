import { X } from "@phosphor-icons/react";
import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<any>(null);

  // Add event listener to the document when the modal is open
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove event listener when the modal is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {!isOpen ? null : (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md"
          >
            <div
              className={`border-b px-4 py-2 flex ${title ? "justify-between" : "justify-end"
                } items-center`}
            >
              {title && <h3 className="font-semibold text-xl">{title}</h3>}
              <X size={24} className="cursor-pointer" onClick={onClose} />
            </div>
            <div className="p-6">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
