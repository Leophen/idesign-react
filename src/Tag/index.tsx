import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';

export interface TagProps {
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 标签中的图标，可自定义图标呈现
   */
  icon?: string;
  /**
   * 标签最大宽度，超出部分渐变省略。示例：'50px' / 80
   */
  maxWidth?: React.CSSProperties['maxWidth'] | number;
  /**
   * 标签尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 标签主题
   * @default dark
   */
  theme?: 'light' | 'dark';
  /**
   * 标签类型，用于描述组件不同的应用场景
   * @default default
   */
  type?: 'default' | 'primary' | 'warning' | 'danger' | 'success';
  /**
   * 点击标签触发事件
   */
  onClick?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * 添加标签触发事件，设置后会自动带上添加按钮
   */
  onAdd?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * 删除标签触发事件，设置后会自动带上删除按钮
   */
  onClose?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
}

const Tag: React.FC<TagProps> = (props) => {
  const {
    children = '',
    className,
    icon,
    maxWidth,
    size = 'medium',
    style,
    theme = 'light',
    type = 'default',
    onAdd,
    onClick = () => {},
    onClose,
    ...others
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onAdd) {
      onAdd({ e });
    }
    onClick({ e });
  };

  return (
    <div
      className={classNames(
        'i-tag',
        `i-tag--size-${size}`,
        `i-tag--type-${type}`,
        `i-tag--theme-${theme}`,
        onAdd && 'i-tag--add-btn',
        maxWidth && 'i-tag--ellipsis',
        className,
      )}
      style={{ ...(style || {}), ...{ maxWidth } }}
      onClick={handleClick}
      {...others}
    >
      {onAdd && <Icon name="ThePlus" size={size === 'large' ? 16 : 12} />}
      {icon && <Icon name={icon} size={{ small: 12, medium: 14, large: 16 }[size]} />}
      {children}
      {onClose && (
        <div className="i-tag--close-btn" onClick={(e) => onClose({ e })}>
          <Icon name="Close" size={size === 'large' ? 16 : 12} />
        </div>
      )}
    </div>
  );
};

Tag.displayName = 'Tag';

export default Tag;
