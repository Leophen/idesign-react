import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Select from '../Select';
import Icon from '../Icon';
import Input from '../Input';
import _ from 'lodash';

export interface PageInfo {
  current: number;
  pageSize: number;
}

export interface PaginationProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 当前页
   * @default 1
   */
  current?: number;
  /**
   * 数据总条数
   * @default 0
   */
  total?: number
  /**
   * 分页总页数
   * @default 10
   */
  pageSize?: number;
  /**
   * 全局禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否隐藏分页选择器
   * @default false
   */
  hideSelect?: boolean;
  /**
   * 是否隐藏跳转输入框
   * @default false
   */
  hideInput?: boolean;
  /**
   * 当前页或分页发生变化时触发
   */
  onChange?: (pageInfo: PageInfo) => void;
}

export interface PaginationSelectProps {
  /**
   * 每页条数
   * @default 10
   */
  value?: number
  /**
   * 禁用状态
   * @default false
   */
  disabled?: boolean;
  /**
   * 选择每页条数时触发
   */
  onSelect?: (val: number) => void
}

export interface PaginationListProps extends PaginationProps {
  /**
   * 点击页数时触发
   */
  onChoose?: (val: number) => void
}

const PaginationSelect: React.FC<PaginationSelectProps> = (props) => {
  const {
    value = 10,
    disabled = false,
    onSelect
  } = props

  const options = [
    {
      content: '10 条/页',
      value: 10
    },
    {
      content: '20 条/页',
      value: 20
    },
    {
      content: '30 条/页',
      value: 30
    },
    {
      content: '40 条/页',
      value: 40
    },
    {
      content: '50 条/页',
      value: 50
    }
  ]

  const handleChange = (val: string | number | Array<string | number>) => {
    onSelect?.(val as number)
  }

  return (
    <div className="i-pagination-select">
      <Select
        value={value}
        disabled={disabled}
        options={options}
        clearable={false}
        onChange={handleChange}
      />
    </div>
  )
}

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
    pagesRef.current && pagesRef.current.scrollTo({
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

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    className,
    style,
    current = 1,
    total = 0,
    pageSize = 10,
    disabled = false,
    hideSelect = false,
    hideInput = false,
    onChange,
    ...restProps
  } = props;

  const [pageData, setPageData] = useState({
    current: current,
    total: total,
    pageSize: pageSize,
  })

  const switchPageSize = (pageSize: number) => {
    console.log(current, total, pageSize)
    pageData.pageSize = pageSize
    setPageData({ ...pageData })
    onChange?.(pageData)
  }

  const clickPageNum = (page: number) => {
    pageData.current = page
    setPageData({ ...pageData })
    onChange?.(pageData)
  }

  const [inputVal, setInputVal] = useState(String(pageData.current))

  useEffect(() => {
    setInputVal(String(pageData.current))
  }, [pageData.current])

  const handleInputEnter = (val: string) => {
    if (val !== '') {
      clickPageNum(Number(val))
    } else {
      clickPageNum(1)
    }
  }

  const handleInputChange = (val: string) => {
    setInputVal(val)
  }

  return (
    <div
      className={classNames(
        'i-pagination',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      {!hideSelect && (
        <PaginationSelect
          value={pageData.pageSize}
          disabled={disabled}
          onSelect={switchPageSize}
        />
      )}
      <PaginationList
        current={pageData.current}
        total={pageData.total}
        pageSize={pageData.pageSize}
        disabled={disabled}
        onChoose={clickPageNum}
      />
      {!hideInput && (
        <section className='i-pagination-input'>
          <span>前往</span>
          <Input
            style={{
              width: String(_.ceil(pageData.total / pageData.pageSize)).length * 8 + 20
            }}
            placeholder=''
            type='number'
            speed='slow'
            hideNumberBtn
            value={inputVal}
            disabled={disabled}
            maxNumber={_.ceil(pageData.total / pageData.pageSize)}
            minNumber={1}
            onChange={handleInputChange}
            onEnter={handleInputEnter}
            onMoveUp={handleInputEnter}
          />
          <span>页</span>
        </section>
      )}
    </div>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
