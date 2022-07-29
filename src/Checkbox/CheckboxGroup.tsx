import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import { CheckboxContextValue, CheckboxGroupProps, CheckboxProps } from './type';

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
    inject: (itemProps: CheckboxProps) => {
      // 拿到单项多选框的 value，方便与多选框组的 groupValue 做比较
      const itemVal = itemProps.value;
      return {
        ...itemProps,
        size,
        disabled,
        checked: groupCheckedArr.has(itemVal),
        onChange(checked, e) {
          e.persist();
          // 触发单项多选框传入的 onChange
          if (typeof itemProps.onChange === 'function') {
            itemProps.onChange(checked, e);
          }
          // 设置多选框组的 groupCheckedArr
          if (checked) {
            groupCheckedArr.add(itemVal);
          } else {
            groupCheckedArr.delete(itemVal);
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

export default CheckboxGroup;
