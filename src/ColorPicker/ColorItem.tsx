import React from 'react';
import './index.scss';
import { ColorItemProps } from './type';

const ColorItem: React.FC<ColorItemProps> = (props) => {
  const {
    color = '#5e62ea',
    onClick
  } = props

  const handleClick = () => {
    onClick?.(color)
  }

  return (
    <div
      className="i-color-panel-color"
      style={{
        background: color
      }}
      onClick={handleClick}
    />
  )
}

export default ColorItem;
