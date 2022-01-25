import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 是否聚焦状态
   * @default false
   */
  active?: boolean;
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
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
   * 组件自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 组件风格
   */
  theme?: 'info' | 'primary' | 'danger' | 'warning' | 'success';
  /**
   * 按钮形式
   */
  variant?: 'base' | 'outline' | 'dashed' | 'text';
}

/**
 * 按钮组件
 */
const Button = (props: ButtonProps) => {
  const {
    active,
    children = '按钮',
    className,
    disabled,
    shape = 'round',
    size = 'medium',
    style,
    theme = 'primary',
    variant = 'base',
    ...buttonProps
  } = props;
  return (
    <button
      className={classNames(
        'i-button',
        `i-button--theme-${theme}`,
        `i-button--variant-${variant}`,
        `i-button--size-${size}`,
        `i-button--shape-${shape}`,
        active && 'i-button-active',
        disabled && 'i-button-disabled',
        className,
      )}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
