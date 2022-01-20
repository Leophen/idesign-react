import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface ButtonProps {
  disabled: boolean;
  children: ReactNode;
  className: string;
}

/**
 * 按钮组件
 */
const Button = ({ disabled, children, className, ...buttonProps }: ButtonProps) => {
  return (
    <button className={classNames('i-button', className)} disabled={disabled} {...buttonProps}>
      <span className={`i-button__text`}>{children}</span>
    </button>
  );
};

export default Button;
