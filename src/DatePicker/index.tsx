import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import dayjs from 'dayjs';
import Popup from '../Popup';
import Input from '../Input';
import Icon from '../Icon';
import Button from '../Button';
import useDefault from '../hooks/useDefault';

export interface DatePickerProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 选中值
   */
  value?: string;
  /**
   * 默认选中值，非受控属性
   */
  defaultValue?: string;
  /**
   * 触发方式
   * @default click
   */
  trigger?: 'hover' | 'click' | 'context-menu';
  /**
   * 是否禁用选择器
   * @default false
   */
  disabled?: boolean;
  /**
   * 日期选择器类型
   * @default date
   */
  type?: 'date' | 'range';
  /**
   * 占位符
   * @default date
   */
  placeholder?: 'date' | 'range';
  /**
   * 范围日期分隔符
   * @default -
   */
  rangeSeparator?: string;
  /**
   * 每周的第一天，0 为周日，1 为周一
   * @default 1
   */
  firstDayOfWeek?: 0 | 1;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: string) => void;
}

export interface DatePanelProps {
  value: string;
  firstDayOfWeek: number;
  onChange: Function;
}

export interface YearSelectPanelProps {
  year: number;
  onChange: Function;
}

export const DATE_FORMAT = 'YYYY-MM-DD';
export const WEEK_HEAD_0 = ['日', '一', '二', '三', '四', '五', '六']
export const WEEK_HEAD_1 = ['一', '二', '三', '四', '五', '六', '日']

const YearSelectPanel: React.FC<YearSelectPanelProps> = (props) => {
  const {
    year = 2022,
    onChange
  } = props

  const [innerYear, setInnerYear] = useState(year)

  useEffect(() => {
    setInnerYear(year)
  }, [year])

  const [yearList, setYearList] = useState([2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029])

  const yearToRangeList = (curYear: number) => {
    const year = String(curYear)
    const startNum = Number(`${year.substring(0, 3)}0`)
    const endNum = Number(`${Number(year.substring(0, 3)) + 1}0`)
    const list = _.range(startNum, endNum)
    setYearList(list)
  }

  useEffect(() => {
    yearToRangeList(year)
  }, [])

  const handleLastTenYears = (e: React.MouseEvent) => {
    e.stopPropagation()
    const subTenYear = yearList[0] - 10
    yearToRangeList(subTenYear)
  }

  const handleNextTenYears = (e: React.MouseEvent) => {
    e.stopPropagation()
    const subTenYear = yearList[0] + 10
    yearToRangeList(subTenYear)
  }

  const handleClickItem = (e: React.MouseEvent, item: number) => {
    e.stopPropagation()
    onChange?.(item)
  }

  return (
    <div className="i-date__year-select-panel" onClick={(e) => e.stopPropagation()}>
      <header className="i-date__year-select-title">
        <div className="i-date-panel__header-icon" onClick={handleLastTenYears}>
          <Icon name="ArrowDoubleLeft" />
        </div>
        <div className="i-date-panel__header-title">
          {yearList[0]} - {yearList[yearList.length - 1]}
        </div>
        <div className="i-date-panel__header-icon" onClick={handleNextTenYears}>
          <Icon name="ArrowDoubleRight" />
        </div>
      </header>
      <section className="i-date__year-select-list">
        {yearList.map(item => (
          <div
            className={classNames(
              'i-date__year-select-item',
              innerYear === item && 'i-date__year-select-item__selected',
              new Date().getFullYear() === item && 'i-date__year-select-item__current'
            )}
            key={item}
            onClick={(e) => handleClickItem(e, item)}
          >
            {item}
          </div>
        ))}
      </section>
    </div>
  )
}

