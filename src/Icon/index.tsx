import React from 'react';
import './index.scss';
import classNames from 'classnames';

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
