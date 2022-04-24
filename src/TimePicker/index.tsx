import React from 'react';
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
   * 选中时间变化时触发
   */
  onChange?: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {
    children = '',
    className,
    style,
    value,
    onChange = () => { }
  } = props;

  return (
    <div
      className={classNames(
        'i-time-picker',
        className
      )}
      style={{ ...style }}
    >
      <Popup
        content="123"
      // content={DropdownContent}
      // placement={placement}
      // trigger={trigger}
      // visible={popupVisible}
      // disabled={disabled}
      // onTrigger={switchPopup}
      >
        <Input
        // className={classNames(
        //   !clearable && 'i-input__hide-clear'
        // )}
        // value={getInputValue(innerValue)}
        // placeholder={placeholder}
        // readonly={!disabled}
        // disabled={disabled}
        // size={size}
        // prefixIcon={prefixIcon}
        // prefixIconClass={prefixIconClass}
        // suffixIcon={suffixIcon ? suffixIcon : "ArrowDown"}
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
