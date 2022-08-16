import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { MenuItemProps } from './type';

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    children,
    className,
    style,
    value = '',
    onClick,
    // 以下为 Parent 透传
    active,
    index,
    onChange,
    ...restProps
  } = props

  const itemValue = value || String(index)
  const handleClickItem = () => {
    onClick?.(itemValue)
    onChange?.(itemValue)
  }

  return (
    <li
      className={classNames(
        'i-menu-item',
        itemValue === active && 'i-menu-item__active',
        className
      )}
      style={{ ...style }}
      onClick={handleClickItem}
      {...restProps}
    >
      <span className="i-menu-item__txt">{children}</span>
    </li>
  )
}

export default MenuItem;
