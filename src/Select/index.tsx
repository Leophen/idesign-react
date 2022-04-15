import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.scss';
import Dropdown from '../Dropdown';
import { DropdownItemProps } from '../Dropdown'
import Input from '../Input';

export interface SelectProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 选中值
   */
  value?: string | number;
  /**
   * 占位符
   * @default 请选择
   */
  placeholder?: string;
  /**
   * 选中值变化时触发
   */
  onChange?: (value: DropdownItemProps) => void;
}


const SelectItem: React.FC = (props) => {
  const { children } = props;
  return (
    <>{children}</>
  )
}

const Select: React.FC<SelectProps> & { Item: React.ElementType } = (props) => {
  const {
    children,
    className,
    style,
    value,
    placeholder = '请选择',
    onChange = () => { },
    ...others
  } = props;

  const [innerValue, setInnerValue] = useState(value)

  const [dropdownWidth, setDropdownWidth] = useState(0)
  const selectNode = useRef<HTMLDivElement>(null)

  // 子元素转 options
  const [options, setOptions] = useState([])
  useEffect(() => {
    // 更新下拉数据
    let result: any = []
    React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      let currentActive = false
      if (innerValue === child.props.value) {
        currentActive = true
      }
      result.push({
        content: child.props.children,
        value: child.props.value,
        active: child.props.active || currentActive,
      })
    })
    setOptions(result)
    // 更新下拉宽度
    const currentWidth = selectNode.current?.getBoundingClientRect().width || 0
    setDropdownWidth(currentWidth)
  }, [])

  const handleSelect = (item: DropdownItemProps) => {
    setInnerValue(item.value)
    const newOptions = _.cloneDeep(options)
    newOptions.map((it: DropdownItemProps) => {
      it.value === item.value ? (it.active = true) : (it.active = false)
    })
    setOptions(newOptions)
    onChange?.(item)
  }

  const getItemContent = (value: string | number | undefined) => {
    let result: string | number = ''
    const currentItem: DropdownItemProps = options.find((it: DropdownItemProps) => {
      return it.value === value
    }) || {}
    if (typeof currentItem.content === 'string' || typeof currentItem.content === 'number') {
      result = currentItem?.content
    }
    return result
  }

  // 选择器显示隐藏操作
  const [dropdownShow, setDropdownShow] = useState(false)
  const handleTrigger = (visible: boolean) => {
    setDropdownShow(visible)
  }

  return (
    <div
      ref={selectNode}
      className={classNames(
        'i-select',
        className
      )}
      style={{ ...style }}
      {...others}
    >
      <Dropdown
        width={dropdownWidth}
        options={options}
        onClick={handleSelect}
        onTrigger={handleTrigger}
      >
        <Input
          value={getItemContent(innerValue)}
          placeholder={placeholder}
          readonly
          suffixIcon="ArrowDown"
          suffixIconClass={dropdownShow ? "i-select-arrow__show" : ""}
        />
      </Dropdown>
    </div>
  );
};

Select.Item = SelectItem;

SelectItem.displayName = 'SelectItem';
Select.displayName = 'Select';

export default Select;
