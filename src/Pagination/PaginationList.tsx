import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import _ from 'lodash';
import { PaginationListProps } from './type';

const PaginationList: React.FC<PaginationListProps> = (props) => {
  const {
    current = 1,
    total = 0,
    pageSize = 10,
    disabled = false,
    onChoose
  } = props

  const [pageArr, setPageArr] = useState(_.range(1, _.ceil(total / pageSize) + 1))

  const handleChooseNum = (item: number) => {
    if (!disabled) {
      let result = item
      result < 1 && (result = 1)
      result > pageArr.length && (result = pageArr.length)
      onChoose?.(result)
    }
  }

  const shortItems = (
    pageArr.map(item => (
      <div
        className={classNames(
          'i-pagination-btn',
          current === item && 'i-pagination-btn__active',
          disabled && 'i-pagination-btn__disabled'
        )}
        key={`item${item}`}
        onClick={() => handleChooseNum(item)}
      >
        {item}
      </div>
    ))
  )

  const updateArrowShow = () => {
    let lShow = true
    let rShow = true
    if (_.indexOf(pageArr, current) < 4) {
      lShow = false
    } else if (_.indexOf(pageArr, current) > pageArr.length - 5) {
      rShow = false
    }
    setLeftShow(lShow)
    setRightShow(rShow)
  }

  const pagesRef = useRef<HTMLElement>(null)

  useEffect(() => {
    updateArrowShow()
    pagesRef.current?.scrollTo({
      left: 32 * (current - 3) + 8 * (current - 3),
      behavior: 'smooth'
    });
    const newCountArr = _.range(1, _.ceil(total / pageSize) + 1)
    setPageArr(newCountArr)
  }, [current, total, pageSize])

  const [leftShow, setLeftShow] = useState(false)
  const [rightShow, setRightShow] = useState(false)

  const [leftHover, setLeftHover] = useState(false)
  const [rightHover, setRightHover] = useState(false)

  const longItems = (
    <>
      {leftShow && (
        <div
          className={classNames(
            'i-pagination-btn',
            '-handle',
            disabled && 'i-pagination-btn__disabled'
          )}
          onMouseEnter={() => setLeftHover(true)}
          onMouseLeave={() => setLeftHover(false)}
          onClick={disabled ? () => { } : () => handleChooseNum(current - 5)}
        >
          <Icon name={leftHover ? "ArrowDoubleLeft" : "MoreFilled"} size={12} />
        </div>
      )}
      <section className="i-pagination-btn__wrapper" ref={pagesRef}>
        {pageArr.map(item => (
          <div
            className={classNames(
              'i-pagination-btn',
              current === item && 'i-pagination-btn__active',
              disabled && 'i-pagination-btn__disabled'
            )}
            key={`item${item}`}
            onClick={() => handleChooseNum(item)}
          >
            {item}
          </div>
        ))}
      </section>
      {rightShow && (
        <div
          className={classNames(
            'i-pagination-btn',
            '-handle',
            disabled && 'i-pagination-btn__disabled'
          )}
          onMouseEnter={() => setRightHover(true)}
          onMouseLeave={() => setRightHover(false)}
          onClick={disabled ? () => { } : () => handleChooseNum(current + 5)}
        >
          <Icon name={rightHover ? "ArrowDoubleRight" : "MoreFilled"} size={12} />
        </div>
      )}
    </>
  )

  return (
    <div
      className="i-pagination-control"
    >
      <div
        className={classNames(
          'i-pagination-btn',
          'i-pagination-btn__handle',
          (current === 1 || disabled) && 'i-pagination-btn__disabled'
        )}
        onClick={() => current !== 1 && !disabled && onChoose?.(current - 1)}
      >
        <Icon name="ArrowLeft" size={12} />
      </div>
      {pageArr.length <= 10 ? shortItems : longItems}
      <div
        className={classNames(
          'i-pagination-btn',
          'i-pagination-btn__handle',
          (current === pageArr.length || disabled) && 'i-pagination-btn__disabled'
        )}
        onClick={() => current !== pageArr.length && !disabled && onChoose?.(current + 1)}
      >
        <Icon name="ArrowRight" size={12} />
      </div>
    </div>
  )
}

export default PaginationList;
