import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';

export interface SwitchProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 开关尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 开关关闭时的颜色
   */
  inactiveColor?: string;
  /**
   * 开关打开时的颜色
   */
  activeColor?: string;
  /**
   * 开关关闭时的标签
   */
  inactiveLabel?: React.ReactNode;
  /**
   * 开关打开时的标签
   */
  activeLabel?: React.ReactNode;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否为加载状态
   * @default false
   */
  loading?: boolean;
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
  const {
    className,
    style,
    size = 'medium',
    disabled = false,
    loading = false,
    inactiveColor,
    activeColor,
    inactiveLabel,
    activeLabel,
    value = false,
    onChange,
    ...others
  } = props;

  const [innerChecked, setInnerChecked] = useState(value);

  useEffect(() => {
    setInnerChecked(value);
  }, [value]);

  const handleSwitch = () => {
    if (disabled || loading) return;
    const changedValue = !innerChecked;
    onChange?.(changedValue);
  };

  const renderContent = (value: string | number | boolean) => {
    if (!!value && activeLabel) {
      return activeLabel;
    }
    if (!value && inactiveLabel) {
      return inactiveLabel;
    }
    return null;
  };

  return (
    <button
      type="button"
      role="switch"
      disabled={disabled}
      className={classNames(
        'i-switch',
        innerChecked && 'i-switch-is-checked',
        (disabled || loading) && 'i-switch-is-disabled',
        size === 'small' && 'i-switch--size-small',
        size === 'large' && 'i-switch--size-large',
        className,
      )}
      style={{
        ...(style || {}),
        ...({
          backgroundColor: innerChecked ? activeColor : inactiveColor,
        } || {}),
      }}
      onClick={handleSwitch}
      {...others}
    >
      <span className={'i-switch__handle'}>
        {loading && <Icon name="Loading" size={{ small: 12, medium: 16, large: 20 }[size]} />}
      </span>
      {renderContent(innerChecked) && (
        <div className="i-switch__content">{renderContent(innerChecked)}</div>
      )}
    </button>
  );
};

Switch.displayName = 'Switch';

export default Switch;
