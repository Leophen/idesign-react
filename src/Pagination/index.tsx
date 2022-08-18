import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Input from '../Input';
import _ from 'lodash';
import PaginationSelect from './PaginationSelect';
import PaginationList from './PaginationList';
import { PaginationProps } from './type';

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
    pageData.current = 1
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
            onBlur={handleInputEnter}
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
