import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import CheckboxGroup, { CheckboxContext } from './CheckboxGroup';
import { CheckboxProps } from './type';

// 单一多选框
const Checkbox: React.FC<CheckboxProps> & { Group: React.ElementType } = (props) => {
  // 存在多选框组时从 Context 注入 checked 覆盖原 checked
  const context = useContext(CheckboxContext);
  const newProps = context ? context.inject(props) : props;

  const { children = '', className, style, checked = false, value, onChange, ...restProps } = newProps;

  const size = newProps.size || props.size;
  const disabled = newProps.disabled || props.disabled || false;

  const [innerChecked, setInnerChecked] = useState(checked);

  useEffect(() => {
    setInnerChecked(checked);
  }, [checked]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const checkedValue = e.currentTarget.checked;
    // 多选框组时使用 context 提供的修改 checked 方法同步整组的 currentValue
    if (typeof newProps.onChange === 'function') {
      newProps.onChange(checkedValue, e);
    }
  };

  return (
    <label
      className={classNames(
        'i-checkbox',
        innerChecked && 'i-checkbox-is-checked',
        disabled && 'i-checkbox-is-disabled',
        size && `i-checkbox--size-${size}`,
        className,
      )}
      style={{ ...style }}
      {...restProps}
    >
      <input
        readOnly
        type="checkbox"
        className={'i-checkbox__former'}
        checked={innerChecked}
        disabled={disabled}
        value={value}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleCheck(e)}
      />
      <span className={'i-checkbox__input'} />
      <span className={'i-checkbox__label'}>{children}</span>
    </label>
  );
};

Checkbox.Group = CheckboxGroup;

Checkbox.displayName = 'Checkbox';
CheckboxGroup.displayName = 'CheckboxGroup';

export default Checkbox;
