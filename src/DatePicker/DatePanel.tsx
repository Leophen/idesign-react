import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import Popup from '../Popup';
import YearSelectPanel from './YearSelectPanel';
import MonthSelectPanel from './MonthSelectPanel';
import DateHeaderBtn from './DateHeaderBtn';
import { DATE_FORMAT, WEEK_HEAD_0, WEEK_HEAD_1 } from './index'
import { DatePanelProps } from './type';

dayjs.extend(isBetween)

const DatePanel: React.FC<DatePanelProps> = (props) => {
  const {
    firstDayOfWeek,
    value,
    rangeValue,
    defaultDisplayVal,
    onChange,
    onHover,
    onClose
  } = props;

  const [dateVal, setDateVal] = useState(value)
  const [displayVal, setDisplayVal] = useState(value)
  useEffect(() => {
    if (defaultDisplayVal) {
      setDisplayVal(defaultDisplayVal)
    } else {
      setDisplayVal(value)
    }
  }, [value])

  const handleSwitchDate = (mode: 'add' | 'sub', type: 'year' | 'month', step = 1) => {
    let newDateVal
    if (mode === 'add') {
      newDateVal = dayjs(displayVal).add(step, type).format(DATE_FORMAT)
    } else {
      newDateVal = dayjs(displayVal).subtract(step, type).format(DATE_FORMAT)
    }
    setDisplayVal(newDateVal)
  }

  const handleToday = () => {
    setDisplayVal(dayjs().format(DATE_FORMAT))
  }

  const [yearPanelVisible, setYearPanelVisible] = useState(false)
  const [monthPanelVisible, setMonthPanelVisible] = useState(false)

  const handleSelectYear = (val: number) => {
    const newDateVal = dayjs(displayVal).year(val).format(DATE_FORMAT)
    setDisplayVal(newDateVal)
    setYearPanelVisible(false)
  }

  const handleSelectMonth = (val: number) => {
    const newDateVal = dayjs(displayVal).month(val).format(DATE_FORMAT)
    setDisplayVal(newDateVal)
    setMonthPanelVisible(false)
  }

  const handleSelectDay = (type: string, val: string) => {
    value && type !== 'current' && setDisplayVal(val)
    value && setDateVal(val)
    onChange?.(val)
    onClose?.()
  }

  const handleEnterMonth = (val: string) => {
    onHover?.(val)
  }

  const getMonthPanelDays = () => {
    const currentMonthStart = dayjs(displayVal).startOf('month').day()
    let startIndex = 0
    // 每周第一天
    if (firstDayOfWeek === 1) {
      currentMonthStart === 0 ? (startIndex = 6) : (startIndex = currentMonthStart - 1)
    } else {
      startIndex = currentMonthStart
    }

    const panelDays = []

    const lastMonthDays = dayjs(displayVal).subtract(1, 'month').daysInMonth()
    for (let i = lastMonthDays - startIndex + 1; i < lastMonthDays + 1; i++) {
      panelDays.push({
        label: i,
        type: 'last',
        value: dayjs(displayVal).subtract(1, 'month').set('date', i).format(DATE_FORMAT)
      })
    }

    const currentMonthDays = dayjs(displayVal).daysInMonth()
    const currentDayVal = (index: number) => dayjs(displayVal).set('date', index).format(DATE_FORMAT)
    const rangeValid = rangeValue?.length === 2
    for (let i = 1; i < currentMonthDays + 1; i++) {
      panelDays.push({
        label: i,
        type: 'current',
        range: rangeValid && (dayjs(currentDayVal(i)).isBetween(dayjs(rangeValue[0]), dayjs(rangeValue[1]), "day") || currentDayVal(i) === rangeValue[0] || currentDayVal(i) === rangeValue[1]),
        rangeStart: rangeValid && currentDayVal(i) === rangeValue[0],
        rangeSame: rangeValid && rangeValue[0] === rangeValue[1],
        rangeEnd: rangeValid && currentDayVal(i) === rangeValue[1],
        value: currentDayVal(i)
      })
    }

    const remainLen = 42 - startIndex + 1 - currentMonthDays
    for (let i = 1; i < remainLen; i++) {
      panelDays.push({
        label: i,
        type: 'next',
        value: dayjs(displayVal).add(1, 'month').set('date', i).format(DATE_FORMAT)
      })
    }

    return panelDays
  }

  return (
    <div
      className="i-date-panel"
    >
      <header className="i-date-panel__header">
        <section className="i-date-panel__header-title-wrapper">
          <Popup
            visible={yearPanelVisible}
            content={
              <YearSelectPanel year={dayjs(displayVal).year()} onChange={handleSelectYear} />
            }
            trigger="click"
            onTrigger={visible => setYearPanelVisible(visible)}
          >
            <div className="i-date-panel__header-title">
              {`${dayjs(displayVal).year()}年`}
            </div>
          </Popup>
          <Popup
            visible={monthPanelVisible}
            content={
              <MonthSelectPanel month={dayjs(displayVal).month()} onChange={handleSelectMonth} />
            }
            trigger="click"
            onTrigger={visible => setMonthPanelVisible(visible)}
          >
            <div className="i-date-panel__header-title">
              {`${dayjs(displayVal).month() + 1}月`}
            </div>
          </Popup>
        </section>

        <section className="i-date-panel__header-handle">
          <DateHeaderBtn
            icon="ArrowDoubleLeft"
            disabled={false}
            onClick={() => handleSwitchDate('sub', "year")}
          />
          <DateHeaderBtn
            icon="ArrowLeft"
            disabled={false}
            onClick={() => handleSwitchDate('sub', "month")}
          />
          <div
            className="i-date-panel__header-today"
            onClick={handleToday}
          />
          <DateHeaderBtn
            icon="ArrowRight"
            disabled={false}
            onClick={() => handleSwitchDate('add', "month")}
          />
          <DateHeaderBtn
            icon="ArrowDoubleRight"
            disabled={false}
            onClick={() => handleSwitchDate('add', "year")}
          />
        </section>
      </header>

      <div className="i-date-panel__content">
        <header className="i-date-panel__week-wrapper">
          {firstDayOfWeek === 0 ?
            WEEK_HEAD_0.map(item => (
              <div className="i-date-panel__week-item" key={item}>
                {item}
              </div>
            )) :
            WEEK_HEAD_1.map(item => (
              <div className="i-date-panel__week-item" key={item}>
                {item}
              </div>
            ))}
        </header>
        <section className="i-date-panel__day-wrapper">
          {getMonthPanelDays().map(item => (
            <div
              className={classNames(
                'i-date-panel__day-item',
                item.range && 'i-date-panel__day-item__in-range',
                item.rangeStart && '-range__start',
                item.rangeSame && '-range__same',
                item.rangeEnd && '-range__end',
                item.type !== 'current' && 'i-date-panel__day-item__blur',
                (item.value === dateVal || rangeValue?.includes(item.value)) && 'i-date-panel__day-item__selected',
                item.value === dayjs().format(DATE_FORMAT) && 'i-date-panel__day-item__current'
              )}
              key={item.value}
              onClick={() => handleSelectDay(item.type, item.value)}
              onMouseEnter={() => handleEnterMonth(item.value)}
            >
              <div
                className='i-date-panel__day-item-txt'
              >
                {item.label}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default DatePanel;
