import React from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';

export interface LoadingProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 加载图标
   * @default Loading
   */
  icon?: string;
  /**
   * 加载图标大小
   * @default 36
   */
  size?: number;
  /**
   * 加载图标颜色
   * @default #A3C8FB
   */
  color?: string;
  /**
   * 旋转提示内容
   */
  info?: React.ReactNode;
  /**
   * 旋转内容
   */
  spinner?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const {
    className,
    style,
    icon = "Loading",
    size = 36,
    color = "#A3C8FB",
    info = '',
    spinner,
    ...others
  } = props;

  return (
    <div
      className={classNames(
        'i-loading',
        className
      )}
      style={{ ...style }}
      {...others}
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
