import React, { useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import Popup from '../Popup';
import ColorPanel from './ColorPanel';
import { ColorPickerProps } from './type';

export const defaultColor = [
  {
    value: 'rgb(206, 55, 46)'
  },
  {
    value: 'rgb(237, 149, 160)'
  },
  {
    value: 'rgb(252, 238, 239)'
  },
  {
    value: 'rgb(232, 109, 44)'
  },
  {
    value: 'rgb(245, 192, 66)'
  },
  {
    value: 'rgb(238, 209, 103)'
  },
  {
    value: 'rgb(127, 225, 89)'
  },
  {
    value: 'rgb(114, 212, 183)'
  },
  {
    value: 'rgb(135, 214, 230)'
  },
  {
    value: 'rgb(216, 238, 242)'
  },
  {
    value: 'rgb(86, 116, 245)'
  },
  {
    value: 'rgb(103, 98, 192)'
  },
  {
    value: 'rgb(223, 221, 252)'
  },
  {
    value: 'rgb(92, 192, 131)'
  },
  {
    value: 'rgb(210, 90, 182)'
  },
]

const ColorPicker: React.FC<ColorPickerProps> & { Panel: React.ElementType } = (props) => {
  const {
    className,
    style,
    triggerClassName,
    triggerStyle,
    size,
    value,
    defaultValue = '#5e62ea',
    colorList = defaultColor,
    onChange,
    onTrigger,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);
  const [visible, setVisible] = useState(false)

  const currentColor = useRef(innerValue)
  const handleChange = (val: string) => {
    setInnerValue(val)
    currentColor.current = val
  }

  const popupChange = (val: boolean) => {
    if (val) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = '';
    }
    setVisible(val)
    onTrigger?.(currentColor.current, val)
  }

  const handleClose = () => {
    setVisible(false)
    onTrigger?.(currentColor.current, false)
  }

  const colorPanel = useMemo(() =>
    <ColorPanel
      value={innerValue}
      colorList={colorList}
      onChange={handleChange}
      onClose={handleClose}
    />, [visible]
  )

  return (
    <div
      className={classNames(
        'i-color-picker',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      <Popup
        visible={visible}
        content={colorPanel}
        trigger="click"
        placement='bottom-left'
        onTrigger={popupChange}
      >
        <div
          className={classNames(
            'i-color',
            size && `i-color--size-${size}`,
            triggerClassName
          )}
          style={{ ...triggerStyle, background: innerValue }}
        ></div>
      </Popup>
    </div>
  )
}

ColorPicker.Panel = ColorPanel;

ColorPanel.displayName = 'ColorPanel';
ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
