import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import _ from 'lodash';
import Popup from '../Popup';

type placementType =
  'top' |
  'top-left' |
  'top-right' |
  'bottom' |
  'bottom-left' |
  'bottom-right' |
  'left' |
  'left-top' |
  'left-bottom' |
  'right' |
  'right-top' |
  'right-bottom'

export interface SliderProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 滑块布局方向
   * @default horizontal
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 滑块值
   */
  value?: number | number[];
  /**
   * 滑块值，非受控属性
   */
  defaultValue?: number | number[];
  /**
   * 是否禁用滑块
   * @default false
   */
  disabled?: boolean;
  /**
   * 滑块范围最大值
   * @default 100
   */
  max?: number;
  /**
   * 滑块范围最小值
   * @default 0
   */
  min?: number;
  /**
   * 步长
   * @default 1
   */
  step?: number;
  /**
   * 是否为范围滑块
   * @default false
   */
  range?: boolean;
  /**
   * 是否隐藏数值提示
   * @default false
   */
  hideTip?: boolean;
  /**
   * 数值提示出现位置
   * @default top
   */
  placement?: placementType;
  /**
   * 滑块值变化时触发
   */
  onChange?: (value: number) => void;
}

export interface SliderBtnProps extends SliderProps {
  /**
   * 当前值
   * @default 0
   */
  currentVal?: number;
  /**
   * 是否正选中滑条
   * @default false
   */
  downSlider?: boolean;
}

const SliderBtn: React.FC<SliderBtnProps> = (props) => {
  const {
    layout = 'horizontal',
    currentVal = 0,
    max = 100,
    min = 0,
    downSlider = false,
    hideTip = false,
    placement = 'top',
  } = props

  const [enterShowTip, setEnterShowTip] = useState(false)

  const btnRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState({
    width: 0,
    height: 0
  })
  useEffect(() => {
    rect.width = btnRef.current?.getBoundingClientRect().width || 0
    rect.height = btnRef.current?.getBoundingClientRect().height || 0
    setRect({ ...rect })
  }, [])

  const getBtnStyle = () => {
    if (layout === 'horizontal') {
      return { left: `calc(${(currentVal - min) / (max - min) * 100}% - ${rect.width / 2}px)` }
    } else {
      return { top: `calc(${(currentVal - min) / (max - min) * 100}% - ${rect.height / 2}px)` }
    }
  }

  return (
    <Popup
      content={currentVal}
      updateLocation={currentVal}
      trigger="hover"
      visible={!hideTip && (downSlider || enterShowTip)}
      placement={placement}
    >
      <div
        className="i-slider__button"
        ref={btnRef}
        style={getBtnStyle()}
        onMouseEnter={() => setEnterShowTip(true)}
        onMouseLeave={() => setEnterShowTip(false)}
      />
    </Popup>
  )
}

// 取数组中 最接近传入值的数
const getNearNum = (numArr: number[], num: number) => {
  const newArr = _.cloneDeep(numArr)
  newArr.push(num)
  newArr.sort()
  let nearNum = 0
  for (let i = 0, len = newArr.length; i < len; i++) {
    if (newArr[i] === num) {
      if (i === 0) {
        nearNum = numArr[0]
      } else if (i === len - 1) {
        nearNum = numArr[numArr.length - 1]
      } else {
        if (Math.abs(newArr[i - 1] - num) < Math.abs(newArr[i + 1] - num)) {
          nearNum = newArr[i - 1]
        } else {
          nearNum = newArr[i + 1]
        }
      }
    }
  }
  return nearNum
}

