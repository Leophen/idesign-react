import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface TimePickerProps {
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

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { children = '', className, style, ...others } = props;

  return (
    <div className={classNames('i-template', className)} style={{ ...style }} {...others}>
      {children}
    </div>
  );
};

TimePicker.displayName = 'TimePicker';

export default TimePicker;
