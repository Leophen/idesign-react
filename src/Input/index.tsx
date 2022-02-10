import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export type InputValue = string | number;

export interface InputProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 输入框的值
   */
  value?: InputValue;
  /**
   * 失去焦点时触发
   */
  onBlur?: (value: InputValue, context: { e: React.FocusEvent<HTMLDivElement> }) => void;
  /**
   * 输入框值发生变化时触发
   */
  onChange?: (
    value: InputValue,
    context?: { e?: React.FormEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement> },
  ) => void;
  /**
   * 清空按钮点击时触发
   */
  onClear?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * 回车键按下时触发
   */
  onEnter?: (value: InputValue, context: { e: React.KeyboardEvent<HTMLDivElement> }) => void;
  /**
   * 获得焦点时触发
   */
  onFocus?: (value: InputValue, context: { e: React.FocusEvent<HTMLDivElement> }) => void;
  /**
   * 输入内容变化时触发
   */
  onInput?: (value: InputValue, context?: { e?: Event }) => void;
  /**
   * 键盘按下时触发
   */
  onKeydown?: (value: InputValue, context: { e: React.KeyboardEvent<HTMLDivElement> }) => void;
  /**
   * 按下字符键时触发（keydown -> keypress -> keyup）
   */
  onKeypress?: (value: InputValue, context: { e: React.KeyboardEvent<HTMLDivElement> }) => void;
  /**
   * 释放键盘时触发
   */
  onKeyup?: (value: InputValue, context: { e: React.KeyboardEvent<HTMLDivElement> }) => void;
}

const Input = (props: InputProps) => {
  const {
    className,
    placeholder,
    style,
    value = '',
    onBlur,
    onChange = () => {},
    onClear,
    onEnter,
    onFocus,
    onInput,
    onKeydown,
    onKeypress,
    onKeyup,
    ...others
  } = props;

  // const composingRef = useRef(false);
  // const [composingRefValue, setComposingValue] = useState<string>('');
  // function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.CompositionEvent<HTMLInputElement>) {
  //   const { value } = e.currentTarget;
  //   console.log(composingRef)
  //   if (composingRef.current) {
  //     setComposingValue(value);
  //   } else {
  //     onChange(value, { e });
  //   }
  // }
  const [curValue, setCurValue] = useState<string | number>(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    onChange.toString() === '() => {}' ? setCurValue(e.target.value) : onChange;
  };
  const renderInput = (
    <input
      className="i-input__inner"
      placeholder={placeholder}
      value={curValue}
      onChange={(e) => handleChange(e)}
      // {...others}
    />
  );
  return (
    <div className={classNames('i-input', className)} style={{ ...style }}>
      {renderInput}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
