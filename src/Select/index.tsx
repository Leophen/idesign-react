import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.scss';
import Dropdown from '../Dropdown';
import { DropdownOption, DropdownItemProps } from '../Dropdown'
import Input from '../Input';
import Tag from '../Tag';

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
   * 选择器宽度
   * @default 100%
   */
  width?: string | number;
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
   * 下拉操作项
   * @default []
   */
  options?: Array<DropdownOption>;
  /**
   * 是否可多选
   * @default false
   */
  multiple?: boolean;
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
    width,
    value,
    placeholder = '请选择',
    options = [],
    multiple = false,
    onChange = () => { },
    ...others
  } = props;

  const [inputValue, setInputValue] = useState(value)
  const [multipleSelected, setMultipleSelected] = useState<DropdownOption[]>([])

  const [dropdownWidth, setDropdownWidth] = useState(0)
  const selectNode = useRef<HTMLDivElement>(null)

  const [innerOptions, setInnerOptions] = useState(options)
  useEffect(() => {
    // Select.Item 模式 -> 更新下拉数据
    if (children) {
      let selectData: any = []
      React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        let currentActive = false
        if (inputValue === child.props.value) {
          currentActive = true
        }
        selectData.push({
          content: child.props.children,
          value: child.props.value,
          active: child.props.active || currentActive,
        })
      })
      setInnerOptions(selectData)
    }
    // 更新下拉宽度
    const currentWidth = selectNode.current?.getBoundingClientRect().width || 0
    setDropdownWidth(currentWidth)
  }, [])

  const handleSelect = (item: any) => {
    if (!multiple) {
      setInputValue(item.value)
      const newOptions = _.cloneDeep(innerOptions)
      newOptions.map((it: DropdownItemProps) => {
        it.value === item.value ? (it.active = true) : (it.active = false)
      })
      setInnerOptions(newOptions)
    } else {
      setMultipleSelected(item)
    }
    onChange?.(item)
  }

  const getItemContent = (value: string | number | undefined) => {
    let result: string | number = ''
    const currentItem: DropdownItemProps = innerOptions.find((it: DropdownItemProps) => {
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

  // 删除多选项
  const handleDelItem = (e: React.MouseEvent, item: DropdownItemProps) => {
    e.stopPropagation()
    console.log(multiList,singleList)
  }

  return (
    <div
      ref={selectNode}
      className={classNames(
        'i-select',
        className
      )}
      style={{ ...(style || {}), ...{ width } }}
      {...others}
    >
      <Dropdown
        width={dropdownWidth}
        options={innerOptions}
        onClick={handleSelect}
        onTrigger={handleTrigger}
        multiple={multiple}
      >
        <Input
          value={!multiple ? getItemContent(inputValue) : undefined}
          placeholder={(!multiple || multipleSelected.length === 0) ? placeholder : ''}
          readonly
          suffixIcon="ArrowDown"
          suffixIconClass={dropdownShow ? "i-select-arrow__show" : ""}
        >
          {multiple && multipleSelected.length > 0 && (
            <div className='i-select__multiple-wrap'>
              {
                multipleSelected.map(item => (
                  <Tag
                    theme="dark"
                    size="small"
                    onClose={(e: React.MouseEvent) => handleDelItem(e, item)}
                    key={item.value}
                  >
                    {item.content}
                  </Tag>
                ))
              }
            </div>
          )}
        </Input>
      </Dropdown>
    </div>
  );
};

Select.Item = SelectItem;

SelectItem.displayName = 'SelectItem';
Select.displayName = 'Select';

export default Select;
