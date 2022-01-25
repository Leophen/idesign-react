import React from 'react';
import './index.scss';
import classNames from 'classnames';

interface IconProps {
  color?: string;
  name?: string;
  size?: number | string;
  style?: React.CSSProperties;
}

const Icon = (props: IconProps) => {
  const { color = '#606266', name = 'UserAvatar', size = 16, style, ...others } = props;

  const iconStyles = {
    color,
    fontSize: parseInt(size.toString()),
    ...style,
  };

  return (
    <i style={iconStyles} className={classNames('i-design-icon', `icon-${name}`)} {...others} />
  );
};

export default Icon;
