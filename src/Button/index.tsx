import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface ButtonProps {
  /**
   * 是否聚焦状态
   * @default false
   */
  active?: boolean;
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否禁用按钮
   * @default false
   */
  disabled?: boolean;
  /**
   * 按钮形状
   * @default round
   */
  shape?: 'square' | 'round' | 'circle';
  /**
   * 按钮尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 按钮类型，用于描述组件不同的应用场景
   * @default primary
   */
  type?: 'info' | 'primary' | 'danger' | 'warning' | 'success';
  /**
   * 按钮形式
   * @default base
   */
  variant?: 'base' | 'outline' | 'dashed' | 'text';
}

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
    ...buttonProps
  } = props;
  return (
    <button
      className={classNames(
        'i-button',
        `i-button--type-${type}`,
        `i-button--variant-${variant}`,
        `i-button--size-${size}`,
        `i-button--shape-${shape}`,
        active && 'i-button-active',
        disabled && 'i-button-disabled',
        className,
      )}
      style={{ ...style }}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
