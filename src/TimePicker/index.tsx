import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import dayjs from 'dayjs';
import Popup from '../Popup';
import useDefault from '../hooks/useDefault';
import TimePanel from './TimePanel';
import TimeInput from './TimeInput';
import { EPickerCols, TimePickerProps, TimesType } from './type';

export const MERIDIEM_LIST = ['AM', 'PM'];
export const DEFAULT_STEPS = [1, 1, 1];
export const DEFAULT_FORMAT = 'HH:mm:ss';
export const timeArr = [EPickerCols.hour, EPickerCols.minute, EPickerCols.second];

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {
    className,
    style,
    value,
    defaultValue = dayjs().format(props.format || DEFAULT_FORMAT),
    trigger = "click",
    disabled = false,
    format = DEFAULT_FORMAT,
    steps = DEFAULT_STEPS,
    onChange = () => { },
    onTrigger = () => { }
  } = props;

  const getCurrentTime = (type?: string) => {
    let currentVal = new Date().getHours().toString()
    if (type === 'meridiem') {
      /H|h/.test(format) && (currentVal = innerValue.split(':')[0])
      Number(currentVal) >= 12 ? (currentVal = 'PM') : (currentVal = 'AM')
    } else {
      type === 'minute' && (currentVal = new Date().getMinutes().toString());
      type === 'second' && (currentVal = new Date().getSeconds().toString());
      (currentVal.length === 1) && (currentVal = '0' + currentVal);
    }
    return currentVal
  }

  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);

  const [timeValue, setTimeValue] = useState<any>({
    hour: '00',
    minute: '00',
    second: '00',
    meridiem: ''
  })

  const valueToObj = (val: string) => {
    const result = {
      hour: '00',
      minute: '00',
      second: '00',
      meridiem: ''
    }
    let ifMeridiem = false;
    /A/.test(format) && (ifMeridiem = true);
    const timeArr = val.split(':')
    if (!/H|h/.test(format) && timeArr.length === 2) {
      timeArr.unshift('00')
    }
    result.hour = timeArr[0];
    result.minute = timeArr[1];
    result.second = String(timeArr[2]).split(' ')[0];
    ifMeridiem && (result.meridiem = val.split(' ')[1] || getCurrentTime('meridiem'))
    return result
  }

  const objToValue = (obj: TimesType) => {
    let hourVal = `${obj.hour}:`
    let minuteVal = `${obj.minute}`
    let secondVal = `:${obj.second}`
    let meridiemVal = ``

    !/H|h/.test(format) && (hourVal = ``);
    !/s/.test(format) && (secondVal = ``);
    /A/.test(format) && (meridiemVal = ` ${timeValue.meridiem}`);

    const result = `${hourVal}${minuteVal}${secondVal}${meridiemVal}`
    return result
  }

  useEffect(() => {
    const newTimeVal = valueToObj(innerValue)
    setTimeValue({ ...newTimeVal })
  }, [innerValue])

  const updateValue = (val?: TimesType) => {
    let currentTime
    val ? (currentTime = objToValue(val)) : (currentTime = objToValue(timeValue))
    setInnerValue(currentTime)
  }

  const selectTime = (type: string, val: string) => {
    timeValue[type] = val
    updateValue()
  }

  const [popupVisible, setPopupVisible] = useState(false)
  const switchPopup = (visible: boolean) => {
    setPopupVisible(visible)
    onTrigger?.(visible)
  }

  const handleNow = () => {
    const currentTime = dayjs().format(format)
    setInnerValue(currentTime)
    onChange?.(currentTime)
  }

  const handleConfirm = () => {
    switchPopup(false)
    updateValue()
  }

  return (
    <div
      className={classNames(
        'i-time-picker',
        className
      )}
      style={{ ...style }}
    >
      <Popup
        content={
          <TimePanel
            value={timeValue}
            format={format}
            steps={steps}
            onNow={handleNow}
            onClose={switchPopup}
            onChange={selectTime}
            onConfirm={handleConfirm}
          />
        }
        placement="bottom"
        trigger={trigger}
        className="i-time-popup"
        visible={popupVisible}
        disabled={disabled}
        onTrigger={switchPopup}
      >
        <TimeInput
          value={timeValue}
          format={format}
          disabled={disabled}
          onChange={updateValue}
        />
      </Popup>
    </div>
  );
};

TimePicker.displayName = 'TimePicker';

export default TimePicker;
