import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 时间值
   */
  value?: {
    hour?: string;
    minute?: string;
    second?: string;
  };
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
   * 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format)
   * @default HH:mm:ss
   */
  format?: string;
  /**
   * 选中时间变化时触发
   */
  onChange?: (value: TimesType) => void;
  /**
   * 切换时间面板时触发
   */
  onTrigger?: (visible: boolean) => void;
}

export interface TimeInputProps {
  /**
   * 时间值
   */
  value?: TimesType;
  /**
   * 是否禁用输入框
   * @default false
   */
  disabled?: boolean;
  /**
   * 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format)
   * @default HH:mm:ss
   */
  format?: string;
  /**
   * 输入时间变化时触发
   */
  onChange?: (value: TimesType) => void;
}

export interface TimePanelProps {
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
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
   * 选中值
   */
  value?: TimesType;
  /**
   * 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']
   * @default () => [1, 1, 1]
   */
  steps?: Array<string | number>;
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
   * 点击此刻按钮时触发
   */
  onNow?: () => void;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (type: string, value: string) => void;
  /**
   * 面板关闭时触发
   */
  onClose?: (visible: boolean) => void;
  /**
   * 点击确认按钮时触发
   */
  onConfirm?: () => void;
}

export interface TimesType {
  hour?: string;
  minute?: string;
  second?: string;
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
    onNow = () => { },
    onChange = () => { },
    onClose = () => { },
    onConfirm = () => { }
  } = props

  const [cols, setCols] = useState<Array<EPickerCols>>([]);

  // 初始化 -> 渲染时间数据
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

  // 同步滚动
  const hourPanelRef = useRef<any>(null)
  const minutePanelRef = useRef<any>(null)
  const secondPanelRef = useRef<any>(null)
  const getRef = (type: string) => {
    let ref = secondPanelRef
    type === 'hour' && (ref = hourPanelRef);
    type === 'minute' && (ref = minutePanelRef);
    return ref
  }
  const updateScroll = (mode?: string) => {
    hourPanelRef.current && hourPanelRef.current.scrollTo({
      top: 32 * Number(value.hour),
      behavior: mode
    });
    minutePanelRef.current && minutePanelRef.current.scrollTo({
      top: 32 * Number(value.minute),
      behavior: mode
    });
    secondPanelRef.current && secondPanelRef.current.scrollTo({
      top: 32 * Number(value.second),
      behavior: mode
    });
  }
  useEffect(() => {
    setTimeout(() => {
      updateScroll()
    })
  }, []);
  useEffect(() => {
    updateScroll('smooth')
  }, [value]);

  const clickItem = (type: string, val: string) => {
    onChange?.(type, val)
  }

  const handleNow = () => {
    onNow?.()
  }

  const closePanel = () => {
    onClose?.(false)
  }

  const handleConfirm = () => {
    closePanel()
    onConfirm?.()
  }

  return (
    <div
      className="i-time-panel"
    >
      <section
        className="i-time-panel-content"
      >
        {cols.map((col, index) => (
          <ul
            className="i-time-panel-item"
            key={col + index}
            ref={getRef(col)}
          >
            {getColList(col).map(item => (
              <li
                className={classNames(
                  'i-time-spinner-item',
                  Number((value as any)[col]) === Number(item) && 'i-time-spinner-item__selected'
                )}
                key={item}
                onClick={(e) => clickItem(col, item)}
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </section>
      <footer className="i-time-panel-footer">
        <Button size="small" variant="text" onClick={handleNow}>此刻</Button>
        <div className="i-time-panel-footer__handle">
          <Button size="small" variant="outline" onClick={closePanel}>取消</Button>
          <Button size="small" onClick={handleConfirm}>确认</Button>
        </div>
      </footer>
    </div>
  )
}

const TimeInput: React.FC<TimeInputProps> = (props) => {
  const {
    value = { hour: '00', minute: '00', second: '00' },
    disabled = false,
    format = DEFAULT_FORMAT,
    onChange = () => { }
  } = props

  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    let newHour = /^[H]/.test(format) ? value.hour : Number(value.hour) % 12
    newHour = _.padStart(String(newHour), 2, '0');
    value.hour = newHour
    setInnerValue({ ...value })
  }, [value])

  const emitValue = (val?: TimesType) => {
    setInnerValue({ ...innerValue })
    onChange?.(innerValue)
  }

  const inputChangeHour = (val: string) => {
    val = _.padStart(String(val), 2, '0');
    innerValue.hour = val
    emitValue()
  }

  const inputChangeMinute = (val: string) => {
    val = _.padStart(String(val), 2, '0');
    innerValue.minute = val
    emitValue()
  }

  const inputChangeSecond = (val: string) => {
    val = _.padStart(String(val), 2, '0');
    innerValue.second = val
    emitValue()
  }

  const timeColon = (
    <div
      className={classNames(
        'i-time-colon',
        disabled && 'i-time-colon__disabled'
      )}
    >
      :
    </div>
  )

  return (
    <>
      <Input
        size="small"
        type="number"
        hideNumberBtn
        minNumber={0}
        maxNumber={23}
        placeholder=''
        disabled={disabled}
        value={innerValue?.hour || ''}
        onChange={inputChangeHour}
      />
      {timeColon}
      <Input
        size="small"
        type="number"
        hideNumberBtn
        minNumber={0}
        maxNumber={59}
        placeholder=''
        disabled={disabled}
        value={innerValue?.minute || ''}
        onChange={inputChangeMinute}
      />
      {timeColon}
      <Input
        size="small"
        type="number"
        hideNumberBtn
        minNumber={0}
        maxNumber={59}
        placeholder=''
        disabled={disabled}
        value={innerValue?.second || ''}
        onChange={inputChangeSecond}
      />
    </>
  )
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {
    className,
    style,
    value,
    trigger = "click",
    disabled = false,
    format = DEFAULT_FORMAT,
    onChange = () => { },
    onTrigger = () => { }
  } = props;

  const getCurrentTime = (type?: string) => {
    let currentVal = new Date().getHours().toString()
    type === 'minute' && (currentVal = new Date().getMinutes().toString());
    type === 'second' && (currentVal = new Date().getSeconds().toString());
    (currentVal.length === 1) && (currentVal = '0' + currentVal);
    return currentVal
  }

  const [innerValue, setInnerValue] = useState<any>(value ? value : {
    hour: getCurrentTime('hour'),
    minute: getCurrentTime('minute'),
    second: getCurrentTime('second')
  })

  useEffect(() => {
    const newValue = {
      hour: value?.hour || getCurrentTime('hour'),
      minute: value?.minute || getCurrentTime('minute'),
      second: value?.second || getCurrentTime('second')
    }
    setInnerValue(newValue)
  }, [value])

  const updateValue = (val?: TimesType) => {
    if (val) {
      setInnerValue(val)
      onChange?.(val)
    } else {
      setInnerValue({ ...innerValue })
      onChange?.(innerValue)
    }
  }

  const selectTime = (type: string, val: string) => {
    innerValue[type] = val
    updateValue()
  }

  const [popupVisible, setPopupVisible] = useState(false)
  const switchPopup = (visible: boolean) => {
    setPopupVisible(visible)
    onTrigger?.(visible)
  }

  const handleNow = () => {
    updateValue({
      hour: getCurrentTime('hour'),
      minute: getCurrentTime('minute'),
      second: getCurrentTime('second')
    })
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
            value={innerValue}
            format={format}
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
        <Input
          placeholder=""
          readonly={!disabled}
          disabled={disabled}
          suffixIcon="Clock"
        >
          <TimeInput
            value={innerValue}
            format={format}
            disabled={disabled}
            onChange={updateValue}
          />
        </Input>
      </Popup>
    </div>
  );
};

TimePicker.displayName = 'TimePicker';

export default TimePicker;
