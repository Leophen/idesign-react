import React, { ReactElement } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import MenuItem from './MenuItem';
import MenuGroup from './MenuGroup';
import { MenuItemProps, MenuProps } from './type';

const Menu: React.FC<MenuProps> & {
  Item: React.ElementType,
  Group: React.ElementType
} = (props) => {
  // 初始默认值（导航第一项）
  let defaultVal
  React.Children.map(props.children, (child, index) => {
    index === 0 && (defaultVal = (child as ReactElement).props.value || '0')
  })

  const {
    children,
    className,
    style,
    width,
    active,
    defaultActive = defaultVal,
    prefixContent,
    suffixContent,
    direction = 'horizontal',
    onChange,
    ...restProps
  } = props;

  const [innerActive, setInnerActive] = useDefault(active, defaultActive, onChange);

  const handleChange = (val: string | number) => {
    setInnerActive(val)
  }

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
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          const childProps = {
            index,
            direction,
            active: innerActive,
            onChange: handleChange,
            ...child.props
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
Menu.Group = MenuGroup;

MenuItem.displayName = 'MenuItem';
MenuGroup.displayName = 'MenuGroup';
Menu.displayName = 'Menu';

export default Menu;
