import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';

export interface InputProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 输入框的值
   */
  value?: string | number;
  /**
   * 是否禁用输入框
   * @default false
   */
  disabled?: boolean;
  /**
   * 输入框尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 输入框状态
   */
  status?: 'success' | 'warning' | 'error';
  /**
   * 用户最多可以输入的字符个数
   */
  maxLength?: number;
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 输入框类型
   * @default text
   */
  type?: 'text' | 'password';
  /**
   * 组件前置图标名
   */
  prefixIcon?: string;
  /**
   * 组件后置图标名
   */
  suffixIcon?: string;
  /**
   * 输入框值发生变化时触发
   */
  onChange?: (
    value: string | number,
    context?: { e?: React.ChangeEvent<HTMLInputElement> },
  ) => void;
  /**
   * 输入框聚焦时触发
   */
  onFocus?: (value: string | number, context?: { e?: React.FocusEvent<HTMLInputElement> }) => void;
  /**
   * 输入框失焦时触发
   */
  onBlur?: (value: string | number, context?: { e?: React.FocusEvent<HTMLInputElement> }) => void;
  /**
   * 键盘按下时触发
   */
  onKeyDown?: (
    value: string | number,
    context: { e: React.KeyboardEvent<HTMLInputElement> },
  ) => void;
  /**
   * 键盘按下回车键时触发
   */
  onEnter?: (value: string | number, context: { e: React.KeyboardEvent<HTMLInputElement> }) => void;
  /**
   * 释放键盘时触发
   */
  onKeyUp?: (value: string | number, context: { e: React.KeyboardEvent<HTMLDivElement> }) => void;
  /**
   * 清空按钮点击时触发
   */
  onClear?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * 点击前置图标触发事件
   */
  clickPrefixIcon?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * 点击后置图标触发事件
   */
  clickSuffixIcon?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
}

export interface InputGroupProps {
  /**
   * 输入框组合内容
   */
  children?: React.ReactNode;
  /**
   * 输入框组合前缀
   */
  prefixContent?: React.ReactNode;
  /**
   * 输入框组合后缀
   */
  suffixContent?: React.ReactNode;
  /**
   * 点击前缀触发事件
   */
  clickPrefix?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
  /**
   * 点击后缀触发事件
   */
  clickSuffix?: (context: { e: React.MouseEvent<HTMLDivElement> }) => void;
}

const InputGroup: React.FC<InputGroupProps> = (props) => {
  const { children, prefixContent, suffixContent, clickPrefix, clickSuffix } = props;

  const [contentHeight, setContentHeight] = useState(0);
  const groupNode = useRef(null);

  useEffect(() => {
    let maxHeight = 0;
    const groupChild = groupNode.current && (groupNode.current as HTMLElement).childNodes;
    groupChild &&
      Array.from(groupChild).map((item: any) => {
        if (
          item.className !== 'i-input__group-prefix' &&
          item.className !== 'i-input__group-suffix' &&
          item.offsetHeight > maxHeight
        ) {
          maxHeight = item.offsetHeight;
        }
      });
    setContentHeight(maxHeight);
  });

  const handleClickWith = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.stopPropagation();
    if (clickPrefix) {
      clickPrefix(e as any);
      return;
    }
    if (clickSuffix) {
      clickSuffix(e as any);
      return;
    }
  };

  return (
    <div className="i-input__group" style={{ height: contentHeight }} ref={groupNode}>
      {prefixContent && (
        <div
          className={classNames('i-input__group-prefix', clickPrefix && 'i-input__group-cursor')}
          onClick={handleClickWith}
        >
          {prefixContent}
        </div>
      )}
      {children}
      {suffixContent && (
        <div
          className={classNames('i-input__group-suffix', clickSuffix && 'i-input__group-cursor')}
          onClick={handleClickWith}
        >
          {suffixContent}
        </div>
      )}
    </div>
  );
};

