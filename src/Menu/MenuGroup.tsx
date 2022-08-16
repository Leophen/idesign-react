import React, { ReactElement, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash'
import Collapse from '../Collapse';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import { MenuGroupProps } from './type';

const MenuGroup: React.FC<MenuGroupProps> = (props) => {
  const {
    children,
    className,
    style,
    title,
    // 以下为 Parent 透传
    index,
    active,
    direction,
    onChange,
    ...restProps
  } = props

  // 水平 group
  const [horizonGroupValues, setHorizonGroupValues] = useState<any[]>([])
  const [horizonGroupOptions, setHorizonGroupOptions] = useState<any[]>([])

  const valuesArr: any[] = []
  // 将 Menu.Item 递归转为 Dropdown 可用的数组，同时更新组 value 集
  const mergeIndex = (itemIdx: number, injectIdx: string | number) => {
    return `${injectIdx}.${itemIdx}`
  }
  const getOptions = (childList: any, injectIdx: string) => {
    const result: any[] = []
    React.Children.map(childList, (item, itemIdx) => {
      if (!_.isArray(item.props.children)) {
        const itemValue = item.props.value || mergeIndex(itemIdx, injectIdx)
        valuesArr.push(itemValue)
        result.push({
          content: item.props.children,
          value: itemValue
        })
      } else {
        // 嵌套
        const itemValue = item.props.value || mergeIndex(itemIdx, injectIdx)
        valuesArr.push(itemValue)
        result.push({
          content: item.props.title,
          value: itemValue,
          children: getOptions(item.props.children, mergeIndex(itemIdx, injectIdx))
        })
      }
    })
    return result
  }

  useEffect(() => {
    if (direction === 'horizontal') {
      setHorizonGroupOptions([...getOptions(children, String(index))])
      setHorizonGroupValues([...valuesArr])
    }
  }, [])

  const handleSelectItem = (val: string | number | Array<string | number>) => {
    onChange?.(val as string | number)
  }

  const [hover, setHover] = useState(false)
  const handleTrigger = (trigger: boolean) => {
    setHover(trigger)
  }

  const getRenderList = (childList: any, groupIdx: string | number) => {
    const result: ReactNode[] = []
    childList.map((item: ReactElement, itemIdx: number) => {
      if (_.isArray(item.props.children)) {
        const itemProps = {
          index: mergeIndex(itemIdx, groupIdx),
          key: mergeIndex(itemIdx, groupIdx),
          active,
          onChange,
          ...item.props,
          children: getRenderList(item.props.children, mergeIndex(itemIdx, groupIdx)),
        }
        result.push(React.cloneElement(item, itemProps))
      } else {
        const itemProps = {
          index: mergeIndex(itemIdx, groupIdx),
          key: mergeIndex(itemIdx, groupIdx),
          active,
          onChange,
          ...item.props
        }
        result.push(React.cloneElement(item, itemProps))
      }
    })
    return result
  }

  const renderVertical = getRenderList(children, index)

  const ifGroupActive = (childList: ReactNode[]) => {
    let result = false
    Array.from(childList).map((item: any) => {
      if (_.isArray(item.props.children)) {
        ifGroupActive(item.props.children) && (result = true)
      } else {
        if (item.props.value) {
          (item.props.value === active) && (result = true)
        } else {
          (item.props.index === active) && (result = true)
        }
      }
    })
    return result
  }

  return (
    <>
      {direction === 'horizontal' ? (
        <Dropdown
          className='i-menu-item__group-dropdown'
          trigger="click"
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
            ifGroupActive(renderVertical) && 'i-menu-item__group-active',
            className
          )}
          style={style}
          hideBorder
          expandAll={ifGroupActive(renderVertical)}
          iconPlacement='right'
          {...restProps}
        >
          <Collapse.Item title={title}>
            {renderVertical}
          </Collapse.Item>
        </Collapse>
      )}
    </>
  )
}

export default MenuGroup;
