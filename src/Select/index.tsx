import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.scss';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Tag from '../Tag';
import { SelectItemProps, SelectProps } from './type';
import { DropdownOption } from '../Dropdown/type';
import useDefault from '../hooks/useDefault';

const SelectItem: React.FC<SelectItemProps> = (props) => {
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
    defaultValue = [],
    placeholder = '请选择',
    options = [],
    size,
    clearable = true,
    prefixIcon,
    suffixIcon,
    prefixIconClass = '',
    suffixIconClass = '',
    cascaderDirection = 'right',
    multiple = false,
    disabled = false,
    onChange = () => { },
    ...restProps
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
        selectData.push({
          content: child.props.children,
          value: child.props.value,
          disabled: child.props.disabled,
          divider: child.props.divider,
          title: child.props.title,
          onClick: child.props.onClick,
        })
      })
      setInnerOptions(selectData)
    }
    // 更新下拉宽度
    const currentWidth = selectNode.current?.getBoundingClientRect().width || 0
    setDropdownWidth(currentWidth)
  }, [])

  // 更新下拉数据
  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);

  const updateValue = (val: string | number | Array<string | number>) => {
    const newVal = _.cloneDeep(val)
    setInnerValue(newVal)
  }

  // 根据 options 的 value 获得对应的 content
  const valToContent = (options: Array<DropdownOption>, val: string | number) => {
    let content: React.ReactNode = ''
    options.map(item => {
      if (item.children && item.children.length > 0) {
        // 级联项
        if (content === '') {
          content = valToContent(item.children, val)
        }
      } else {
        // 单项
        if (item.value === val && item.content && content === '') {
          content = item.content
        }
      }
    })
    return content
  }

  // 选择器输入框文本内容
  const getInputValue = (val: string | number | Array<string | number>) => {
    if (!multiple) {
      // 单选
      if (!Array.isArray(val)) {
        const content = valToContent(innerOptions, val)
        if (typeof content === 'string' || typeof content === 'number') {
          return content
        } else {
          return ''
        }
      } else {
        return ''
      }
    } else {
      // 多选
      if (Array.isArray(innerValue)) {
        if (innerValue.length > 0) {
          return 'i'
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  }

  // 选择器显示隐藏操作
  const [dropdownShow, setDropdownShow] = useState(false)
  const handleTrigger = (visible: boolean) => {
    !disabled && setDropdownShow(visible)
  }

  // 删除多选项
  const handleDelItem = (e: React.MouseEvent, val: string | number) => {
    e.stopPropagation()
    if (Array.isArray(innerValue)) {
      const curInnerValue = _.pull(innerValue, val);
      setInnerValue(_.cloneDeep(curInnerValue))
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    !dropdownShow && e.stopPropagation()
    let nullVal: '' | [] = ''
    if (multiple) {
      nullVal = []
    }
    setInnerValue(nullVal)
  }

  return (
    <div
      ref={selectNode}
      className={classNames(
        'i-select',
        className
      )}
      style={{ ...(style || {}), ...{ width, minWidth: width } }}
      data-size={size}
      {...restProps}
    >
      <Dropdown
        width={dropdownWidth}
        options={innerOptions}
        onClick={updateValue}
        onTrigger={handleTrigger}
        value={innerValue}
        cascaderDirection={cascaderDirection}
        multiple={multiple}
        disabled={disabled}
        size={size}
      >
        <Input
          className={classNames(
            !clearable && 'i-input__hide-clear'
          )}
          value={getInputValue(innerValue)}
          placeholder={placeholder}
          readonly={!disabled}
          disabled={disabled}
          size={size}
          prefixIcon={prefixIcon}
          prefixIconClass={prefixIconClass}
          suffixIcon={suffixIcon ? suffixIcon : "ArrowDown"}
          suffixIconClass={dropdownShow && !suffixIcon ? "i-select-arrow__show" : suffixIconClass}
          clearable
          onClear={handleClear}
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
                    {valToContent(innerOptions, val)}
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
