import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface SwitchProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 开关尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 开关值
   * @default false
   */
  value?: string | number | boolean;
  /**
   * 切换开关时触发
   */
  onChange?: (value: string | number | boolean) => void;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const { className, size = 'medium', style, value = false, onChange, ...others } = props;

  const initValue = value;
  const [curChecked, setCurChecked] = useState(value);

  const handleSwitch = () => {
    setCurChecked(!curChecked);
    onChange && onChange(!curChecked);
  };

  console.log(value);

  return (
    <button
      type="button"
      role="switch"
      className={classNames('i-switch', curChecked && 'i-switch-is-checked', className)}
      style={{ ...style }}
      onClick={handleSwitch}
      {...others}
    >
      <span className={'i-switch__handle'}>{}</span>
    </button>
  );
};

Switch.displayName = 'Switch';

export default Switch;
