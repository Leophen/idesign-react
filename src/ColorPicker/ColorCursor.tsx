import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import { ColorCursorProps } from './type';

const ColorCursor: React.FC<ColorCursorProps> = (props) => {
  const {
    x = 0,
    y = 0,
    mode = 'xy',
    color,
    style
  } = props

  const cursor = useRef<any>(null)

  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  })

  const [parent, setParent] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    parent.width = cursor.current.parentNode.clientWidth
    parent.height = cursor.current.parentNode.clientHeight
    setParent({ ...parent })
  }, [])

  useEffect(() => {
    if (mode === 'x') {
      translate.x = x * (parent.width - 12)
    } else if (mode === 'y') {
      translate.y = y * (parent.height - 12)
    } else {
      translate.x = (x * parent.width) - 6
      translate.y = (y * parent.height) - 6
    }
    setTranslate({ ...translate })
  }, [x, y])

  return (
    <div
      className="i-color-picker__cursor"
      ref={cursor}
      style={{
        ...(style || {}),
        ...{
          transform: `translate(${translate.x}px, ${translate.y}px)`,
          background: color
        }
      }}
    />
  )
}

export default ColorCursor;
