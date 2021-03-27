import React from "react";

import "./style.css";

const Modal: React.FC = ({ children }) => {
  return (
    <div className='mask-modal'>
      <div className='modal-content'>{children}</div>
    </div>
  );
};

export default Modal;
