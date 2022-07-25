import React, { useState, useRef } from 'react';
import './index.scss';
import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import DatePanel from './DatePanel';
import { DATE_FORMAT } from './index'
import { DatePanelRangeProps } from './type';

dayjs.extend(isBetween)

const DateRangePanel: React.FC<DatePanelRangeProps> = (props) => {
  const {
    rangeValue = [dayjs().format(DATE_FORMAT), dayjs().add(1, 'month').format(DATE_FORMAT)],
    firstDayOfWeek,
    onChange,
    onClose
  } = props;

  const [innerRangeValue, setInnerRangeValue] = useState(rangeValue)
  const [rangeLock, setRangeLock] = useState(true)

  const handleSelect = (val: string) => {
    if (rangeLock) {
      // 滑选未解锁 -> 解锁
      if (innerRangeValue.length === 2) {
        hoverStartVal.current = val
        const newRangeValue = [val, val]
        setInnerRangeValue([...newRangeValue])
        setRangeLock(false)
      }
    } else {
      // 滑选已解锁 -> 锁定
      onChange?.(innerRangeValue)
      onClose?.()
      setRangeLock(true)
    }
  }

  const valToNum = (val: string) => Number(val.replaceAll('-', ''))

  const hoverStartVal = useRef('')
  const handleHover = (val: string) => {
    if (!rangeLock) {
      let newRangeValue = innerRangeValue
      if (valToNum(val) > valToNum(hoverStartVal.current)) {
        newRangeValue[0] = hoverStartVal.current
        newRangeValue[1] = val
      } else if (valToNum(val) === valToNum(hoverStartVal.current)) {
        newRangeValue[0] = val
        newRangeValue[1] = val
      } else {
        newRangeValue[0] = val
        newRangeValue[1] = hoverStartVal.current
      }
      setInnerRangeValue([...newRangeValue])
    }
  }

  return (
    <div
      className="i-date-panel__range"
    >
      <DatePanel
        firstDayOfWeek={firstDayOfWeek}
        rangeValue={innerRangeValue}
        defaultDisplayVal={innerRangeValue[0]}
        onChange={handleSelect}
        onHover={handleHover}
      />
      <DatePanel
        firstDayOfWeek={firstDayOfWeek}
        rangeValue={innerRangeValue}
        defaultDisplayVal={innerRangeValue[1]}
        onChange={handleSelect}
        onHover={handleHover}
      />
    </div>
  )
}

export default DateRangePanel;
