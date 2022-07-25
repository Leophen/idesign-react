import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import Popup from '../Popup';
import { SliderBtnProps } from './type';

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

export default SliderBtn;