const Input: React.FC<InputProps> & { Group: React.ElementType } = (props) => {
  const {
    className,
    placeholder = '请输入',
    style,
    value,
    disabled = false,
    size,
    status,
    maxLength,
    clearable = false,
    type,
    prefixIcon,
    suffixIcon,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onEnter,
    onKeyUp,
    onClear,
    clickPrefixIcon,
    clickSuffixIcon,
    ...others
  } = props;

  // 聚焦 input 输入框
  const inputNode = useRef(null);
  const focusInputNode = () => {
    (inputNode.current as any).focus();
  };

  const [valueLength, setValueLength] = useState(value?.toString().length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    maxLength && setValueLength(e.target.value.length);
    onChange?.(e.target.value, e as any);
  };

  // 点击清空按钮
  const handleClear = (e: any) => {
    onChange?.('', e);
    onClear?.(e);
  };

  const [currentType, setCurrentType] = useState(type);
  // 密码类型切换
  const handleSwitchPassword = (e: any) => {
    e.stopPropagation();
    currentType !== 'password' ? setCurrentType('password') : setCurrentType('text');
  };

  // 键盘事件
  const handleKeyDown = (e: any) => {
    e.persist();
    e.key === 'Enter' && onEnter?.(e.target.value, e);
    onKeyDown?.(e.target.value, e);
  };

  // 通用事件
  const handleEvent = (e: any) => {
    e.persist();
    onFocus?.(e.target.value, e);
    onBlur?.(e.target.value, e);
    onKeyUp?.(e.target.value, e);
  };

  const renderInput = (
    <input
      className="i-input__inner"
      placeholder={placeholder}
      disabled={disabled}
      ref={inputNode}
      value={value}
      type={currentType}
      maxLength={maxLength}
      onChange={handleChange}
      onFocus={onFocus && handleEvent}
      onBlur={onBlur && handleEvent}
      onKeyDown={handleKeyDown}
      onKeyUp={onKeyUp && handleEvent}
      {...others}
    />
  );

  const handleClickInnerIcon = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.stopPropagation();
    if (clickPrefixIcon) {
      clickPrefixIcon(e as any);
      return;
    }
    if (clickSuffixIcon) {
      clickSuffixIcon(e as any);
      return;
    }
    focusInputNode();
  };

  const renderPrefixIcon = (
    <Icon
      className={classNames('i-input-prefix-icon', clickPrefixIcon && 'i-input-icon-cursor')}
      name={prefixIcon}
      onClick={handleClickInnerIcon}
    />
  );

  const renderSuffixIcon = (
    <Icon
      className={classNames('i-input-suffix-icon', clickSuffixIcon && 'i-input-icon-cursor')}
      name={suffixIcon}
      onClick={handleClickInnerIcon}
    />
  );

  return (
    <div
      className={classNames(
        'i-input',
        disabled && 'i-input-is-disabled',
        size && `i-input--size-${size}`,
        status && `i-input--status-${status}`,
        currentType && `i-input--type-${currentType}`,
        className,
      )}
      style={{ ...style }}
      onClick={focusInputNode}
    >
      {prefixIcon && renderPrefixIcon}
      {renderInput}
      {maxLength && (
        <div className="i-input--limit">
          <span className="i-input--limit-count">
            {valueLength < maxLength ? valueLength : maxLength} / {maxLength}
          </span>
        </div>
      )}
      {!disabled && value && (clearable || onClear) && (
        <Icon name="TipCloseFill" onClick={handleClear} />
      )}
      {!disabled && type === 'password' && (
        <Icon
          name={currentType === 'password' ? 'ViewHide' : 'View'}
          onClick={handleSwitchPassword}
        />
      )}
      {suffixIcon && renderSuffixIcon}
    </div>
  );
};

Input.displayName = 'Input';
InputGroup.displayName = 'InputGroup';

Input.Group = InputGroup;

export default Input;
