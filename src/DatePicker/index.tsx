import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import Popup from '../Popup';
import Input from '../Input';
import Icon from '../Icon';
import Button from '../Button';
import useDefault from '../hooks/useDefault';

dayjs.extend(isBetween)

export interface DatePickerProps {
  /**
   * 类名
   */
  className?: string;
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

export interface DateHeaderBtnProps {
  icon?: string;
  disabled?: boolean;
  onClick?: Function;
}

export interface DatePanelProps {
  value?: string;
  defaultDisplayVal?: string;
  rangeValue?: string[];
  firstDayOfWeek?: number;
  onChange?: Function;
  onHover?: Function;
  onClose?: Function
}

export interface DatePanelRangeProps extends DatePanelProps { }

export interface YearSelectPanelProps {
  year: number;
  onChange: Function;
}

export interface MonthSelectPanelProps {
  month: number;
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

  const [yearList, setYearList] = useState(_.range(2020, 2030))

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

const MonthSelectPanel: React.FC<MonthSelectPanelProps> = (props) => {
  const {
    month = 6,
    onChange
  } = props

  const [innerMonth, setInnerMonth] = useState(month)

  useEffect(() => {
    setInnerMonth(month)
  }, [month])

  const handleLastMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    innerMonth > 0 && setInnerMonth(innerMonth - 1)
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    innerMonth < 11 && setInnerMonth(innerMonth + 1)
  }

  const handleClickItem = (e: React.MouseEvent, item: number) => {
    e.stopPropagation()
    onChange?.(item)
  }

  return (
    <div className="i-date__month-select-panel" onClick={(e) => e.stopPropagation()}>
      <header className="i-date__month-select-title">
        <div className="i-date-panel__header-icon" onClick={handleLastMonth}>
          <Icon name="ArrowLeft" />
        </div>
        <div className="i-date-panel__header-title">
          {innerMonth + 1} 月
        </div>
        <div className="i-date-panel__header-icon" onClick={handleNextMonth}>
          <Icon name="ArrowRight" />
        </div>
      </header>
      <section className="i-date__month-select-list">
        {_.range(0, 12).map(item => (
          <div
            className={classNames(
              'i-date__month-select-item',
              innerMonth === item && 'i-date__month-select-item__selected',
              new Date().getMonth() === item && 'i-date__month-select-item__current'
            )}
            key={item}
            onClick={(e) => handleClickItem(e, item)}
          >
            {item + 1}
          </div>
        ))}
      </section>
    </div>
  )
}

const DateHeaderBtn: React.FC<DateHeaderBtnProps> = (props) => {
  const {
    icon = "ArrowDoubleLeft",
    disabled = false,
    onClick = () => { }
  } = props

  const handleClickBtn = () => {
    !disabled && onClick?.()
  }

  return (
    <div
      className={classNames(
        'i-date-panel__header-icon',
        disabled && 'i-date-panel__header-icon__disabled'
      )}
      onClick={handleClickBtn}
    >
      <Icon name={icon} />
    </div>
  )
}

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
        defaultDisplayVal={dayjs(innerRangeValue[1]).month() !== dayjs(innerRangeValue[0]).month() ? innerRangeValue[1] : dayjs(innerRangeValue[1]).add(1, 'month').format(DATE_FORMAT)}
        onChange={handleSelect}
        onHover={handleHover}
      />
    </div>
  )
}

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
