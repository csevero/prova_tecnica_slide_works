import React, { ButtonHTMLAttributes } from "react";
import "./style.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
}

const Button: React.FC<IButtonProps> = ({
  backgroundColor,
  children,
  ...rest
}) => {
  return (
    <button className="button" style={{ background: `${backgroundColor}` }} {...rest}>
      {children}
    </button>
  );
};

export default Button;
