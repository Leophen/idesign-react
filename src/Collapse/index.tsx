import React from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import CollapseItem from './CollapseItem';
import { CollapseContextValue, CollapseItemProps, CollapseProps, CollapseValueType } from './type';

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
    hideBorder = false,
    noIndent = false,
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
          hideBorder && 'i-collapse__hide-border',
          noIndent && 'i-collapse__no-indent',
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
