import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.scss';
import Popup from '../Popup';
import DropdownMenu from './DropdownMenu';
import { DropdownOption, DropdownProps, DropdownValue } from './type';

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    children = '',
    className,
    contentClassName,
    style,
    width,
    maxHeight,
    size,
    value,
    options = [],
    placement = 'bottom',
    trigger = 'click',
    cascaderDirection = 'right',
    multiple = false,
    disabled = false,
    noPadding = true,
    sameWidth = false,
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
  const [updateKey, setUpdateKey] = useState(0)
  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(value)
    }
  }, [value])

  const handleClickItem = (item: DropdownOption, event: React.MouseEvent) => {
    if (!multiple) {
      // 单选模式
      onClick?.(item.value, event)
      setPopupVisible(false)
      onTrigger?.(false)
    } else {
      // 多选模式
      let delIndex = 0
      let curMultiSelected: DropdownValue | undefined = innerValue
      !Array.isArray(curMultiSelected) && (curMultiSelected = [])
      curMultiSelected.map((it: string | number, index: number) => {
        if (it === item.value) {
          delIndex = index
        }
      })
      curMultiSelected.includes(item.value) ? curMultiSelected.splice(delIndex, 1) : curMultiSelected.push(item.value)
      setUpdateKey(updateKey + 1)
      onClick?.(curMultiSelected, event)
    }
  }

  const DropdownContent = (
    <div
      className={classNames(
        'i-dropdown',
        contentClassName
      )}
      style={{ ...(style || {}), ...{ width: width ? width : 'auto', maxHeight, overflowY: maxHeight ? 'auto' : 'unset' } }}
    >
      <DropdownMenu
        size={size}
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
      portalClassName={className}
      content={DropdownContent}
      placement={placement}
      trigger={trigger}
      visible={popupVisible}
      disabled={disabled}
      noPadding={noPadding}
      sameWidth={sameWidth}
      onTrigger={switchPopup}
    >
      {children}
    </Popup>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
