import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import { RadioContextValue, RadioGroupProps, RadioProps } from './type';
import useDefault from '../hooks/useDefault';

export const RadioContext = React.createContext<RadioContextValue>(null as any);

// 单选框组
const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const initSelectedValue = () => {
    let result = props.defaultSelected
    if (!result) {
      React.Children.map(props.children, (child: any, index) => {
        index === 0 && (result = child?.props.value)
      })
    }
    return result
  }
  initSelectedValue()
  const {
    children = '',
    className,
    style,
    selected,
    defaultSelected = initSelectedValue(),
    type = 'radio',
    size,
    disabled,
    onChange,
  } = props;

  // const [groupValue, setGroupValue] = useState(selected);
  const [groupValue, setGroupValue] = useDefault(selected, defaultSelected, onChange);

  // 注入每一项单选框的 context
  const context: RadioContextValue = {
    // 将单选框组的 props 注入单项单选框的方法
    inject: (itemProps: RadioProps) => {
      // 拿到单项单选框的 value，方便与单选框组的 groupValue 做比较
      const itemVal = itemProps.value;
      return {
        ...itemProps,
        type,
        size,
        disabled,
        checked: groupValue === itemVal,
        onChange(checked, e) {
          e.persist();
          // 触发单选框组传入的 onChange
          itemVal && setGroupValue(itemVal, e)
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
