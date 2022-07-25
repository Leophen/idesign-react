import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import dayjs from 'dayjs';
import Button from '../Button';
import { DEFAULT_FORMAT, DEFAULT_STEPS, MERIDIEM_LIST, timeArr } from './index'
import { EPickerCols, TimePanelProps } from './type';

const TimePanel: React.FC<TimePanelProps> = (props) => {
  const {
    value = { hour: '00', minute: '00', second: '00', meridiem: '' },
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
        // hour/minute/second column scroll render
        const colIdx = timeArr.indexOf(col);
        const colStep = steps[colIdx];
        if (col === EPickerCols.hour) {
          count = /[h]{1}/.test(format) ? 11 : 23;
        } else {
          count = 59;
        }
        const colList = _.range(
          0,
          count + 1,
          Number(colStep)).map((v) => _.padStart(String(v), 2, '0')
          ) || [];
        return hideDisabledTime && !!disableTime
          ? colList.filter((t) => {
            const params: [number, number, number] = [dayjsValue.hour(), dayjsValue.minute(), dayjsValue.second()];
            params[colIdx] = Number(t);
            return !disableTime?.(...params);
          })
          : colList;
      }
      // meridiem column scroll render
      return MERIDIEM_LIST;
    },
    [steps, format, hideDisabledTime, dayjsValue, disableTime],
  );

  // 同步滚动
  const hourPanelRef = useRef<any>(null)
  const minutePanelRef = useRef<any>(null)
  const secondPanelRef = useRef<any>(null)
  const meridiemPanelRef = useRef<any>(null)
  const getRef = (type: string) => {
    let ref = meridiemPanelRef
    type === 'hour' && (ref = hourPanelRef);
    type === 'minute' && (ref = minutePanelRef);
    type === 'second' && (ref = secondPanelRef);
    return ref
  }
  const updateScroll = (mode?: string) => {
    hourPanelRef.current && hourPanelRef.current.scrollTo({
      top: 32 * (Number(value.hour) / Number(steps[0])),
      behavior: mode
    });
    minutePanelRef.current && minutePanelRef.current.scrollTo({
      top: 32 * (Number(value.minute) / Number(steps[1])),
      behavior: mode
    });
    secondPanelRef.current && secondPanelRef.current.scrollTo({
      top: 32 * (Number(value.second) / Number(steps[2])),
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
            {getColList(col).map((item) => (
              <li
                className={classNames(
                  'i-time-spinner-item',
                  (value as any)[col] === item && 'i-time-spinner-item__selected'
                )}
                key={item}
                onClick={() => clickItem(col, item)}
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </section>
      <footer className="i-time-panel-footer">
        {!steps.filter((v) => v > 1).length && <Button size="small" variant="text" onClick={handleNow}>此刻</Button>}
        <div className="i-time-panel-footer__handle">
          <Button size="small" variant="outline" onClick={closePanel}>取消</Button>
          <Button size="small" onClick={handleConfirm}>确认</Button>
        </div>
      </footer>
    </div>
  )
}

export default TimePanel;