const Slider: React.FC<SliderProps> = (props) => {
  const {
    className,
    style,
    layout = 'horizontal',
    value,
    defaultValue = !props.range ? (props.min || 0) : ([props.min || 0, props.max || 0]),
    disabled = false,
    max = 100,
    min = 0,
    step = 1,
    range = false,
    hideTip = false,
    placement = 'top',
    onChange,
  } = props;

  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);

  const slider = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })

  const [downStatus, setDownStatus] = useState(false)

  // 是否为移动状态
  const setMoving = (ifMoving: boolean) => {
    setDownStatus(ifMoving)
    if (ifMoving) {
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.userSelect = ''
    }
  }

  // 精度
  const [stepPrecision, setStepPrecision] = useState(0)

  useEffect(() => {
    setStepPrecision(String(step).split('.')[1]?.length)
  }, [])

  // 所有可取值的位置
  const positionArr = useMemo(() => {
    const result = [];
    for (let i = min; i <= max; i = _.add(i, step)) {
      result.push((i - min) / (max - min));
    }
    return result;
  }, [max, min, step]);

  const positTurnVal = (movePercent: number) => {
    return min + _.round((max - min) * getNearNum(positionArr, movePercent), stepPrecision);
  }

  const lastVal = useRef(0)
  const handleSliderMove = _.throttle((e: any) => {
    let move = 0
    let minMove = 0
    let maxMove = 0

    if (layout === 'horizontal') {
      move = e.clientX - rect.left
      maxMove = rect.width
    } else {
      move = e.clientY - rect.top
      maxMove = rect.height
    }
    move < (minMove) && (move = minMove)
    move > (maxMove) && (move = maxMove)

    const movePercent = move / maxMove
    const newVal = positTurnVal(movePercent)

    if (newVal === lastVal.current) return
    updateInnerValue(newVal)
    lastVal.current = newVal
  }, 16)

  const handleSliderUp = () => {
    setMoving(false)
    window.removeEventListener('mousemove', handleSliderMove);
    window.removeEventListener('mouseup', handleSliderUp);
  };

  const getBtnRect = () => {
    const curRect = slider.current?.getBoundingClientRect()
    rect.left = curRect?.left || 0
    rect.top = curRect?.top || 0
    rect.width = curRect?.width || 0
    rect.height = curRect?.height || 0
    setRect({ ...rect })
  }

  const updateInnerValue = (val: number) => {
    if (!range) {
      setInnerValue(val)
    } else {
      if (Math.abs(val - (innerValue as number[])[0]) < Math.abs(val - (innerValue as number[])[1])) {
        (innerValue as number[])[0] = val
      } else {
        (innerValue as number[])[1] = val
      }
      setInnerValue([...innerValue as number[]])
    }
  }

  const handleSliderDown = (e: React.MouseEvent) => {
    if (!disabled) {
      e.persist();
      setMoving(true)
      getBtnRect()

      let movePercent = 0
      if (layout === 'horizontal') {
        movePercent = (e.clientX - rect.left) / rect.width
      } else {
        movePercent = (e.clientY - rect.top) / rect.height
      }
      const newVal = positTurnVal(movePercent)
      lastVal.current = newVal
      updateInnerValue(newVal)

      window.addEventListener('mousemove', handleSliderMove);
      window.addEventListener('mouseup', handleSliderUp);
    }
  }

  const singleSlider = (
    <>
      <div className="i-slider__bar">
        <div
          className="i-slider__bar-active"
          style={{
            left: layout === 'horizontal' ? `${(innerValue as number - min) / (max - min) * 100}%` : 0,
            top: layout === 'vertical' ? `${(innerValue as number - min) / (max - min) * 100}%` : 0,
          }}
        ></div>
      </div>
      <SliderBtn
        currentVal={innerValue as number}
        downSlider={downStatus}
        {...props}
      />
    </>
  )

  const rangeSlider = (
    <>
      <div className="i-slider__bar">
        <div
          className="i-slider__bar-active"
          style={{
            left: 0,
            top: 0,
            width: layout === 'horizontal' ? `${((innerValue as number[])[0] - min) / (max - min) * 100}%` : 6,
            height: layout === 'vertical' ? `${((innerValue as number[])[0] - min) / (max - min) * 100}%` : 6,
          }}
        ></div>
        <div
          className="i-slider__bar-active"
          style={{
            left: layout === 'horizontal' ? `${((innerValue as number[])[1] - min) / (max - min) * 100}%` : 0,
            top: layout === 'vertical' ? `${((innerValue as number[])[1] - min) / (max - min) * 100}%` : 0,
          }}
        ></div>
      </div>
      <SliderBtn
        currentVal={(innerValue as number[])[0]}
        downSlider={downStatus}
        {...props}
      />
      <SliderBtn
        currentVal={(innerValue as number[])[1]}
        downSlider={downStatus}
        {...props}
      />
    </>
  )

  return (
    <div
      className={classNames(
        'i-slider',
        layout === 'vertical' && `i-slider__layout-${layout}`,
        disabled && 'i-slider__disabled',
        className
      )}
      style={{ ...style }}
      ref={slider}
      onMouseDown={handleSliderDown}
    >
      {!range && !_.isArray(innerValue) && singleSlider}
      {range && _.isArray(innerValue) && rangeSlider}
    </div>
  );
};

Slider.displayName = 'Slider';

export default Slider;
