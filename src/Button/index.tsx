import React from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import { ButtonProps } from './type';

/**
 * 按钮组件
 */
const Button: React.FC<ButtonProps> = (props) => {
  const {
    active = false,
    children = '',
    className,
    disabled = false,
    shape = 'round',
    size = 'medium',
    style,
    type = 'primary',
    variant = 'base',
    icon,
    onClick = () => { },
    ...buttonProps
  } = props;
  return (
    <button
      className={classNames(
        'i-button',
        `i-button--type-${type}`,
        variant !== 'base' && `i-button--variant-${variant}`,
        size !== 'medium' && `i-button--size-${size}`,
        shape !== 'round' && `i-button--shape-${shape}`,
        active && 'i-button-active',
        disabled && 'i-button-disabled',
        className,
      )}
      style={{ ...style }}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}
    >
      {icon && <Icon className='i-button-icon' name={icon} />}
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
