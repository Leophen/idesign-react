import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface RadioGroupProps {
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
  /**
   * 单选框组选中的值
   */
  currentValue?: string | number;
  /**
   * 单选框组全局类型
   * @default radio
   */
  type?: 'radio' | 'radio-button';
  /**
   * 按钮单选框全局尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 单选框组是否全局禁用
   */
  disabled?: boolean;
  /**
   * 选中某一项时触发
   */
  onChange?: (value: string | number, context: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioProps {
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
  /**
   * 单选框类型
   * @default radio
   */
  type?: 'radio' | 'radio-button';
  /**
   * 按钮单选框尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 单选框的值
   */
  value?: string | number;
  /**
   * 值变化时触发
   */
  onChange?: (checked: boolean, context: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioContextValue {
  inject: (props: RadioProps) => RadioProps;
}

export const RadioContext = React.createContext<RadioContextValue>(null as any);

// 单选框组
const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    children = '',
    className,
    style,
    currentValue,
    type = 'radio',
    size,
    disabled,
    onChange,
  } = props;

  const [groupValue, setGroupValue] = useState(currentValue);

  useEffect(() => {
    setGroupValue(currentValue);
  }, [currentValue]);

  // 注入每一项单选框的 context
  const context: RadioContextValue = {
    // 将单选框组的 props 注入单项单选框的方法
    inject: (singleRadioProps: RadioProps) => {
      // 拿到单项单选框的 value，方便与单选框组的 groupValue 做比较
      const singleRadioValue = singleRadioProps.value;
      return {
        ...singleRadioProps,
        type,
        size,
        disabled,
        checked: groupValue === singleRadioValue,
        onChange(checked, e) {
          e.persist();
          // 触发单项单选框传入的 onChange
          if (typeof singleRadioProps.onChange === 'function') {
            singleRadioProps.onChange(checked, e);
          }
          // 触发单选框组传入的 onChange
          singleRadioValue && onChange?.(singleRadioValue, e);
          // 设置单选框组的 currentValue
          setGroupValue(singleRadioValue);
        },
      };
    },
  };

  return (
    <RadioContext.Provider value={context}>
      <div className={classNames('i-radio-group', className)} style={{ ...style }}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

// 单一单选框
const Radio: React.FC<RadioProps> & { Group: React.ElementType } = (props) => {
  // 存在单选框组时从 Context 注入 checked 覆盖原 checked
  const context = useContext(RadioContext);
  const newProps = context ? context.inject(props) : props;

  const { children = '', className, style, checked = false, value, onChange, ...others } = newProps;

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
      {...others}
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
