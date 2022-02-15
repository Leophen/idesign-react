import React from 'react';
import './index.scss';
import classNames from 'classnames';

interface IconProps {
  /**
   * 图标颜色
   */
  color?: string;
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
   * 组件自定义样式
   */
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = (props) => {
  const { color = '#606266', name = 'UserAvatar', size = 16, style, ...others } = props;

  const iconStyles = {
    color,
    fontSize: parseInt(size.toString()),
    ...style,
  };

  return <i style={iconStyles} className={classNames('i-icon', `icon-${name}`)} {...others} />;
};

export default Icon;
