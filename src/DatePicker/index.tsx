import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import Popup from '../Popup';
import Input from '../Input';
import useDefault from '../hooks/useDefault';
import DatePanel from './DatePanel';
import DateRangePanel from './DateRangePanel';
import { DatePickerProps } from './type';

dayjs.extend(isBetween)

export const DATE_FORMAT = 'YYYY-MM-DD';
export const WEEK_HEAD_0 = ['日', '一', '二', '三', '四', '五', '六']
export const WEEK_HEAD_1 = ['一', '二', '三', '四', '五', '六', '日']

const getDefaultVal = (type: string) => {
  if (type === 'range') {
    return [dayjs().format(DATE_FORMAT), dayjs().add(1, 'month').format(DATE_FORMAT)]
  } else {
    return dayjs().format(DATE_FORMAT)
  }
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    className,
    style,
    value,
    defaultValue = getDefaultVal(props.type || 'date'),
    trigger = "click",
    disabled = false,
    type = 'date',
    rangeSeparator = '~',
    firstDayOfWeek = 1,
    onChange
  } = props;

  const [popupVisible, setPopupVisible] = useState(false)
  const switchPopup = (visible: boolean) => {
    setPopupVisible(visible)
  }

  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);

  const handleChange = (val: string) => {
    setInnerValue(val)
  }

  const handleClose = () => {
    setPopupVisible(false)
  }

  return (
    <div
      className={classNames(
        'i-date-picker',
        className
      )}
      data-type={type}
      style={{ ...style }}
    >
      <Popup
        content={
          type === 'date' ? (
            <DatePanel
              value={innerValue as string}
              firstDayOfWeek={firstDayOfWeek}
              onChange={handleChange}
              onClose={handleClose}
            />
          ) : (
            <DateRangePanel
              rangeValue={innerValue as string[]}
              firstDayOfWeek={firstDayOfWeek}
              onChange={handleChange}
              onClose={handleClose}
            />
          )
        }
        placement="bottom"
        trigger={trigger}
        className="i-date-popup"
        visible={popupVisible}
        disabled={disabled}
        onTrigger={switchPopup}
      >
        <Input
          readonly
          disabled={disabled}
          value={!_.isArray(innerValue) ? innerValue : `${innerValue[0]} ${rangeSeparator} ${innerValue[1]}`}
          placeholder="请选择日期"
          suffixIcon="Calendar"
        />
      </Popup>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
