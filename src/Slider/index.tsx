import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface SliderProps {
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const Slider = (props: SliderProps) => {
  const { children = '', className, style, ...others } = props;

  return (
    <div className={classNames('i-template', className)} style={{ ...style }} {...others}>
      {children}
    </div>
  );
};

Slider.displayName = 'Slider';

export default Slider;
