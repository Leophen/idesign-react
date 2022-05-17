import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import dayjs from 'dayjs';
import Popup from '../Popup';
import Input from '../Input';
import Button from '../Button';

export interface TimePickerProps {
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
  /**
   * 切换时间面板时触发
   */
  onTrigger?: (visible: boolean) => void;
}

export interface TimePanelProps {
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 禁用时间项
   */
  disableTime?: (h: number, m: number, s: number) => boolean;
  /**
   * 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format)
   * @default 'HH:mm:ss'
   */
  format?: string;
  /**
   * 是否隐藏禁用状态的时间项
   * @default true
   */
  hideDisabledTime?: boolean;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']
   * @default () => [1, 1, 1]
   */
  steps?: Array<string | number>;
  /**
   * 选中值
   */
  value?: TimesType;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (type: string, value: string, index: number) => void;
  /**
   * 面板关闭时触发
   */
  onClose?: (visible: boolean) => void;
}

export interface TimesType {
  hour: string;
  minute: string;
  second: string;
}

export enum EPickerCols {
  hour = 'hour',
  minute = 'minute',
  second = 'second',
  meridiem = 'meridiem',
}

export const MERIDIEM_LIST = ['am', 'pm'];
export const DEFAULT_STEPS = [1, 1, 1];
export const DEFAULT_FORMAT = 'HH:mm:ss';
const timeArr = [EPickerCols.hour, EPickerCols.minute, EPickerCols.second];

const TimePanel: React.FC<TimePanelProps> = (props) => {
  const {
    value = { hour: '00', minute: '00', second: '00' },
    format = DEFAULT_FORMAT,
    steps = DEFAULT_STEPS,
    hideDisabledTime = true,
    disableTime,
    onChange = () => { },
    onClose = () => { }
  } = props

  const [cols, setCols] = useState<Array<EPickerCols>>([]);

  // 渲染时间数据
  useEffect(() => {
    const match = format.match(/(a\s+|A\s+)?(h+|H+)?:?(m+)?:?(s+)?(\s+a|\s+A)?/);
    const [, startCol, hourCol, minuteCol, secondCol, endCol] = match as any;
    const { meridiem, hour, minute, second } = EPickerCols;
    const renderCol = [
      startCol && meridiem,
      hourCol && hour,
      minuteCol && minute,
      secondCol && second,
      endCol && meridiem,
    ].filter((v) => !!v);
    setCols(renderCol);
  }, [format]);
  const dayjsValue = useMemo(() => {
    const isStepsSet = !!steps.filter((v) => v > 1).length;
    if (value) {
      return dayjs(`${value.hour}-${value.minute}-${value.second}`, format);
    }
    if (isStepsSet) {
      return dayjs()
        .hour(Number(steps[0]) - 1)
        .minute(Number(steps[1]) - 1)
        .second(Number(steps[2]) - 1);
    }
    return dayjs();
  }, [value.hour, value.minute, value.second, format, steps]);
  const getColList = useCallback(
    (col: EPickerCols) => {
      let count = 0;
      if (timeArr.includes(col)) {
        // hour/minute/second column scorller render
        const colIdx = timeArr.indexOf(col);
        const colStep = steps[colIdx];
        if (col === EPickerCols.hour) {
          count = /[h]{1}/.test(format) ? 11 : 23;
        } else {
          count = 59;
        }
        const colList =
          _.range(Number(colStep) - 1, count + 1, Number(colStep)).map((v) => _.padStart(String(v), 2, '0')) || [];
        return hideDisabledTime && !!disableTime
          ? colList.filter((t) => {
            const params: [number, number, number] = [dayjsValue.hour(), dayjsValue.minute(), dayjsValue.second()];
            params[colIdx] = Number(t);
            return !disableTime?.(...params);
          })
          : colList;
      }
      // meridiem column scroller render
      return MERIDIEM_LIST;
    },
    [steps, format, hideDisabledTime, dayjsValue, disableTime],
  );

  const [selectedItem, setSelectedItem] = useState<any>(value)

  const clickItem = (e: React.MouseEvent, type: string, val: string, index: number) => {
    const barNode = (e.target as HTMLElement).parentNode;
    (barNode as HTMLElement).scrollTo({
      top: 32 * index,
      behavior: 'smooth'
    });
    selectedItem[type] = index
    setSelectedItem({ ...selectedItem })
    onChange?.(type, val, index)
  }

  const closePanel = () => {
    onClose?.(false)
  }

  const handleConfirm = () => {
    closePanel()
  }

  console.log(value,selectedItem)

  return (
    <div
      className="i-time-panel"
    >
      <section className="i-time-panel-content">
        {cols.map((col, index) => (
          <ul
            className="i-time-panel-item"
            key={col + index}
          >
            {getColList(col).map((item, idx) => (
              <li
                className={classNames(
                  'i-time-spinner-item',
                  selectedItem[col] === idx && 'i-time-spinner-item__selected'
                )}
                key={item}
                onClick={(e) => clickItem(e, col, item, idx)}
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </section>
      <footer className="i-time-panel-footer">
        <Button size="small" variant="text">此刻</Button>
        <div className="i-time-panel-footer__handle">
          <Button size="small" variant="outline" onClick={closePanel}>取消</Button>
          <Button size="small" onClick={handleConfirm}>确认</Button>
        </div>
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
    onChange = () => { },
    onTrigger = () => { }
  } = props;

  const [innerValue, setInnerValue] = useState<any>({
    hour: '00',
    minute: '00',
    second: '00'
  })

  const inputChangeHour = (val: string) => {
    innerValue.hour = val
    setInnerValue({ ...innerValue })
  }

  const inputChangeMinute = (val: string) => {
    innerValue.minute = val
    setInnerValue({ ...innerValue })
  }

  const inputChangeSecond = (val: string) => {
    innerValue.second = val
    setInnerValue({ ...innerValue })
  }

  const [popupVisible, setPopupVisible] = useState(false)

  const switchPopup = (visible: boolean) => {
    setPopupVisible(visible)
    onTrigger?.(visible)
  }

  const selectTime = (type: string, val: string, index: number) => {
    innerValue[type] = val
    setInnerValue({ ...innerValue })
    console.log(innerValue, type, val, index)
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
            value={innerValue}
            onClose={switchPopup}
            onChange={selectTime}
          />
        }
        placement="bottom"
        trigger={trigger}
        className="i-time-popup"
        visible={popupVisible}
        // disabled={disabled}
        onTrigger={switchPopup}
      >
        <Input
          placeholder=""
          readonly={!disabled}
          disabled={disabled}
          suffixIcon="Clock"
        >
          <Input
            size="small"
            placeholder=''
            value={innerValue.hour}
            onChange={inputChangeHour}
          />:
          <Input
            size="small"
            placeholder=''
            value={innerValue.minute}
            onChange={inputChangeMinute}
          />:
          <Input
            size="small"
            placeholder=''
            value={innerValue.second}
            onChange={inputChangeSecond}
          />
        </Input>
      </Popup>
    </div>
  );
};

TimePicker.displayName = 'TimePicker';

export default TimePicker;
