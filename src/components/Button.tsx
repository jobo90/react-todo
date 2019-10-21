import React from 'react';

export interface ButtonProps {
  className: string;
  onClick(): void;
  disabled: boolean;
  icon: React.FC;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
      type="button"
    >
      {<props.icon />}
    </button>
  );
};

export default Button;
