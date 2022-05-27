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

export type DateValueType = string | string[]
export type ValueToDateFC = (val: DateValueType) => [number, number, Function, Function, Function]

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
  value?: DateValueType;
  /**
   * 默认选中值，非受控属性
   */
  defaultValue?: DateValueType;
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
   * @default ~
   */
  rangeSeparator?: string;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: DateValueType) => void;
}

export interface DatePanelProps {
  value: DateValueType;
  onChange: Function;
}

export interface YearSelectPanelProps {
  value: number;
  onChange: Function;
}

// 根据 value 获取年月
const useValueToDate: ValueToDateFC = (value) => {
  const [year, setYear] = useState(() => new Date().getFullYear())
  const [month, setMonth] = useState(() => new Date().getMonth())

  const checkYYMMDD = (value: string[] | string) => {
    if (_.isArray(value)) {
      value = value[0]
    }
    if (typeof value === 'string') {
      const arr = value.split('-')
      if (arr.length === 3) return value.split('-').map((item, index) => (index === 1 ? --item : +item))
    }
    const now = new Date()
    return [now.getFullYear(), now.getMonth(), now.getDate()]
  }

  useEffect(() => {
    const [_year, _month] = checkYYMMDD(value)
    setMonth(_month)
    setYear(_year)
  }, [value])

  const nextMonth = useCallback(() => {
    if (month < 11) {
      setMonth((month) => month + 1)
    } else {
      setYear((year) => year + 1)
      setMonth(0)
    }
  }, [month])

  const prepMonth = useCallback(() => {
    if (month > 0) {
      setMonth((month) => month - 1)
    } else {
      setYear((year) => year - 1)
      setMonth(11)
    }
  }, [month])

  return [year, month, nextMonth, prepMonth, setYear]
}

const YearSelectPanel: React.FC<YearSelectPanelProps> = (props) => {
  const {
    value = 2022,
    onChange
  } = props

  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const [yearList, setYearList] = useState([2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029])

  const yearToRangeList = (value: number) => {
    const year = String(value)
    const startNum = Number(`${year.substring(0, 3)}0`)
    const endNum = Number(`${Number(year.substring(0, 3)) + 1}0`)
    const list = _.range(startNum, endNum)
    setYearList(list)
  }

  useEffect(() => {
    yearToRangeList(value)
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
              innerValue === item && 'i-date__year-select-item__selected',
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
    onChange
  } = props;

  const [year, month, nextMonth, prepMonth, setYear] = useValueToDate(props.value)

  const handleChange = useCallback(
    (...arg) => {
      onChange?.(...arg)
    },
    [onChange],
  )

  console.log(year, month, nextMonth, prepMonth, setYear)

  return (
    <div
      className="i-date-panel"
    >
      <header className="i-date-panel__header">

        <section className="i-date-panel__header-handle">
          <div className="i-date-panel__header-icon" onClick={() => setYear((year: number) => year - 1)}>
            <Icon name="ArrowDoubleLeft" />
          </div>
          <div className="i-date-panel__header-icon" onClick={() => prepMonth()}>
            <Icon name="ArrowLeft" />
          </div>
        </section>

        <section className="i-date-panel__header-title-wrapper">
          <Popup content={
            <YearSelectPanel value={year} onChange={setYear} />
          } trigger="click">
            <div className="i-date-panel__header-title">
              {`${year}年`}
            </div>
          </Popup>
          <div className="i-date-panel__header-title">
            {`${month + 1}月`}
          </div>
        </section>

        <section className="i-date-panel__header-handle">
          <div className="i-date-panel__header-icon" onClick={() => nextMonth()}>
            <Icon name="ArrowRight" />
          </div>
          <div className="i-date-panel__header-icon" onClick={() => setYear((year: number) => year + 1)}>
            <Icon name="ArrowDoubleRight" />
          </div>
        </section>

      </header>
      123
    </div>
  )
}

const DateRangePanel: React.FC<DatePanelProps> = (props) => {
  const {
    value,
    onChange
  } = props;

  const [year, month, nextMonth, prepMonth, setYear] = useValueToDate(props.value)

  const handleChange = useCallback(
    (...arg) => {
      onChange?.(...arg)
    },
    [onChange],
  )

  console.log(year, month, nextMonth, prepMonth, setYear)

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
    value = [],
    defaultValue,
    trigger = "click",
    disabled = false,
    type = 'date',
    rangeSeparator = '~',
    onChange,
    ...others
  } = props;

  const [popupVisible, setPopupVisible] = useState(false)
  const switchPopup = (visible: boolean) => {
    setPopupVisible(visible)
  }

  const REGEXP = /^[1-9]\d{3}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/
  const checkDate = (value: DateValueType, type: string) => {
    switch (type) {
      case 'range':
        if (_.isArray(value)
          && typeof value[0] === 'string' && REGEXP.test(value[0])
          && typeof value[1] === 'string' && REGEXP.test(value[1])) {
          return value
        } return []
      default:
        if (typeof value === 'string' && REGEXP.test(value)) {
          return value
        } return ''
    }
  }

  const [innerValue, setInnerValue] = useState(checkDate(value, type))

  const handleChange = (val: string | string[]) => {
    onChange?.(val)
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
        // value={dateValue}
        // format={format}
        // disabled={disabled}
        // onChange={updateValue}
        />
      </Popup>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
