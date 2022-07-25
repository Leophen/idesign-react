import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import Icon from '../Icon';
import { YearSelectPanelProps } from './type';

const YearSelectPanel: React.FC<YearSelectPanelProps> = (props) => {
  const {
    year = 2022,
    onChange
  } = props

  const [innerYear, setInnerYear] = useState(year)

  useEffect(() => {
    setInnerYear(year)
  }, [year])

  const [yearList, setYearList] = useState(_.range(2020, 2030))

  const yearToRangeList = (curYear: number) => {
    const year = String(curYear)
    const startNum = Number(`${year.substring(0, 3)}0`)
    const endNum = Number(`${Number(year.substring(0, 3)) + 1}0`)
    const list = _.range(startNum, endNum)
    setYearList(list)
  }

  useEffect(() => {
    yearToRangeList(year)
  }, [])

  const handleLastTenYears = (e: React.MouseEvent) => {
    e.stopPropagation()
    const subTenYear = yearList[0] - 10
    yearToRangeList(subTenYear)
  }

  const handleNextTenYears = (e: React.MouseEvent) => {
    e.stopPropagation()
    const subTenYear = yearList[0] + 10
    yearToRangeList(subTenYear)
  }

  const handleClickItem = (e: React.MouseEvent, item: number) => {
    e.stopPropagation()
    onChange?.(item)
  }

  return (
    <div className="i-date__year-select-panel" onClick={(e) => e.stopPropagation()}>
      <header className="i-date__year-select-title">
        <div className="i-date-panel__header-icon" onClick={handleLastTenYears}>
          <Icon name="ArrowDoubleLeft" />
        </div>
        <div className="i-date-panel__header-title">
          {yearList[0]} - {yearList[yearList.length - 1]}
        </div>
        <div className="i-date-panel__header-icon" onClick={handleNextTenYears}>
          <Icon name="ArrowDoubleRight" />
        </div>
      </header>
      <section className="i-date__year-select-list">
        {yearList.map(item => (
          <div
            className={classNames(
              'i-date__year-select-item',
              innerYear === item && 'i-date__year-select-item__selected',
              new Date().getFullYear() === item && 'i-date__year-select-item__current'
            )}
            key={item}
            onClick={(e) => handleClickItem(e, item)}
          >
            {item}
          </div>
        ))}
      </section>
    </div>
  )
}

export default YearSelectPanel;
