import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import Icon from '../Icon';
import { MonthSelectPanelProps } from './type';

const MonthSelectPanel: React.FC<MonthSelectPanelProps> = (props) => {
  const {
    month = 6,
    onChange
  } = props

  const [innerMonth, setInnerMonth] = useState(month)

  useEffect(() => {
    setInnerMonth(month)
  }, [month])

  const handleLastMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    innerMonth > 0 && setInnerMonth(innerMonth - 1)
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    innerMonth < 11 && setInnerMonth(innerMonth + 1)
  }

  const handleClickItem = (e: React.MouseEvent, item: number) => {
    e.stopPropagation()
    onChange?.(item)
  }

  return (
    <div className="i-date__month-select-panel" onClick={(e) => e.stopPropagation()}>
      <header className="i-date__month-select-title">
        <div className="i-date-panel__header-icon" onClick={handleLastMonth}>
          <Icon name="ArrowLeft" />
        </div>
        <div className="i-date-panel__header-title">
          {innerMonth + 1} 月
        </div>
        <div className="i-date-panel__header-icon" onClick={handleNextMonth}>
          <Icon name="ArrowRight" />
        </div>
      </header>
      <section className="i-date__month-select-list">
        {_.range(0, 12).map(item => (
          <div
            className={classNames(
              'i-date__month-select-item',
              innerMonth === item && 'i-date__month-select-item__selected',
              new Date().getMonth() === item && 'i-date__month-select-item__current'
            )}
            key={item}
            onClick={(e) => handleClickItem(e, item)}
          >
            {item + 1}
          </div>
        ))}
      </section>
    </div>
  )
}

export default MonthSelectPanel;
