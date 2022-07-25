import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import { StepsContext } from './index'
import { StepsItemProps } from './type';

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

export default StepsItem;
