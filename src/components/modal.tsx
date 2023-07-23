import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isVisible?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ isVisible, children, onClose }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = isVisible ? (
    <div
      onClick={handleClose}
      className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-center bg-black bg-opacity-70 z-[9999]"
    >
      <div
        className="bg-white w-[500px] max-h-[600px] rounded-xl p-5 z-50"
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
      >
        <div className="flex justify-end text-2xl">
          <button className="button" onClick={handleClose}>
            X
          </button>
        </div>
        <div className="pt-3">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }

  return <div>{children}</div>;
}
