import React from "react";
import { createPortal } from "react-dom";

type Props = {
  modalOpen: boolean;
};

const Modal: React.FC<Props> = ({ modalOpen, children }) => {
  if (!modalOpen) return null;
  return createPortal(
    <div className="modal-container">
          {children}
    </div>,
    document.body
  );
};

export default Modal;
