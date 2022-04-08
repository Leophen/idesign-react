import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Popup from '../Popup';

export interface IdDropdownItemProps {
  /**
   * 是否高亮当前操作项
   * @default false
   */
  active?: boolean;
  /**
   * 下拉操作项内容
   * @default ''
   */
  content?: React.ReactNode;
  /**
   * 是否禁用操作项
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否显示操作项之间的分隔线（分隔线默认在下方）
   * @default false
   */
  divider?: boolean;
  /**
   * 下拉操作项唯一标识
   */
  value?: string | number;
  /**
   * 点击时触发
   */
  onClick?: (dropdownItem: DropdownOption, context: { e: React.MouseEvent<HTMLDivElement> }) => void;
}

export type DropdownOption = { children?: Array<IdDropdownItemProps> } & IdDropdownItemProps & Record<string, any>;

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
   * 点击菜单项触发事件
   */
  onClick?: (dropdownItem: DropdownOption, event: React.MouseEvent) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    children = '',
    className,
    style,
    options = [],
    placement = 'bottom',
    trigger = 'click',
    onClick = () => { }
  } = props;

  const [popupVisible, setPopupVisible] = useState(false)

  const switchPopup = (visible: boolean) => {
    setPopupVisible(visible)
  }

  const handleItemClick = (item: DropdownOption, event: React.MouseEvent) => {
    onClick?.(item, event)
    setPopupVisible(false)
  }

  const DropdownContent = (
    <div
      className={classNames(
        'i-dropdown',
        className
      )}
      style={style}
    >
      <ul className="i-dropdown__menu">
        {
          options.map((item) => {
            return (
              <li
                className="i-dropdown__item"
                onClick={(e) => handleItemClick(item, e)}
                key={item.value}
              >
                {item.content}
              </li>
            )
          })
        }
      </ul>
    </div>
  )

  return (
    <Popup
      content={DropdownContent}
      placement={placement}
      trigger={trigger}
      visible={popupVisible}
      onTrigger={switchPopup}
    >
      {children}
    </Popup>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
