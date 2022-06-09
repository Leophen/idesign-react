import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';

export interface StepsItemProps {
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
   * 步骤标题
   * @default ''
   */
  title?: React.ReactNode;
  /**
   * 步骤描述
   * @default ''
   */
  description?: React.ReactNode;
  /**
   * index 值
   * @default 0
   */
  index?: number;
  /**
   * 进行到哪一步
   * @default 0
   */
  current?: number;
}

export interface StepsProps extends StepsItemProps {
  /**
   * 进行到哪一步
   * @default 0
   */
  current?: number;
  /**
   * 步骤条方向
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 步骤条是否倒序
   * @default false
   */
  reverse?: boolean;
  /**
   * 是否为无序的步骤条
   * @default false
   */
  dot?: boolean;
}

export interface StepsContextValue {
  inject: (props: StepsProps) => StepsProps;
}

export const StepsContext = React.createContext<StepsContextValue>(null as any);

const StepsItem: React.FC<StepsItemProps> = (props) => {
  const context = useContext(StepsContext);
  const newProps = context ? context.inject(props) : props;

  const {
    className,
    style,
    title = '',
    description = '',
    index = 0,
    current = 0,
    ...restProps
  } = newProps;

  return (
    <div
      className={classNames(
        'i-steps-item',
        current > index + 1 && 'i-steps-item__finish',
        current === index + 1 && 'i-steps-item__current',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      <div className="i-steps-item__content">
        <header className="i-steps-item__title">
          {title}
          <div className="i-steps-item__icon">
            {current > index + 1 ? (
              <Icon name="Check" size={13} />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        </header>
        <article className="i-steps-item__description">
          {description}
        </article>
      </div>
    </div>
  )
}

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
