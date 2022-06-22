import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface MenuProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 导航宽度
   */
  width?: number;
  /**
   * 当前选中值
   */
  active: string | number;
  /**
   * 前置内容
   */
  prefixContent: React.ReactNode;
  /**
   * 前置内容
   */
  suffixContent: React.ReactNode;
  /**
   * 导航方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 点击菜单项时触发
   */
  onChange?: (value: string | number) => void;
}

export interface MenuItemProps extends MenuProps {
  /**
   * 单项值
   */
  value: string | number;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    children,
    className,
    style,
    value = '',
    active,
    onChange
  } = props

  return (
    <li
      className={classNames(
        'i-menu-item',
        value === active && 'i-menu-item__active',
        className
      )}
      style={{ ...style }}
      onClick={() => onChange?.(value)}
    >
      {children}
    </li>
  )
}

const Menu: React.FC<MenuProps> & { Item: React.ElementType } = (props) => {
  const {
    children,
    className,
    style,
    width,
    active,
    prefixContent,
    suffixContent,
    direction = 'horizontal',
    onChange,
    ...restProps
  } = props;

  return (
    <div
      className={classNames(
        'i-menu',
        direction === 'vertical' && 'i-menu__vertical',
        className
      )}
      style={{ ...style, width }}
      {...restProps}
    >
      {prefixContent && (
        <header className="i-menu__logo">
          {prefixContent}
        </header>
      )}
      <ul className="i-menu-item__wrapper">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          const childProps = {
            active,
            onChange
          };
          return React.cloneElement(child, childProps);
        })}
      </ul>
      {suffixContent && (
        <footer className="i-menu__operations">
          {suffixContent}
        </footer>
      )}
    </div>
  )
};

Menu.Item = MenuItem;

MenuItem.displayName = 'MenuItem';
Menu.displayName = 'Menu';

export default Menu;
