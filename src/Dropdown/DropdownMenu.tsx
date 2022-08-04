import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.scss';
import Icon from '../Icon';
import { DropdownMenuProps, DropdownOption } from './type';

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const {
    options = [],
    width,
    maxHeight,
    size,
    cascaderDirection = 'right',
    multiple = false,
    selectedValue = [],
    clickItem = () => { }
  } = props

  const handleItemClick = (item: DropdownOption, event: React.MouseEvent) => {
    event.stopPropagation()
    !(item.children && item.children?.length > 0) && clickItem?.(item, event)
    item.onClick?.(item, event)
  }

  const clickCascaderItem = (item: DropdownOption, event: React.MouseEvent) => {
    clickItem?.(item, event)
    item.onClick?.(item, event)
  }

  return (
    <ul
      className={classNames(
        'i-dropdown__menu',
        cascaderDirection === 'left' && 'i-dropdown__menu-left'
      )}
      style={{ width: width ? width : 'auto', maxHeight, overflowY: maxHeight ? 'auto' : 'unset' }}
    >
      {options.map((item, index) => {
        return (
          <li key={`${item.value}${index}}`}>
            {item.title && <header className="i-dropdown__item-header">{item.title}</header>}
            <div
              className={classNames(
                'i-dropdown__item',
                size && `i-dropdown__item--size-${size}`,
                item.disabled && 'i-dropdown__item-is-disabled',
                item.divider && 'i-dropdown__item-has-divider',
                item.value === selectedValue && 'i-dropdown__item-is-active',
                item.children && item.children?.length > 0 && 'i-dropdown__item-cascader',
                multiple && 'i-dropdown__item-multiple'
              )}
              data-direction={cascaderDirection}
              data-disabled={item.disabled}
              onClick={!item.disabled ? ((e) => handleItemClick(item, e)) : () => { }}
            >
              {item.children && item.children?.length > 0 && cascaderDirection === 'left' && <Icon name="ArrowLeft" size={12} color="var(--i-font-2)" />}
              <div
                className={classNames(
                  'i-dropdown__item-txt',
                  ((!multiple && item.value === selectedValue) || (multiple && Array.isArray(selectedValue) && selectedValue.includes(item.value)))
                  && 'i-dropdown__item-txt-is-active'
                )}
              >
                {item.content}
              </div>
              {item.children && item.children?.length > 0 && cascaderDirection === 'right' && <Icon name="ArrowRight" size={12} color="var(--i-font-2)" />}
              {item.children && item.children?.length > 0 &&
                <DropdownMenu
                  options={item.children}
                  width={item.width}
                  maxHeight={item.maxHeight}
                  size={size}
                  cascaderDirection={cascaderDirection}
                  multiple={multiple}
                  selectedValue={selectedValue}
                  clickItem={!item.disabled ? clickCascaderItem : () => { }}
                />
              }
              {multiple &&
                <div className="i-dropdown__item-check">
                  {Array.isArray(selectedValue) && selectedValue.includes(item.value) &&
                    <Icon name="Check" size={12} />
                  }
                </div>
              }
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default DropdownMenu;
