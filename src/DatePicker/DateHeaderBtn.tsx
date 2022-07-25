import React from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import { DateHeaderBtnProps } from './type';

const DateHeaderBtn: React.FC<DateHeaderBtnProps> = (props) => {
  const {
    icon = "ArrowDoubleLeft",
    disabled = false,
    onClick = () => { }
  } = props

  const handleClickBtn = () => {
    !disabled && onClick?.()
  }

  return (
    <div
      className={classNames(
        'i-date-panel__header-icon',
        disabled && 'i-date-panel__header-icon__disabled'
      )}
      onClick={handleClickBtn}
    >
      <Icon name={icon} />
    </div>
  )
}

export default DateHeaderBtn;
