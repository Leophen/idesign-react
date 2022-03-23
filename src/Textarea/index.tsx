import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface TextareaProps {
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
   * 文本框值
   */
  value?: string | number;
  /**
   * 是否禁用文本框
   * @default false
   */
  disabled?: boolean;
  /**
   * 文本框是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 文本框状态
   */
  status?: 'success' | 'warning' | 'error';
  /**
   * 文本框底部提示
   */
  tips?: string;
  /**
   * 用户最多可以输入的字符个数
   */
  maxLength?: number;
  /**
   * 自动聚焦
   * @default false
   */
  autofocus?: boolean;
  /**
   * 是否禁用右下角高度调整模块
   * @default false
   */
  noResize?: boolean;
  /**
   * 自适应高度
   * @default false
   */
  autoSize?: boolean;
  /**
   * 最小高度
   */
  minRows?: number;
  /**
   * 最大高度
   */
  maxRows?: number;
  /**
   * 输入内容变化时触发
   */
  onChange?: (value: string | number, context?: { e?: React.FormEvent<HTMLDivElement> }) => void;
  /**
   * 输入框聚焦时触发
   */
  onFocus?: (value: string | number, context?: { e?: React.FocusEvent<HTMLInputElement> }) => void;
  /**
   * 输入框失焦时触发
   */
  onBlur?: (value: string | number, context?: { e?: React.FocusEvent<HTMLInputElement> }) => void;
}

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
    onChange,
    onFocus,
    onBlur,
    ...others
  } = props;

  const [valueLength, setValueLength] = useState(value?.toString().length || 0);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.persist();
    maxLength && setValueLength((e.target as HTMLTextAreaElement).value.length);
    onChange?.((e.target as HTMLTextAreaElement).value, e as any);
    resize()
  };

  // 高度自适应
  useEffect(() => {
    autoSize ? resize() : ''
  }, [autoSize])
  const textareaRef = useRef(null)
  const resize = () => {
    if (autoSize && textareaRef.current) {
      console.log((textareaRef.current as HTMLElement).scrollHeight);
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
        {...others}
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
          value={value}
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
