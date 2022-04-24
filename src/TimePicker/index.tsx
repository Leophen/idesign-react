import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Popup from '../Popup';
import Input from '../Input';

export interface TimePickerProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 选中的时间值
   */
  value?: string;
  /**
   * 菜单触发方式
   * @default click
   */
  trigger?: 'hover' | 'click' | 'context-menu';
  /**
   * 是否禁用选择器
   * @default false
   */
  disabled?: boolean;
  /**
   * 选中时间变化时触发
   */
  onChange?: (value: string) => void;
}

export interface TimePickerPanelProps {
  /**
   * 下拉列表宽度
   */
  width?: number;
}

const TimePickerPanel: React.FC<TimePickerPanelProps> = (props) => {
  const {
    width
  } = props

  return (
    <div
      style={{ width: width ? width : 'auto' }}
      className="i-time-picker__panel"
    >
      <div className="i-time-picker__panel-body">
        123
      </div>
      <footer className="i-time-picker__panel-footer">
        footer
      </footer>
    </div>
  )
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {
    children = '',
    className,
    style,
    value,
    trigger = "click",
    disabled = false,
    onChange = () => { }
  } = props;

  const timePickerNode = useRef<HTMLDivElement>(null)
  const [pickerPanelWidth, setPickerPanelWidth] = useState(0)
  useEffect(() => {
    // 更新下拉宽度
    const currentWidth = timePickerNode.current?.getBoundingClientRect().width || 0
    setPickerPanelWidth(currentWidth)
  }, [])

  return (
    <div
      ref={timePickerNode}
      className={classNames(
        'i-time-picker',
        className
      )}
      style={{ ...style }}
    >
      <Popup
        content={
          <TimePickerPanel
            width={pickerPanelWidth}
          // steps={steps}
          // format={format}
          // disableTime={disableTime}
          // hideDisabledTime={hideDisabledTime}
          // isFooterDisplay={true}
          // onChange={onChange}
          // handleConfirmClick={() => setPanelShow(false)}
          // value={value}
          />
        }
        placement="bottom"
        trigger={trigger}
      // visible={popupVisible}
      // disabled={disabled}
      // onTrigger={switchPopup}
      >
        <Input
          // className={classNames(
          //   !clearable && 'i-input__hide-clear'
          // )}
          // value={getInputValue(innerValue)}
          placeholder=""
          readonly={!disabled}
          disabled={disabled}
          // size={size}
          // prefixIcon={prefixIcon}
          // prefixIconClass={prefixIconClass}
          suffixIcon="Clock"
        // suffixIconClass={dropdownShow && !suffixIcon ? "i-select-arrow__show" : suffixIconClass}
        // clearable
        // onClear={handleClear}
        >
          123
        </Input>
      </Popup>
    </div>
  );
};

TimePicker.displayName = 'TimePicker';

export default TimePicker;
