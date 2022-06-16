import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import _ from 'lodash';
import Popup from '../Popup';

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
   * 滑块范围最大值
   * @default 100
   */
  max?: number;
}

const SliderBtn: React.FC<SliderBtnProps> = (props) => {
  const {
    value = 0,
    layout = 'horizontal',
    max = 100,
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
      return { left: `calc(${value / max * 100}% - ${rect.width / 2}px)` }
    } else {
      return { top: `calc(${value / max * 100}% - ${rect.height / 2}px)` }
    }
  }

  return (
    <div
      className="i-slider__button"
      ref={btnRef}
      style={getBtnStyle()}
    />
  )
}

const Slider: React.FC<SliderProps> = (props) => {
  const {
    className,
    style,
    layout = 'horizontal',
    value,
    defaultValue = 0,
    disabled = false,
    max = 100,
    min = 0,
    step = 1,
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

  const [showTip, setShowTip] = useState(false)

  // 是否为移动状态
  const handleMoving = (ifMoving: boolean) => {
    setShowTip(ifMoving)
    if (ifMoving) {
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.userSelect = ''
    }
  }

  useEffect(() => {
    const curRect = slider.current?.getBoundingClientRect()
    rect.left = curRect?.left || 0
    rect.top = curRect?.top || 0
    rect.width = curRect?.width || 0
    rect.height = curRect?.height || 0
    setRect({ ...rect })
  }, [])

  const moveTurnVal = (moveVal: number, maxVal: number) => {
    const stepPrecision = String(step).split('.')[1]?.length
    return _.floor((moveVal / maxVal) * max, stepPrecision);
  }

  const lastVal = useRef(0)
  const handleSliderMove = _.throttle((e: any) => {
    let move = 0
    let maxMove = 0

    if (layout === 'horizontal') {
      move = e.clientX - rect.left
      maxMove = rect.width
    } else {
      move = e.clientY - rect.top
      maxMove = rect.height
    }
    move < (min) && (move = (min))
    move > (maxMove) && (move = (maxMove))

    const currentVal = moveTurnVal(move, maxMove)
    if (
      currentVal !== lastVal.current &&
      (Math.abs(currentVal - lastVal.current) >= step ||
        currentVal + step > max ||
        currentVal - step < min)
    ) {
      setInnerValue(currentVal)
      lastVal.current = currentVal
    }
  }, 10)

  const handleSliderUp = () => {
    handleMoving(false)
    window.removeEventListener('mousemove', handleSliderMove);
    window.removeEventListener('mouseup', handleSliderUp);
  };

  const handleSliderDown = (e: React.MouseEvent) => {
    if (!disabled) {
      e.persist();
      handleMoving(true)

      if (layout === 'horizontal') {
        setInnerValue(moveTurnVal(e.clientX - rect.left, rect.width))
      } else {
        setInnerValue(moveTurnVal(e.clientY - rect.top, rect.height))
      }

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
            left: layout === 'horizontal' ? `${innerValue / max * 100}%` : 0,
            top: layout === 'vertical' ? `${innerValue / max * 100}%` : 0,
          }}
        ></div>
      </div>
      <Popup
        content={innerValue}
        updateLocation={innerValue}
        trigger="hover"
        visible={showTip}
      >
        <SliderBtn
          layout={layout}
          value={innerValue}
          max={max}
        />
      </Popup>
    </div>
  );
};

Slider.displayName = 'Slider';

export default Slider;
