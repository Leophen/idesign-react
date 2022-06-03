import React from 'react';
import './index.scss';
import classNames from 'classnames';

interface IconProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 图标名称
   */
  name?: string;
  /**
   * 图标尺寸
   * @default 16
   */
  size?: number | string;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 是否禁用按钮
   */
  disabled?: boolean;
  /**
   * 点击图标触发事件
   */
  onClick?: any;
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    className,
    style,
    name = 'UserAvatar',
    size,
    color,
    disabled = false,
    onClick,
    ...restProps
  } = props;

  const iconStyles = {
    color,
    fontSize: size && parseInt(size.toString()),
    ...style,
  };

  return (
    <i
      style={iconStyles}
      className={classNames('i-icon', `icon-${name}`, disabled && 'i-icon-is-disabled', className)}
      onClick={
        !disabled
          ? onClick
          : () => {
              return;
            }
      }
      {...restProps}
    />
  );
};

export default Icon;
