import React from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import { LoadingProps } from './type';

const Loading: React.FC<LoadingProps> = (props) => {
  const {
    className,
    style,
    icon = "Loading",
    size = 36,
    color,
    info = '',
    spinner,
    ...restProps
  } = props;

  return (
    <div
      className={classNames(
        'i-loading',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      <div className="i-loading-spinner">
        {spinner ||
          <Icon
            name={icon}
            size={size}
            color={color}
          />
        }
      </div>
      <div
        className="i-loading-info"
        style={{ color }}
      >
        {info}
      </div>
    </div>
  );
};

Loading.displayName = 'Loading';

export default Loading;
