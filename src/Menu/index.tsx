import React from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import MenuItem from './MenuItem';
import MenuGroup from './MenuGroup';
import { MenuItemProps, MenuProps } from './type';

export const MenuContext = React.createContext(null as any);

const Menu: React.FC<MenuProps> & {
  Item: React.ElementType,
  Group: React.ElementType
} = (props) => {
  let defaultVal
  React.Children.map(props.children, (child, index) => {
    index === 0 && (defaultVal = (child as any).props.value || 0)
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

  // 注入每一项的 context
  const context = {
    // 将 props 注入每一项子节点的方法
    inject: (singleMenuProps: MenuItemProps) => {
      return {
        direction,
        ...singleMenuProps,
      };
    },
  };

  const handleChange = (val: string | number) => {
    setInnerActive(val)
  }

  return (
    <MenuContext.Provider value={context}>
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
    </MenuContext.Provider>
  )
};

Menu.Item = MenuItem;
Menu.Group = MenuGroup;

MenuItem.displayName = 'MenuItem';
MenuGroup.displayName = 'MenuGroup';
Menu.displayName = 'Menu';

export default Menu;
