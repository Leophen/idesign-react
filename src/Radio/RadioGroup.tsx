import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import { RadioContextValue, RadioGroupProps, RadioProps } from './type';

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

export default RadioGroup;
