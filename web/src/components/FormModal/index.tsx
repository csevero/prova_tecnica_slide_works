import React, { FormHTMLAttributes } from 'react';

import './style.css';

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {}

const FormModal: React.FC<IFormProps> = ({ children }) => {
  return <form className="form-modal">{children}</form>;
};

export default FormModal;
