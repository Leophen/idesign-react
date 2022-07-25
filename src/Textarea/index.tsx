import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import { TextareaProps } from './type';

const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    className,
    style,
    placeholder = "请输入",
    disabled = false,
    readonly = false,
    status,
    tips,
    maxLength,
    autofocus = false,
    autoSize = false,
    noResize = false,
    minRows,
    maxRows,
    value,
    defaultValue = '',
    onChange,
    onFocus,
    onBlur,
    ...restProps
  } = props;

  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);

  const [valueLength, setValueLength] = useState(innerValue?.toString().length || 0);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.persist();
    maxLength && setValueLength((e.target as HTMLTextAreaElement).value.length);
    setInnerValue((e.target as HTMLTextAreaElement).value, e as any)
    resize()
  };

  // 高度自适应
  useEffect(() => {
    autoSize ? resize() : ''
  }, [autoSize])
  const textareaRef = useRef(null)
  const resize = () => {
    if (autoSize && textareaRef.current) {
      // 如果字数减少，重设高度
      (textareaRef.current as HTMLElement).style.height = 'auto';
      // 如果高度不够，重新设置
      if ((textareaRef.current as HTMLElement).scrollHeight >= (textareaRef.current as HTMLElement).offsetHeight) {
        let val;
        (textareaRef.current as HTMLElement).scrollHeight > 32 ? val = (textareaRef.current as HTMLElement).scrollHeight - 10 : val = (textareaRef.current as HTMLElement).scrollHeight;
        (textareaRef.current as HTMLElement).style.height = val + 'px'
      }
    }
  }

  // 通用事件
  const handleEvent = (eventType: 'focus' | 'blur', e: any) => {
    e.persist();
    if (eventType === 'focus') {
      onFocus?.(e.target.value, e);
    }
    if (eventType === 'blur') {
      onBlur?.(e.target.value, e);
    }
  };

  return (
    <>
      <div
        className={classNames(
          'i-textarea',
          className
        )}
        style={{ ...style }}
        {...restProps}
      >
        <textarea
          className={classNames(
            'i-textarea__inner',
            disabled && 'i-textarea__inner-is-disabled',
            readonly && 'i-textarea__inner-is-readonly',
            status && `i-textarea__inner--status-${status}`,
          )}
          style={{
            minHeight: autoSize ? minRows && (22 * minRows) || 22 : minRows && (22 * minRows),
            maxHeight: maxRows && (22 * maxRows),
            resize: noResize ? 'none' : undefined
          }}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          ref={textareaRef}
          rows={autoSize ? 1 : undefined}
          maxLength={maxLength}
          autoFocus={autofocus}
          value={innerValue}
          onChange={handleChange}
          onFocus={(e) => handleEvent('focus', e)}
          onBlur={(e) => handleEvent('blur', e)}
        ></textarea>
        {maxLength && (
          <div className="i-textarea--limit">
            <span className="i-textarea--limit-count">
              {valueLength < maxLength ? valueLength : maxLength} / {maxLength}
            </span>
          </div>
        )}
      </div>
      {tips && <div
        className={classNames(
          'i-textarea__tips',
          status && `i-textarea__tips--status-${status}`,
        )}
      >
        {tips}
      </div>}
    </>
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
