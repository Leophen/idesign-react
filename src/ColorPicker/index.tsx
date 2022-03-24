import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface ColorPickerProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const {
    children = '',
    className,
    style,
    ...others
  } = props;

  return (
    <div
      className={classNames(
        'i-template',
        className
      )}
      style={{ ...style }}
      {...others}
    >
      {children}
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
