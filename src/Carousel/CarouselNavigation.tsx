import React from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import { CarouselNavigationProps } from './type';

const CarouselNavigation: React.FC<CarouselNavigationProps> = (props) => {
  const {
    itemNum = 0,
    current = 0,
    onEnter,
  } = props;

  const lists = _.range(0, itemNum)

  const handleEnterItem = (index: number) => {
    onEnter?.(index)
  }

  return (
    <ul className='i-carousel__navigation'>
      {lists.map(item => (
        <li
          className={classNames(
            'i-carousel__navigation-item',
            current - 1 === item && 'i-carousel__navigation-item__active'
          )}
          onMouseEnter={() => handleEnterItem(item)}
          key={item}
        />
      ))}
    </ul>
  )
}

export default CarouselNavigation;
