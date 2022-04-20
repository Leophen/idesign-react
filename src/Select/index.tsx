import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.scss';
import Dropdown from '../Dropdown';
import { DropdownOption } from '../Dropdown'
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
  value?: string | number | Array<string | number>;
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
  onChange?: (value: string | number | Array<string | number>) => void;
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
    value = [],
    placeholder = '请选择',
    options = [],
    multiple = false,
    onChange = () => { },
    ...others
  } = props;

  // 转换下拉数据及更新下拉框宽度
  const selectNode = useRef<HTMLDivElement>(null)
  const [innerOptions, setInnerOptions] = useState(options)
  const [dropdownWidth, setDropdownWidth] = useState(0)
  useEffect(() => {
    // Select.Item 模式 -> 更新下拉数据
    if (children) {
      let selectData: any = []
      React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        let currentActive = false
        if (innerValue === child.props.value) {
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

  // 更新下拉数据
  const [updateKey, setUpdateKey] = useState(0)
  const [innerValue, setInnerValue] = useState(value)

  const handleSelect = (val: string | number | Array<string | number>) => {
    setInnerValue(val)
    setUpdateKey(new Date().getTime())
    onChange?.(val)
  }

  const getItemContent = (val: string | number | Array<string | number>) => {
    let content = ''
    innerOptions.map(item => {
      if (item.value === val && item.content) {
        content = item.content.toString()
      }
    })
    return content
  }

  // 选择器显示隐藏操作
  const [dropdownShow, setDropdownShow] = useState(false)
  const handleTrigger = (visible: boolean) => {
    setDropdownShow(visible)
  }

  // 删除多选项
  const handleDelItem = (e: React.MouseEvent, val: string | number) => {
    e.stopPropagation()
    if (Array.isArray(innerValue)) {
      const curInnerValue = innerValue
      let delIndex = 0
      curInnerValue.map((item, index) => item === val && (delIndex === index))
      curInnerValue.splice(delIndex, 1)
      setUpdateKey(new Date().getTime())
      setInnerValue(curInnerValue)
    }
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
        value={innerValue}
        selected={true}
        multiple={multiple}
      >
        <Input
          value={!multiple ? getItemContent(innerValue) : undefined}
          placeholder={(!multiple || (Array.isArray(innerValue) && innerValue.length) === 0) ? placeholder : ''}
          readonly
          suffixIcon="ArrowDown"
          suffixIconClass={dropdownShow ? "i-select-arrow__show" : ""}
        >
          {multiple && Array.isArray(innerValue) && innerValue.length > 0 && (
            <div className='i-select__multiple-wrap'>
              {
                innerValue.map(val => (
                  <Tag
                    theme="dark"
                    size="small"
                    onClose={(e: React.MouseEvent) => handleDelItem(e, val)}
                    key={val}
                  >
                    {getItemContent(val)}
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
