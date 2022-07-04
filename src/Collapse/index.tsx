import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import Icon from '../Icon'

export type CollapseValueType = Array<string | number>;

export interface CollapseProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 当前展开项
   */
  active?: CollapseValueType;
  /**
   * 默认展开项
   */
  defaultActive?: CollapseValueType;
  /**
   * 是否为手风琴模式
   * @default false
   */
  accordion?: boolean;
  /**
   * 全局禁用折叠项
   * @default false
   */
  disabled?: boolean;
  /**
   * 默认全部展开
   * @default false
   */
  expandAll?: boolean;
  /**
   * 自定义图标位置
   * @default left
   */
  iconPlacement?: 'left' | 'right';
  /**
   * 切换面板时触发，返回变化的值
   */
  onChange?: (value: CollapseValueType) => void;
}

export interface CollapseItemProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 折叠项标题
   */
  title?: string;
  /**
   * 折叠项唯一标识
   * @default 索引值
   */
  value?: string | number;
  /**
   * 禁用单折叠项
   * @default false
   */
  disabled?: boolean;
  /**
   * 自定义图标位置
   * @default left
   */
  iconPlacement?: 'left' | 'right';
}

export interface CollapseItemAddProps extends CollapseItemProps {
  /**
   * 当前展开项
   */
  innerActive?: CollapseValueType;
  /**
   * 索引值
   */
  index?: number;
  /**
   * 更新展开项操作
   */
  updateInnerActive?: (value: string | number) => void
}

const CollapseItem: React.FC<CollapseItemProps> = (props) => {
  // 从 Collapse Context 注入全局属性
  const context = useContext(CollapseContext);
  const newProps: CollapseItemAddProps = context ? context.inject(props) : props;

  const {
    children,
    className,
    style,
    title,
    value,
    disabled = false,
    index,
    innerActive,
    updateInnerActive,
    iconPlacement = 'left',
    ...restProps
  } = newProps;

  const itemValue = value || index;
  const isActive = Array.isArray(innerActive) ? innerActive.includes(itemValue as string | number) : innerActive === itemValue;

  const handleClickHeader = () => {
    if (!disabled) {
      updateInnerActive?.(itemValue as string | number);
    }
  }

  const contentInnerRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  useEffect(() => {
    const height = contentInnerRef.current?.getBoundingClientRect().height || 0
    setContentHeight(height + 16) // 加上下 padding
  })

  return (
    <div
      className={classNames(
        'i-collapse-item',
        disabled && 'i-collapse-item__disabled',
        iconPlacement === 'right' && 'i-collapse-item__icon-right',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      <header
        className={classNames(
          'i-collapse-item__header',
          !isActive && 'i-collapse-item__header-fold'
        )}
        onClick={handleClickHeader}
      >
        <Icon
          name="ArrowCaretRight"
          style={{
            transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)'
          }}
        />
        {title}
      </header>

      <section
        className={classNames(
          'i-collapse-item__content',
          isActive && 'i-collapse-item__content-unfold'
        )}
        style={{ height: isActive ? contentHeight : 0 }}
      >
        <div
          className="i-collapse-item__content-inner"
          ref={contentInnerRef}
        >
          {children}
        </div>
      </section>
    </div>
  )
}

export interface CollapseContextValue {
  inject: (props: CollapseItemProps) => CollapseItemAddProps;
}

export const CollapseContext = React.createContext<CollapseContextValue>(null as any);

const Collapse: React.FC<CollapseProps> & { Item: React.ElementType } = (props) => {
  let defaultVal: CollapseValueType = []
  React.Children.map(props.children, (child, index) => {
    !props.defaultActive && props.expandAll && (defaultVal.push((child as any).props.value || index))
  })

  const {
    children = '',
    className,
    style,
    active,
    defaultActive = defaultVal,
    accordion = false,
    disabled = false,
    expandAll = false,
    iconPlacement = 'left',
    onChange,
    ...restProps
  } = props;

  const [innerActive, setInnerActive] = useDefault(active, defaultActive, onChange);

  // 更新展开项
  const updateInnerActive = (value: string | number) => {
    let newValue: CollapseValueType = [].concat(innerActive as any || []);
    const index = newValue.indexOf(value);
    if (index >= 0) {
      newValue.splice(index, 1);
    } else if (accordion) {
      newValue = [value];
    } else {
      newValue.push(value);
    }
    setInnerActive([...newValue]);
  };

  // 注入每一项的 context
  const context: CollapseContextValue = {
    // 将 props 注入每一项子节点的方法
    inject: (singleCollapseProps: CollapseItemProps) => {
      return {
        innerActive,
        disabled,
        updateInnerActive,
        iconPlacement,
        ...singleCollapseProps,
      };
    },
  };

  return (
    <CollapseContext.Provider value={context}>
      <div
        className={classNames(
          'i-collapse',
          className
        )}
        style={{ ...style }}
        {...restProps}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          const childProps = {
            index,
            ...child.props,
          };
          return React.cloneElement(child, childProps);
        })}
      </div>
    </CollapseContext.Provider>
  );
};

Collapse.Item = CollapseItem;

CollapseItem.displayName = 'CollapseItem';
Collapse.displayName = 'Collapse';

export default Collapse;
