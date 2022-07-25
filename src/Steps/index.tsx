import React, { useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';
import StepsItem from './StepsItem';
import { StepsContextValue, StepsProps } from './type';

export const StepsContext = React.createContext<StepsContextValue>(null as any);

const Steps: React.FC<StepsProps> & { Item: React.ElementType } = (props) => {
  const {
    children = '',
    className,
    style,
    current = 0,
    layout = 'horizontal',
    reverse,
    dot = false
  } = props;

  // 注入每一项的 context
  const context: StepsContextValue = {
    // 将 props 注入每一项子节点的方法
    inject: (stepsItemProps: StepsProps) => {
      return {
        current,
        ...stepsItemProps,
      };
    },
  };

  const stepItemList = useMemo(() => {
    const childrenList = React.Children.toArray(children);
    const childrenDisplayList = reverse ? childrenList.reverse() : childrenList;

    return childrenList.map((child: any, index: number) => {
      const stepIndex = reverse ? childrenDisplayList.length - index - 1 : index;
      return React.cloneElement(child, {
        ...child.props,
        index: stepIndex,
      });
    });
  }, [children, reverse]);

  return (
    <StepsContext.Provider value={context}>
      <div
        className={classNames(
          'i-steps',
          layout && `i-steps__layout-${layout}`,
          dot && 'i-steps__dot',
          className
        )}
        style={{ ...style }}
      >
        {stepItemList}
      </div>
    </StepsContext.Provider>
  );
};

Steps.Item = StepsItem

StepsItem.displayName = 'StepsItem';
Steps.displayName = 'Steps';

export default Steps;
