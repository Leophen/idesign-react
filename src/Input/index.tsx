import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import useDefault from '../hooks/useDefault';
import InputGroup from './InputGroup';
import { InputProps } from './type'
import InputSlider from './inputSlider';
import ReactDOM from 'react-dom';
import { useContainer } from '../hooks/useContainer';

// 创建输入框滑块容器
const inputSliderWrapper = useContainer('i-input-slider-wrapper', document.body)

const Input: React.FC<InputProps> & { Group: React.ElementType } = (props) => {
  const {
    className,
    children,
    placeholder = '请输入',
    style,
    value,
    defaultValue = '',
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
    minNumberLock = false,
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
    onMove,
    onMoveUp,
    clickPrefixIcon,
    clickSuffixIcon,
    ...restProps
  } = props;

  // 聚焦 input 输入框
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInputNode = () => {
    inputRef.current?.focus();
  };

  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);

  const [valueLength, setValueLength] = useState(innerValue?.toString().length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    maxLength && setValueLength(e.target.value.length);
    let currentValue = e.target.value
    if (type === 'number') {
      if (currentValue !== '') {
        if (Number(currentValue) > maxNumber) {
          currentValue = maxNumber.toFixed(precision).toString();
        }
        if (Number(currentValue) < minNumber) {
          currentValue = minNumber.toFixed(precision).toString();
        }
      } else {
        if (Number(currentValue) < minNumber && minNumberLock) {
          currentValue = minNumber.toFixed(precision).toString();
        }
      }
    }
    setInnerValue(currentValue, e as any)
  };

  // 点击清空按钮
  const handleClear = (e: any) => {
    setInnerValue('', e)
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
        inputRef.current?.select()
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
        const currentValue = Number(inputRef.current?.value);
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
      ref={inputRef}
      value={innerValue}
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
      {...restProps}
    />
  );

  // 最大值 | 最小值判断
  const [ifMaximum, setIfMaximum] = useState(false);
  const [ifLeastValue, setIfLeastValue] = useState(false);

  useEffect(() => {
    if (type === 'number') {
      if (Number(innerValue) <= minNumber) {
        setIfLeastValue(true)
      }
      if (Number(innerValue) >= maxNumber) {
        setIfMaximum(true)
      }
    }
  }, [])

  // 数字调整按钮
  const handleAdjustValue = (handle = true, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    let currentValue;
    let computedValue = 0;

    if (inputRef) {
      currentValue = Number(inputRef.current?.value);
      if (handle) {
        computedValue = currentValue + step;
      } else {
        computedValue = currentValue - step;
      }
      // 设置最大值最小值按钮禁用状态
      if (computedValue >= maxNumber) {
        computedValue = maxNumber
        setIfMaximum(true)
      } else {
        setIfMaximum(false)
      }
      if (computedValue <= minNumber) {
        computedValue = minNumber
        setIfLeastValue(true)
      } else {
        setIfLeastValue(false)
      }
    }
    const result = computedValue.toFixed(precision);
    (inputRef.current as HTMLInputElement).value = result;
    setInnerValue(result, e as any)
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
  const [slider, setSlider] = useState({
    ifDown: false,
    left: 0,
    top: 0,
    translateX: 0,
    translateY: 0
  })
  let startX = 0;
  let startY = 0;
  let countValue = 0;
  let criticalValue = 0;
  const handleSliderMove = (e: any) => {
    startX += e.movementX;
    startY += e.movementY;

    // 滑块更新输入框数值
    if (inputRef) {
      countValue = Number(inputRef.current?.value);
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
      (inputRef.current as HTMLInputElement).value = result;
      setInnerValue(result, e as any)
      onMove?.(result, e as any);
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
    slider.translateX = startX
    slider.translateY = startY
    setSlider({ ...slider })
  };
  const handleSliderUp = () => {
    document.exitPointerLock();
    slider.ifDown = false
    slider.translateX = 0
    slider.translateY = 0
    setSlider({ ...slider })
    onMoveUp?.((inputRef.current as HTMLInputElement).value);
    window.removeEventListener('mouseup', handleSliderUp);
    window.removeEventListener('mousemove', handleSliderMove);
  };
  const handleSliderDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    if (size && size === 'small') {
      slider.top = e.clientY - 8;
    } else if (size && size === 'large') {
      slider.top = e.clientY - 15;
    } else {
      slider.top = e.clientY - 10;
    }
    slider.left = e.clientX - 14;
    (e.target as HTMLElement).requestPointerLock();
    slider.ifDown = true
    setSlider({ ...slider })
    window.addEventListener('mouseup', handleSliderUp);
    window.addEventListener('mousemove', handleSliderMove);
  };
  const renderNumberSlider = (
    <div className="i-input-number-slider" onMouseDown={handleSliderDown}>
      {slider.ifDown &&
        <>
          {ReactDOM.createPortal(<InputSlider
            left={slider.left}
            top={slider.top}
            translateX={slider.translateX}
            translateY={slider.translateY}
          />, inputSliderWrapper as HTMLElement)}
        </>
      }
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
        {!disabled && innerValue && (clearable || onClear) && (
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
