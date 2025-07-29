import React from 'react';
import './Button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  className?: string;
};

enum ButtonVariant {
  Submit = 'submit',
  Close = 'close',
  Analytics = 'analytics',
  Clear = 'clear',
  ToggleTimer = 'toggleTimer',
  ShowSetTaskModal = 'showSetTaskModal',
  ShowSetTaskModalHide = 'showSetTaskModalHide',
  ShowAnalyticsModal = 'showAnalyticsModal',
}

const Button: React.FC<ButtonProps> = ({ variant, className = '', children, ...rest }) => {
  const variantClass = variant ? `btn__${variant}` : '';
  return (
    <button
      className={`btn ${variantClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
export { ButtonVariant };
