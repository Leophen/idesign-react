import React, { useContext } from 'react';
import classNames from 'classnames';
import './index.scss';
import { MenuContext } from './index';
import { MenuItemProps } from './type';

const MenuItem: React.FC<MenuItemProps> = (props) => {
  // 从 Menu Context 注入全局属性
  const context = useContext(MenuContext);
  const newProps = context ? context.inject(props) : props;

  const {
    children,
    className,
    style,
    value = '',
    onClick,
    // 以下为 context 传入
    active,
    index,
    onChange,
    ...restProps
  } = newProps

  const itemValue = value || index
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
