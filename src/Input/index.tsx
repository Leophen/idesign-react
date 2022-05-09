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
   * @default 请输入
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
   * 输入框是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 是否隐藏数字输入框后缀按钮
   * @default false
   */
  hideNumberBtn?: boolean;
  /**
   * 是否聚焦时全选
   * @default false
   */
  selectAll?: boolean;
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
   * 输入框底部提示
   */
  tips?: string;
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
  type?: 'text' | 'password' | 'number';
  /**
   * 数字输入框滑块数值变化速率
   * @default default
   */
  speed?: 'slow' | 'default' | 'fast';
  /**
   * 数字输入框最大值
   */
  maxNumber?: number;
  /**
   * 数字输入框最小值
   */
  minNumber?: number;
  /**
   * 数字输入框保留几位小数
   * @default 0
   */
  precision?: number;
  /**
   * 数字输入框数值变化间隔
   * @default 1
   */
  step?: number;
  /**
   * 组件前置图标名
   */
  prefixIcon?: string;
  /**
   * 组件后置图标名
   */
  suffixIcon?: string;
  /**
   * 组件前置图标类名
   */
  prefixIconClass?: string;
  /**
   * 组件后置图标类名
   */
  suffixIconClass?: string;
  /**
   * 输入框值发生变化时触发
   */
  onChange?: (
    value: string,
    context?: { e?: React.ChangeEvent<HTMLInputElement> },
  ) => void;
  /**
   * 输入框聚焦时触发
   */
  onFocus?: (value: string, context?: { e?: React.FocusEvent<HTMLInputElement> }) => void;
  /**
   * 输入框失焦时触发
   */
  onBlur?: (value: string, context?: { e?: React.FocusEvent<HTMLInputElement> }) => void;
  /**
   * 键盘按下时触发
   */
  onKeyDown?: (
    value: string,
    context: { e: React.KeyboardEvent<HTMLInputElement> },
  ) => void;
  /**
   * 键盘按下回车键时触发
   */
  onEnter?: (value: string, context: { e: React.KeyboardEvent<HTMLInputElement> }) => void;
  /**
   * 释放键盘时触发
   */
  onKeyUp?: (value: string, context: { e: React.KeyboardEvent<HTMLDivElement> }) => void;
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
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
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
  const { className, children, style, prefixContent, suffixContent, clickPrefix, clickSuffix } =
    props;

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

  const handleClickWith = (location: 'pre' | 'suf', e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.stopPropagation();
    if (clickPrefix && location === 'pre') {
      clickPrefix(e as any);
      return;
    }
    if (clickSuffix && location === 'suf') {
      clickSuffix(e as any);
      return;
    }
  };

  return (
    <div
      className={classNames('i-input__group', className)}
      style={{ ...(style || {}), ...{ height: contentHeight } }}
      ref={groupNode}
    >
      {prefixContent && (
        <div
          className={classNames('i-input__group-prefix', clickPrefix && 'i-input__group-cursor')}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickWith('pre', e)}
        >
          {prefixContent}
        </div>
      )}
      {children}
      {suffixContent && (
        <div
          className={classNames('i-input__group-suffix', clickSuffix && 'i-input__group-cursor')}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickWith('suf', e)}
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
    children,
    placeholder = '请输入',
    style,
    value,
    disabled = false,
    readonly = false,
    size,
    status,
    tips,
    maxLength,
    clearable = false,
    hideNumberBtn = false,
    selectAll = false,
    type,
    speed = 'default',
    maxNumber = Number.MAX_VALUE,
    minNumber = Number.MIN_SAFE_INTEGER,
    precision = 0,
    step = 1,
    prefixIcon,
    suffixIcon,
    prefixIconClass,
    suffixIconClass,
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
    if (type === 'number' && Number(e.target.value) > maxNumber) {
      e.target.value = maxNumber.toFixed(precision).toString();
    }
    if (type === 'number' && Number(e.target.value) < minNumber) {
      e.target.value = minNumber.toFixed(precision).toString();
    }
    if (type === 'number') {
      onChange?.(Number(e.target.value).toFixed(precision), e as any);
    } else {
      onChange?.(e.target.value, e as any);
    }
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
  const handleEvent = (eventType: 'focus' | 'blur' | 'up', e: any) => {
    e.persist();
    if (eventType === 'focus') {
      onFocus?.(e.target.value, e);
      if (selectAll) {
        (inputNode.current as unknown as HTMLInputElement).select()
      }
    }
    if (eventType === 'blur') {
      if (type === 'number' && e.target.value) {
        const fixedValue = Number(e.target.value).toFixed(precision);
        e.target.value = fixedValue;
      }
      onBlur?.(e.target.value, e);
    }
    if (eventType === 'up') {
      onKeyUp?.(e.target.value, e);
      if (type === 'number') {
        // 设置最大值最小值按钮禁用状态
        const currentValue = Number((inputNode.current as any).value);
        if (currentValue === maxNumber) {
          setIfMaximum(true);
        } else {
          setIfMaximum(false);
        }
        if (currentValue === minNumber) {
          setIfLeastValue(true);
        } else {
          setIfLeastValue(false);
        }
      }
    }
  };

  const renderInput = (
    <input
      className="i-input__inner"
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      ref={inputNode}
      value={value}
      type={currentType}
      maxLength={maxLength}
      max={currentType === 'number' ? maxNumber : undefined}
      min={currentType === 'number' ? minNumber : undefined}
      step={currentType === 'number' ? step : undefined}
      onChange={handleChange}
      onFocus={(e) => handleEvent('focus', e)}
      onBlur={(e) => handleEvent('blur', e)}
      onKeyDown={handleKeyDown}
      onKeyUp={(e) => handleEvent('up', e)}
      {...others}
    />
  );

  // 最大值 | 最小值判断
  const [ifMaximum, setIfMaximum] = useState(false);
  const [ifLeastValue, setIfLeastValue] = useState(false);

  // 数字调整按钮
  const handleAdjustValue = (handle = true, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    let currentValue;
    let computedValue = 0;
    if (inputNode) {
      currentValue = Number((inputNode.current as any).value);
      if (handle) {
        computedValue = currentValue + step;
      } else {
        computedValue = currentValue - step;
      }
      // 设置最大值最小值按钮禁用状态
      computedValue === maxNumber ? setIfMaximum(true) : setIfMaximum(false);
      computedValue === minNumber ? setIfLeastValue(true) : setIfLeastValue(false);
    }
    const result = computedValue.toFixed(precision);
    (inputNode.current as any).value = result;
    onChange?.(result, e as any);
  };

  const renderNumberBtn = (
    <div className="i-input-number-button">
      <Icon
        name="ArrowCaretTop"
        disabled={ifMaximum}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleAdjustValue(true, e)}
      />
      <Icon
        name="ArrowCaretBottom"
        disabled={ifLeastValue}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleAdjustValue(false, e)}
      />
    </div>
  );

  // 数字调整滑块
  const [sliderDown, setSliderDown] = useState(false);
  const [sliderX, setSliderX] = useState(0);
  const [sliderY, setSliderY] = useState(0);
  const [sliderMovingX, setSliderMovingX] = useState(0);
  const [sliderMovingY, setSliderMovingY] = useState(0);
  let startX = 0;
  let startY = 0;
  let countValue = 0;
  let criticalValue = 0;
  const handleSliderMove = (e: any) => {
    startX += e.movementX;
    startY += e.movementY;

    // 滑块更新输入框数值
    if (inputNode) {
      countValue = Number((inputNode.current as any).value);
      criticalValue += e.movementX;
      let changeSpeedNum = { slow: 30, default: 10, fast: 1 }[speed];
      if (criticalValue > changeSpeedNum && countValue < maxNumber) {
        criticalValue = 0;
        countValue += step;
      }
      if (criticalValue < -changeSpeedNum && countValue > minNumber) {
        criticalValue = 0;
        countValue -= step;
      }
      // 设置最大值最小值按钮禁用状态
      countValue === maxNumber ? setIfMaximum(true) : setIfMaximum(false);
      countValue === minNumber ? setIfLeastValue(true) : setIfLeastValue(false);

      const result = countValue.toFixed(precision);
      (inputNode.current as any).value = result;
      onChange?.(result, e as any);
    }

    // 滑块超出屏幕边界处理
    if (e.clientX + startX < 0) {
      startX += window.innerWidth;
    }
    if (e.clientX + startX > window.innerWidth) {
      startX -= window.innerWidth;
    }
    if (e.clientY + startY < 0) {
      startY += window.innerHeight;
    }
    if (e.clientY + startY > window.innerHeight) {
      startY -= window.innerHeight;
    }

    // 更新滑块位置
    setSliderMovingX(startX);
    setSliderMovingY(startY);
  };
  const handleSliderUp = () => {
    setSliderDown(false);
    document.exitPointerLock();
    setSliderMovingX(0);
    setSliderMovingY(0);
    window.removeEventListener('mouseup', handleSliderUp);
    window.removeEventListener('mousemove', handleSliderMove);
  };
  const handleSliderDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();

    if (size && size === 'small') {
      setSliderY(e.clientY - 8);
    } else if (size && size === 'large') {
      setSliderY(e.clientY - 15);
    } else {
      setSliderY(e.clientY - 10);
    }
    setSliderX(e.clientX - 14);
    (e.target as HTMLElement).requestPointerLock();
    setSliderDown(true);
    window.addEventListener('mouseup', handleSliderUp);
    window.addEventListener('mousemove', handleSliderMove);
  };
  const renderNumberSlider = (
    <div className="i-input-number-slider" onMouseDown={handleSliderDown}>
      {sliderDown && (
        <div
          className="i-input-number-scrubbable"
          style={{
            left: sliderX,
            top: sliderY,
            transform: `translate(${sliderMovingX}px,${sliderMovingY}px)`,
          }}
        >
          <svg
            width="30"
            height="19"
            viewBox="0 0 30 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_7775_2255)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 8.999V9.004L8.997 15L8.998 11.001H10.997H21V15L27 9L21 3V7.022H10.997H8.997L8.998 3L3 8.999ZM4.411 9.002L7.998 5.414L7.997 8.001H11.497H22V5.414L25.5 9L22 12.587V10L11.497 10.002L7.998 10.001L7.997 12.587L4.411 9.002Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4971 10.0015L22 10.0005V12.5875L25.5 9L22 5.41451V8.02151H11.4971H7.99707V5.41451L4.41107 9.0015L7.99707 12.5875V10.0005L11.4971 10.0015Z"
                fill="black"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_7775_2255"
                x="-0.6"
                y="-1.6"
                width="31.2"
                height="23.2"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1.3" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0" />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_7775_2255"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_7775_2255"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );

  // 内置图标
  const handleClickInnerIcon = (location: 'pre' | 'suf', e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.stopPropagation();
    if (clickPrefixIcon && location === 'pre') {
      clickPrefixIcon(e as any);
      return;
    }
    if (clickSuffixIcon && location === 'suf') {
      clickSuffixIcon(e as any);
      return;
    }
    focusInputNode();
  };
  const renderPrefixIcon = (
    <Icon
      className={classNames('i-input-prefix-icon', clickPrefixIcon && 'i-input-icon-cursor', prefixIconClass)}
      name={prefixIcon}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickInnerIcon('pre', e)}
    />
  );
  const renderSuffixIcon = (
    <Icon
      className={classNames('i-input-suffix-icon', clickSuffixIcon && 'i-input-icon-cursor', suffixIconClass)}
      name={suffixIcon}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickInnerIcon('suf', e)}
    />
  );

  return (
    <>
      <div
        className={classNames(
          'i-input',
          disabled && 'i-input-is-disabled',
          readonly && 'i-input-is-readonly',
          size && `i-input--size-${size}`,
          status && `i-input--status-${status}`,
          currentType && `i-input--type-${currentType}`,
          className,
        )}
        style={{ ...style }}
        onClick={focusInputNode}
      >
        {prefixIcon && renderPrefixIcon}
        {children}
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
        {!disabled && type === 'number' && !hideNumberBtn && renderNumberBtn}
        {!disabled && type === 'number' && renderNumberSlider}
      </div>
      {tips && <div
        className={classNames(
          'i-input__tips',
          status && `i-input__tips--status-${status}`,
        )}
      >
        {tips}
      </div>}
    </>
  );
};

Input.displayName = 'Input';
InputGroup.displayName = 'InputGroup';

Input.Group = InputGroup;

export default Input;
