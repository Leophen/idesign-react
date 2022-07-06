import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import _ from 'lodash'
import Collapse from '../Collapse';
import Dropdown from '../Dropdown';
import Icon from '../Icon';

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
  active?: string | number;
  /**
   * 默认选中值
   * @default 0
   */
  defaultActive?: string | number;
  /**
   * 前置内容
   */
  prefixContent?: React.ReactNode;
  /**
   * 前置内容
   */
  suffixContent?: React.ReactNode;
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

export interface MenuItemProps {
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
   * 单项唯一标识
   * @default 索引值
   */
  value?: string | number;
  /**
   * 点击单项时触发
   */
  onClick?: (value: string | number) => void;
}

export interface MenuGroupProps {
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
   * 组标题
   */
  title?: React.ReactNode
}

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

const MenuGroup: React.FC<MenuGroupProps> = (props) => {
  // 从 Menu Context 注入全局属性
  const context = useContext(MenuContext);
  const newProps = context ? context.inject(props) : props;

  const {
    children,
    className,
    style,
    title,
    // 以下为 context 传入
    index,
    active,
    direction,
    onChange,
    ...restProps
  } = newProps

  // 水平 group
  const [horizonGroupValues, setHorizonGroupValues] = useState<any[]>([])
  const [horizonGroupOptions, setHorizonGroupOptions] = useState<any[]>([])

  const valuesArr: any[] = []
  // 将 Menu.Item 递归转为 Dropdown 可用的数组，同时更新组 value 集
  const getOptions = (childList: any[]) => {
    const result: any[] = []
    childList.map(item => {
      if (!_.isArray(item.props.children)) {
        const itemValue = item.props.value || item.props.children
        valuesArr.push(itemValue)
        result.push({
          content: item.props.children,
          value: itemValue
        })
      } else {
        const itemValue = item.props.value || item.props.title
        valuesArr.push(itemValue)
        result.push({
          content: item.props.title,
          value: itemValue,
          children: getOptions(item.props.children)
        })
      }
    })
    return result
  }

  useEffect(() => {
    if (direction === 'horizontal') {
      setHorizonGroupOptions([...getOptions(children)])
      setHorizonGroupValues([...valuesArr])
    }
  }, [])

  const handleSelectItem = (val: any) => {
    onChange?.(val)
  }

  const [hover, setHover] = useState(false)
  const handleTrigger = (trigger: boolean) => {
    setHover(trigger)
  }

  return (
    <>
      {direction === 'horizontal' ? (
        <Dropdown
          className='i-menu-item__group-dropdown'
          trigger="hover"
          value={active}
          options={horizonGroupOptions}
          onClick={handleSelectItem}
          onTrigger={handleTrigger}
        >
          <div
            className={classNames(
              'i-menu-item__group-wrapper',
              horizonGroupValues.includes(active) && 'i-menu-item__group-active',
              hover && 'i-menu-item__group-hover',
            )}
            {...restProps}
          >
            <span className="i-menu-item__txt">{title}</span>
            <Icon name="ArrowUpBold" size={12} />
          </div>
        </Dropdown>
      ) : (
        <Collapse
          className={classNames(
            'i-menu-item__group',
            className
          )}
          style={style}
          hideBorder
          iconPlacement='right'
          {...restProps}
        >
          <Collapse.Item title={title}>
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) {
                return null;
              }
              const childProps = {
                index: !_.isArray((child as any).props.children) ? (child as any).props.children : (child as any).props.title,
                active,
                onChange,
                ...(child as any).props
              };
              return React.cloneElement(child, childProps);
            })}
          </Collapse.Item>
        </Collapse>
      )}
    </>
  )
}

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
