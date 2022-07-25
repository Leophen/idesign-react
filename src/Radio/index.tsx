import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import RadioGroup from './RadioGroup';
import { RadioContextValue, RadioProps } from './type';

export const RadioContext = React.createContext<RadioContextValue>(null as any);

// 单一单选框
const Radio: React.FC<RadioProps> & { Group: React.ElementType } = (props) => {
  // 存在单选框组时从 Context 注入 checked 覆盖原 checked
  const context = useContext(RadioContext);
  const newProps = context ? context.inject(props) : props;

  const {
    children = '',
    className,
    style,
    checked = false,
    value,
    onChange,
    ...restProps
  } = newProps;

  const type = newProps.type || props.type || 'radio';
  const size = newProps.size || props.size;
  const disabled = newProps.disabled || props.disabled || false;

  const [innerChecked, setInnerChecked] = useState(checked);

  useEffect(() => {
    setInnerChecked(checked);
  }, [checked]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const checkedValue = e.currentTarget.checked;
    // 单选框组时使用 context 提供的修改 checked 方法同步整组的 currentValue
    if (typeof newProps.onChange === 'function') {
      newProps.onChange(checkedValue, e);
    }
  };

  return (
    <label
      className={classNames(
        `i-${type}`,
        innerChecked && `i-${type}-is-checked`,
        disabled && `i-${type}-is-disabled`,
        size && `i-${type}--size-${size}`,
        className,
      )}
      style={{ ...style }}
      {...restProps}
    >
      <input
        readOnly
        type="radio"
        className={`i-${type}__former`}
        checked={innerChecked}
        disabled={disabled}
        value={value}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleCheck(e)}
      />
      <span className={`i-${type}__input`} />
      <span className={`i-${type}__label`}>{children}</span>
    </label>
  );
};

Radio.Group = RadioGroup;

Radio.displayName = 'Radio';
RadioGroup.displayName = 'RadioGroup';

export default Radio;
