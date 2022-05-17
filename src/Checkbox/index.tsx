import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface CheckboxGroupProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 多选框组选中的值
   */
  currentValue?: Array<string | number> | string | number;
  /**
   * 按钮多选框全局尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 多选框组是否全局禁用
   */
  disabled?: boolean;
  /**
   * 选中某一项时触发
   */
  onChange?: (
    value: Array<string | number> | string | number,
    context: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export interface CheckboxProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 按钮多选框尺寸
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
   * 多选框的值
   */
  value?: string | number;
  /**
   * 值变化时触发
   */
  onChange?: (checked: boolean, context: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxContextValue {
  inject: (props: CheckboxProps) => CheckboxProps;
}

export const CheckboxContext = React.createContext<CheckboxContextValue>(null as any);

// 多选框组
const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const { children = '', className, style, currentValue, size, disabled, onChange } = props;

  const [groupValue, setGroupValue] = useState(currentValue);
  let groupCheckedArr: Set<any> = new Set([].concat(groupValue as any));

  useEffect(() => {
    setGroupValue(currentValue);
    groupCheckedArr = new Set([].concat(groupValue as any));
  }, [currentValue]);

  // 注入每一项多选框的 context
  const context: CheckboxContextValue = {
    // 将多选框组的 props 注入单项多选框的方法
    inject: (singleCheckboxProps: CheckboxProps) => {
      // 拿到单项多选框的 value，方便与多选框组的 groupValue 做比较
      const singleCheckboxValue = singleCheckboxProps.value;
      return {
        ...singleCheckboxProps,
        size,
        disabled,
        checked: groupCheckedArr.has(singleCheckboxValue),
        onChange(checked, e) {
          e.persist();
          // 触发单项多选框传入的 onChange
          if (typeof singleCheckboxProps.onChange === 'function') {
            singleCheckboxProps.onChange(checked, e);
          }
          // 设置多选框组的 groupCheckedArr
          if (checked) {
            groupCheckedArr.add(singleCheckboxValue);
          } else {
            groupCheckedArr.delete(singleCheckboxValue);
          }
          // 触发多选框组传入的 onChange
          onChange?.(Array.from(groupCheckedArr) as any, e);
        },
      };
    },
  };

  return (
    <CheckboxContext.Provider value={context}>
      <div className={classNames('i-checkbox-group', className)} style={{ ...style }}>
        {children}
      </div>
    </CheckboxContext.Provider>
  );
};

// 单一多选框
const Checkbox: React.FC<CheckboxProps> & { Group: React.ElementType } = (props) => {
  // 存在多选框组时从 Context 注入 checked 覆盖原 checked
  const context = useContext(CheckboxContext);
  const newProps = context ? context.inject(props) : props;

  const { children = '', className, style, checked = false, value, onChange, ...others } = newProps;

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
      {...others}
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
