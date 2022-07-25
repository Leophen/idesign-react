import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash'
import Collapse from '../Collapse';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import { MenuContext } from './index'
import { MenuGroupProps } from './type';

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

export default MenuGroup;
