"use client";

import { ReactNode, useEffect } from "react";

interface MainModalProps {
  onClose: () => void;
  children: ReactNode;
}

const MainModal = ({ onClose, children }: MainModalProps) => {
  // Fecha o modal ao pressionar a tecla Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    // <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-[90%]">
        {children}
      </div>
    </div>
  );
};

export default MainModal;
