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
  value?: number;
  /**
   * 滑块值，非受控属性
   */
  defaultValue?: number;
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

export interface SliderBtnProps {
  /**
   * 滑块位置比例
   * @default 0
   */
  value?: number;
  /**
   * 滑块布局方向
   * @default horizontal
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 滑块范围长度
   * @default 100
   */
  length?: number;
  /**
   * 移入滑块
   */
  onEnter?: () => void;
  /**
   * 移出滑块
   */
  onLeave?: () => void;
}

const SliderBtn: React.FC<SliderBtnProps> = (props) => {
  const {
    value = 0,
    layout = 'horizontal',
    length = 100,
    onEnter,
    onLeave,
  } = props

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
      return { left: `calc(${value / length * 100}% - ${rect.width / 2}px)` }
    } else {
      return { top: `calc(${value / length * 100}% - ${rect.height / 2}px)` }
    }
  }

  return (
    <div
      className="i-slider__button"
      ref={btnRef}
      style={getBtnStyle()}
      onMouseEnter={() => onEnter?.()}
      onMouseLeave={() => onLeave?.()}
    />
  )
}

const Slider: React.FC<SliderProps> = (props) => {
  const {
    className,
    style,
    layout = 'horizontal',
    value,
    defaultValue = props.min || 0,
    disabled = false,
    max = 100,
    min = 0,
    step = 1,
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

  const [downShowTip, setDownShowTip] = useState(false)
  const [enterShowTip, setEnterShowTip] = useState(false)

  // 是否为移动状态
  const handleMoving = (ifMoving: boolean) => {
    setDownShowTip(ifMoving)
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
    move < (minMove) && (move = (minMove))
    move > (maxMove) && (move = (maxMove))

    const movePercent = move / maxMove
    const newVal = positTurnVal(movePercent)

    if (newVal === lastVal.current) return
    setInnerValue(newVal)
    lastVal.current = newVal
  }, 16)

  const handleSliderUp = () => {
    handleMoving(false)
    window.removeEventListener('mousemove', handleSliderMove);
    window.removeEventListener('mouseup', handleSliderUp);
  };

  const updateBtnPosition = () => {
    const curRect = slider.current?.getBoundingClientRect()
    rect.left = curRect?.left || 0
    rect.top = curRect?.top || 0
    rect.width = curRect?.width || 0
    rect.height = curRect?.height || 0
    setRect({ ...rect })
  }

  const handleSliderDown = (e: React.MouseEvent) => {
    if (!disabled) {
      e.persist();
      handleMoving(true)

      updateBtnPosition()

      let movePercent = 0
      if (layout === 'horizontal') {
        movePercent = (e.clientX - rect.left) / rect.width
      } else {
        movePercent = (e.clientY - rect.top) / rect.height
      }
      const newVal = positTurnVal(movePercent)
      lastVal.current = newVal
      setInnerValue(newVal)

      window.addEventListener('mousemove', handleSliderMove);
      window.addEventListener('mouseup', handleSliderUp);
    }
  }

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
      <div className="i-slider__bar">
        <div
          className="i-slider__bar-active"
          style={{
            left: layout === 'horizontal' ? `${(innerValue - min) / (max - min) * 100}%` : 0,
            top: layout === 'vertical' ? `${(innerValue - min) / (max - min) * 100}%` : 0,
          }}
        ></div>
      </div>
      <Popup
        content={innerValue}
        updateLocation={innerValue}
        trigger="hover"
        visible={!hideTip && (downShowTip || enterShowTip)}
        placement={placement}
      >
        <SliderBtn
          layout={layout}
          value={innerValue - min}
          length={max - min}
          onEnter={() => setEnterShowTip(true)}
          onLeave={() => setEnterShowTip(false)}
        />
      </Popup>
    </div>
  );
};

Slider.displayName = 'Slider';

export default Slider;
