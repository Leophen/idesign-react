import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.scss';
import Popup from '../Popup';
import Icon from '../Icon';

export interface DropdownItemProps {
  /**
   * 下拉操作项内容
   * @default ''
   */
  content?: React.ReactNode;
  /**
   * 下拉操作项唯一标识
   */
  value: string | number;
  /**
   * 级联子项宽度
   */
  width?: number;
  /**
   * 级联子项最大高度
   */
  maxHeight?: number;
  /**
   * 单项是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否显示操作项之后的分隔线
   * @default false
   */
  divider?: boolean;
  /**
   * 点击时触发
   */
  onClick?: (dropdownItem: DropdownOption, event: React.MouseEvent) => void;
}

export interface DropdownMenuProps {
  /**
   * 下拉操作项
   * @default []
   */
  options?: Array<DropdownOption>;
  /**
   * 下拉列表宽度
   */
  width?: number;
  /**
   * 级联子项最大高度
   */
  maxHeight?: number;
  /**
   * 级联子层级展开方向
   * @default right
   */
  cascaderDirection?: 'left' | 'right';
  /**
   * 是否可多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 是否可多选
   */
  selectedValue?: string | number | Array<string | number>;
  /**
   * 点击菜单项触发事件
   */
  clickItem?: (dropdownItem: DropdownOption, event: React.MouseEvent) => void;
}

export type DropdownOption = { children?: Array<DropdownItemProps> } & DropdownItemProps & Record<string, any>;

export interface DropdownProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 下拉列表宽度
   */
  width?: number;
  /**
   * 列表项最大高度
   */
  maxHeight?: number;
  /**
   * 下拉选中项
   */
  value?: string | number | Array<string | number>;
  /**
   * 下拉操作项
   * @default []
   */
  options?: Array<DropdownOption>;
  /**
   * 菜单触发位置
   * @default bottom
   */
  placement?:
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';
  /**
   * 菜单触发方式
   * @default click
   */
  trigger?: 'hover' | 'click' | 'context-menu';
  /**
   * 是否可多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 级联子层级展开方向
   * @default right
   */
  cascaderDirection?: 'left' | 'right';
  /**
   * 是否全局禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 点击菜单项触发事件
   */
  onClick?: (value: string | number | Array<string | number>, event: React.MouseEvent) => void;
  /**
   * 切换下拉操作时触发
   */
  onTrigger?: (visible: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const {
    options = [],
    width,
    maxHeight,
    cascaderDirection = 'right',
    multiple = false,
    selectedValue = [],
    clickItem = () => { }
  } = props

  const handleItemClick = (item: DropdownOption, event: React.MouseEvent) => {
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
          <li
            className={classNames(
              'i-dropdown__item',
              item.disabled && 'i-dropdown__item-is-disabled',
              item.divider && 'i-dropdown__item-has-divider',
              item.value === selectedValue && 'i-dropdown__item-is-active',
              multiple && 'i-dropdown__item-multiple'
            )}
            data-direction={cascaderDirection}
            data-disabled={item.disabled}
            onClick={!item.disabled ? ((e) => handleItemClick(item, e)) : () => { }}
            key={`${item.value}${index}}`}
          >
            {item.children && item.children?.length > 0 && cascaderDirection === 'left' && <Icon name="ArrowLeft" size={12} color="rgba(0,0,0,.6)" />}
            <div
              className={classNames(
                'i-dropdown__item-txt',
                ((!multiple && item.value === selectedValue) || (multiple && Array.isArray(selectedValue) && selectedValue.includes(item.value)))
                && 'i-dropdown__item-txt-is-active'
              )}
            >
              {item.content}
            </div>
            {item.children && item.children?.length > 0 && cascaderDirection === 'right' && <Icon name="ArrowRight" size={12} color="rgba(0,0,0,.6)" />}
            {item.children && item.children?.length > 0 &&
              <DropdownMenu
                options={item.children}
                width={item.width}
                maxHeight={item.maxHeight}
                cascaderDirection={cascaderDirection}
                multiple={multiple}
                selectedValue={selectedValue}
                clickItem={!item.disabled ? clickCascaderItem : () => { }}
              />
            }
            {multiple &&
              <div className="i-dropdown__item-check">
                {Array.isArray(selectedValue) && selectedValue.includes(item.value) &&
                  <Icon name="Check" size={14} />
                }
              </div>
            }
          </li>
        )
      })}
    </ul>
  )
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    children = '',
    className,
    style,
    width,
    maxHeight,
    value,
    options = [],
    placement = 'bottom',
    trigger = 'click',
    cascaderDirection = 'right',
    multiple = false,
    disabled = false,
    onClick = () => { },
    onTrigger = () => { }
  } = props;

  const [popupVisible, setPopupVisible] = useState(false)

  const switchPopup = (visible: boolean) => {
    setPopupVisible(visible)
    onTrigger?.(visible)
  }

  const [dropdownOptions, setDropdownOptions] = useState(options)
  useEffect(() => {
    setDropdownOptions(options)
  }, [options])

  // 下拉选中项
  const [innerValue, setInnerValue] = useState(value)
  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(value)
    }
  }, [value])

  const [multiHandleKey, setMultiHandleKey] = useState(0)
  const handleClickItem = (item: DropdownOption, event: React.MouseEvent) => {
    if (!multiple) {
      // 单选模式
      onClick?.(item.value, event)
      setPopupVisible(false)
      onTrigger?.(false)
    } else {
      // 多选模式
      let delIndex = 0
      let curMultiSelected: any = innerValue
      !Array.isArray(curMultiSelected) && (curMultiSelected = [])
      curMultiSelected.map((it: string | number, index: number) => {
        if (it === item.value) {
          delIndex = index
        }
      })
      curMultiSelected.includes(item.value) ? curMultiSelected.splice(delIndex, 1) : curMultiSelected.push(item.value)
      setMultiHandleKey(new Date().getTime()) // 更新下拉内容
      onClick?.(curMultiSelected, event)
    }
  }

  const DropdownContent = (
    <div
      className={classNames(
        'i-dropdown',
        className
      )}
      style={{ ...(style || {}), ...{ width: width ? width : 'auto', maxHeight, overflowY: maxHeight ? 'auto' : 'unset' } }}
    >
      <DropdownMenu
        options={dropdownOptions}
        cascaderDirection={cascaderDirection}
        multiple={multiple}
        selectedValue={innerValue}
        clickItem={handleClickItem}
      />
    </div>
  )

  return (
    <Popup
      content={DropdownContent}
      placement={placement}
      trigger={trigger}
      visible={popupVisible}
      disabled={disabled}
      onTrigger={switchPopup}
    >
      {children}
    </Popup>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