const DatePanel: React.FC<DatePanelProps> = (props) => {
  const {
    value,
    firstDayOfWeek,
    onChange
  } = props;

  const [dateVal, setDateVal] = useState(value)
  const [datePanelVal, setDatePanelVal] = useState(value)
  useEffect(() => {
    setDatePanelVal(value)
  }, [value])

  const handleSwitchDate = (mode: 'add' | 'sub', type: 'year' | 'month', step = 1) => {
    let newDateVal
    if (mode === 'add') {
      newDateVal = dayjs(datePanelVal).add(step, type).format(DATE_FORMAT)
    } else {
      newDateVal = dayjs(datePanelVal).subtract(step, type).format(DATE_FORMAT)
    }
    setDatePanelVal(newDateVal)
  }

  const [yearPanelVisible, setYearPanelVisible] = useState(false)

  const handleSelectYear = (val: number) => {
    const newDateVal = dayjs(datePanelVal).year(val).format(DATE_FORMAT)
    setDatePanelVal(newDateVal)
    setYearPanelVisible(false)
  }

  const handleSelectMonth = (type: string, val: string) => {
    type !== 'current' && setDatePanelVal(val)
    setDateVal(val)
    onChange?.(val)
  }

  const getMonthPanelDays = () => {
    const currentMonthStart = dayjs(datePanelVal).startOf('month').day()
    let startIndex = 0
    // 每周第一天
    if (firstDayOfWeek === 1) {
      currentMonthStart === 0 ? (startIndex = 6) : (startIndex = currentMonthStart - 1)
    } else {
      startIndex = currentMonthStart
    }

    const panelDays = []

    const lastMonthDays = dayjs(datePanelVal).subtract(1, 'month').daysInMonth()
    for (let i = lastMonthDays - startIndex + 1; i < lastMonthDays + 1; i++) {
      panelDays.push({
        label: i,
        type: 'last',
        value: dayjs(datePanelVal).subtract(1, 'month').set('date', i).format(DATE_FORMAT)
      })
    }

    const currentMonthDays = dayjs(datePanelVal).daysInMonth()
    for (let i = 1; i < currentMonthDays + 1; i++) {
      panelDays.push({
        label: i,
        type: 'current',
        value: dayjs(datePanelVal).set('date', i).format(DATE_FORMAT)
      })
    }

    const remainLen = 42 - startIndex + 1 - currentMonthDays
    for (let i = 1; i < remainLen; i++) {
      panelDays.push({
        label: i,
        type: 'next',
        value: dayjs(datePanelVal).add(1, 'month').set('date', i).format(DATE_FORMAT)
      })
    }

    return panelDays
  }

  return (
    <div
      className="i-date-panel"
    >
      <header className="i-date-panel__header">
        <section className="i-date-panel__header-handle">
          <div className="i-date-panel__header-icon" onClick={() => handleSwitchDate('sub', "year")}>
            <Icon name="ArrowDoubleLeft" />
          </div>
          <div className="i-date-panel__header-icon" onClick={() => handleSwitchDate('sub', "month")}>
            <Icon name="ArrowLeft" />
          </div>
        </section>

        <section className="i-date-panel__header-title-wrapper">
          <Popup
            visible={yearPanelVisible}
            content={
              <YearSelectPanel year={dayjs(datePanelVal).year()} onChange={handleSelectYear} />
            }
            trigger="click"
            onTrigger={visible => setYearPanelVisible(visible)}
          >
            <div className="i-date-panel__header-title">
              {`${dayjs(datePanelVal).year()}年`}
            </div>
          </Popup>
          <div className="i-date-panel__header-title">
            {`${dayjs(datePanelVal).month() + 1}月`}
          </div>
        </section>

        <section className="i-date-panel__header-handle">
          <div className="i-date-panel__header-icon" onClick={() => handleSwitchDate('add', "month")}>
            <Icon name="ArrowRight" />
          </div>
          <div className="i-date-panel__header-icon" onClick={() => handleSwitchDate('add', "year")}>
            <Icon name="ArrowDoubleRight" />
          </div>
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
          {getMonthPanelDays().map((item, index) => (
            <div
              className={classNames(
                'i-date-panel__day-item',
                item.type !== 'current' && 'i-date-panel__day-item__blur',
                item.value === dateVal && 'i-date-panel__day-item__selected',
                item.value === dayjs().format(DATE_FORMAT) && 'i-date-panel__day-item__current'
              )}
              key={item.value}
              onClick={() => handleSelectMonth(item.type, item.value)}
            >
              {item.label}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

const DateRangePanel: React.FC<DatePanelProps> = (props) => {
  const {
    value,
    onChange
  } = props;

  return (
    <div
      className="i-date-panel"
    >
      123
    </div>
  )
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    children = '',
    className,
    style,
    value = dayjs().format(DATE_FORMAT),
    defaultValue,
    trigger = "click",
    disabled = false,
    type = 'date',
    rangeSeparator = '-',
    firstDayOfWeek = 1,
    onChange,
    ...others
  } = props;

  const [popupVisible, setPopupVisible] = useState(false)
  const switchPopup = (visible: boolean) => {
    setPopupVisible(visible)
  }

  const [innerValue, setInnerValue] = useState(value)
  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const handleChange = (val: string) => {
    onChange?.(val)
    setPopupVisible(false)
  }

  return (
    <div
      className={classNames(
        'i-date-picker',
        className
      )}
      style={{ ...style }}
    >
      <Popup
        content={
          type === 'date' ? (
            <DatePanel
              value={innerValue}
              firstDayOfWeek={firstDayOfWeek}
              onChange={handleChange}
            />
          ) : (
            <DateRangePanel
              value={innerValue}
              onChange={handleChange}
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
          value={innerValue.split('-').join(rangeSeparator)}
        />
      </Popup>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
