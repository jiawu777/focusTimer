import React from 'react';
import './Button.scss';

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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ variant, className = '', children, ...rest }) => {
  const variantClass = variant ? `button__${variant}` : '';
  return (
    <button
      className={`button ${variantClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
export { ButtonVariant };
