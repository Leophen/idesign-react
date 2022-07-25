import React from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import { CarouselItemProps } from './type';

const CarouselItem: React.FC<CarouselItemProps> = (props) => {
  const {
    children,
    className,
    style,
    index = 0,
    innerCurrent = 0,
    type = 'default',
    ifAnimation = false,
    childrenLength = 1,
    duration = 300,
    wrapWidth = 0,
    clickItem,
    ...restProps
  } = props;

  const disposeIndex = (index: number, innerCurrent: number, childrenLength: number) => {
    if (innerCurrent === 0 && index === childrenLength - 1) {
      return -1;
    }
    if (innerCurrent === childrenLength - 1 && index === 0) {
      return childrenLength;
    }
    if (index < innerCurrent - 1 && innerCurrent - index >= childrenLength / 2) {
      return childrenLength + 1;
    }
    if (index > innerCurrent + 1 && index - innerCurrent >= childrenLength / 2) {
      return -2;
    }
    return index;
  };

  const CARD_SCALE = 210 / 332; // 缩放比例
  const itemWidth = 0.415; // 宽度比例

  const calculateTranslate = (index: number, innerCurrent: number, parentWidth: number, inStage: boolean) => {
    if (inStage) {
      return (parentWidth * ((index - innerCurrent) * (1 - itemWidth * CARD_SCALE) - itemWidth + 1)) / 2;
    }
    if (index < innerCurrent) {
      return (-itemWidth * (1 + CARD_SCALE) * parentWidth) / 2;
    }
    return ((2 + itemWidth * (CARD_SCALE - 1)) * parentWidth) / 2;
  };

  const getZIndex = (isActivity: boolean, inStage: boolean) => {
    if (isActivity) {
      return 2;
    }
    if (inStage) {
      return 1;
    }
    return 0;
  };

  const getItemStyle = () => {
    if (type === 'card') {
      const translateIndex =
        index !== innerCurrent && childrenLength > 2 ? disposeIndex(index, innerCurrent, childrenLength) : index;
      const inStage = Math.round(Math.abs(translateIndex - innerCurrent)) <= 1;
      const translate = calculateTranslate(translateIndex, innerCurrent, wrapWidth, inStage).toFixed(2);
      const isActivity = translateIndex === innerCurrent;
      const zIndex = getZIndex(isActivity, inStage);
      return {
        msTransform: `translateX(${translate}px) scale(${isActivity ? 1 : CARD_SCALE})`,
        WebkitTransform: `translateX(${translate}px) scale(${isActivity ? 1 : CARD_SCALE})`,
        transform: `translateX(${translate}px) scale(${isActivity ? 1 : CARD_SCALE})`,
        transition: `transform ${duration / 1000}s ease`,
        zIndex,
        ...style
      };
    }
    return { ...style };
  };

  return (
    <li
      className={classNames(
        'i-carousel-item',
        className
      )}
      style={getItemStyle()}
      onClick={() => clickItem?.(index)}
      {...restProps}
    >
      {children}
    </li>
  )
}

export default CarouselItem;
