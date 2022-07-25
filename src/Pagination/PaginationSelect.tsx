import React from 'react';
import './index.scss';
import Select from '../Select';
import { PaginationSelectProps } from './type';

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

export default PaginationSelect;
