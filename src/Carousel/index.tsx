import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import Icon from '../Icon'
import CarouselItem from './CarouselItem';
import CarouselNavigation from './CarouselNavigation';
import { CarouselProps } from './type';

const Carousel: React.FC<CarouselProps> & { Item: React.ElementType } = (props) => {
  const {
    children,
    className,
    style,
    defaultCurrent = 0,
    width = '100%',
    height = 300,
    autoPlay = false,
    interval = 3,
    stopOnHover = true,
    type = 'default',
    direction = 'horizontal',
    duration = 300,
    onChange,
    ...restProps
  } = props;

  const resetDefaultCurrent = (index: number) => {
    if (type === 'default') {
      if (index >= childrenLength) {
        return 0
      } else if (index <= -1) {
        return childrenLength - 1
      } else {
        return index + 1
      }
    } else {
      return index
    }
  }

  const [innerCurrent, setInnerCurrent] = useState(resetDefaultCurrent(defaultCurrent));

  // 进行子组件筛选，创建子节点列表
  const childrenList = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child: any) => child.type.displayName === CarouselItem.displayName,
      ),
    [children],
  );
  const childrenLength = childrenList.length;

  const carouselRef = useRef<any>(null);
  const [wrapWidth, setWrapWidth] = useState(0)
  useEffect(() => {
    setWrapWidth(carouselRef.current.getBoundingClientRect().width)
  }, [])

  // 创建渲染用的节点列表
  const carouselItemList = childrenList.map((child: any, index: number) =>
    React.cloneElement(child, {
      key: index,
      index,
      innerCurrent,
      ifAnimation,
      childrenLength,
      wrapWidth,
      type,
      duration,
      clickItem: (index: number) => {
        if (type === 'card') {
          setInnerCurrent(index)
          onChange?.(index)
        }
      },
      ...child.props,
    }),
  );
  // 列表头尾补一项（衔接轮播滑动）
  if (childrenLength > 0 && type === 'default') {
    const firstEle = carouselItemList[0];
    const lastEle = carouselItemList[carouselItemList.length - 1];
    carouselItemList.push(
      React.cloneElement(firstEle, {
        ...firstEle.props,
        key: childrenLength
      }),
    );
    carouselItemList.unshift(
      React.cloneElement(lastEle, {
        ...lastEle.props,
        key: -1
      }),
    );
  }
  const carouselItemLength = carouselItemList.length

  const [ifAnimation, setIfAnimation] = useState(false);
  const animationTimer = useRef<any>(null); // 计时器指针

  // 轮播图通用跳转函数
  const handleTo = useCallback(
    (index: number, handle?: 'last' | 'next') => {
      setIfAnimation(true);
      setInnerCurrent(index);
      if (handle === 'last') {
        if (index > 0) {
          onChange?.(index - 1);
        } else {
          onChange?.(childrenLength - 1);
        }
      } else {
        if (index <= childrenLength) {
          onChange?.(index - 1);
        } else {
          onChange?.(0);
        }
      }
    },
    [childrenLength, onChange],
  );

  // 监听每次轮播结束
  useEffect(() => {
    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
      animationTimer.current = null;
    }
    animationTimer.current = setTimeout(() => {
      setIfAnimation(false);
      if (type !== 'card') {
        if (innerCurrent + 1 >= carouselItemLength) {
          setInnerCurrent(1);
        }
        if (innerCurrent <= 0) {
          setInnerCurrent(carouselItemLength - 2);
        }
      }
    }, duration + 50);
  }, [innerCurrent, carouselItemLength, duration, type]);

  const [ifHoverContent, setIfHoverContent] = useState(false)

  const handleEnterContent = () => {
    stopOnHover && setIfHoverContent(true)
  }

  const handleLeaveContent = () => {
    stopOnHover && setIfHoverContent(false)
  }

  // 自动轮播
  const loopTimer = useRef<any>(null); // 自动轮播指针
  const setLoopTimer = useCallback(() => {
    if (!ifHoverContent && autoPlay && interval > 0) {
      loopTimer.current = setTimeout(
        () => {
          handleTo(innerCurrent + 1);
        },
        innerCurrent === 0 ? interval * 1000 - (duration + 50) : interval * 1000, // 当 index 为 0 时，表示刚从克隆的最后一项跳转过来，且经历了 duration + 50 的间隔时间，减去即可
      );
    }
  }, [autoPlay, ifHoverContent, innerCurrent, duration, interval, handleTo]);
  const clearLoopTimer = useCallback(() => {
    if (loopTimer.current) {
      clearTimeout(loopTimer.current);
      loopTimer.current = null;
    }
  }, []);
  useEffect(() => {
    setLoopTimer();
    return () => clearLoopTimer();
  }, [setLoopTimer])

  const handleClickArrow = (handle: 'last' | 'next') => {
    if (ifAnimation) {
      return false;
    } else {
      if (handle === 'last') {
        if (innerCurrent - 1 < 0) {
          return handleTo(childrenLength - 1, 'last');
        } else {
          return handleTo(innerCurrent - 1, 'last');
        }
      }
      if (handle === 'next') {
        if (type === 'card') {
          return handleTo(innerCurrent + 1 >= carouselItemLength ? 0 : innerCurrent + 1, 'next');
        } else {
          return handleTo(innerCurrent + 1, 'next');
        }
      }
    }
  }

  // Item 包裹层样式
  const getWrapperStyle = () => {
    if (type === 'card') {
      // 卡片样式轮播
      // return {
      //   height: offsetHeight,
      // };
    } else {
      // 默认样式轮播
      if (direction === 'vertical') {
        return {
          transform: `translate3d(0, -${innerCurrent * 100}%, 0px)`,
          transition: ifAnimation ? `transform ${duration / 1000}s ease` : '',
        };
      } else {
        return {
          transform: `translate3d(-${innerCurrent * 100}%, 0px, 0px)`,
          transition: ifAnimation ? `transform ${duration / 1000}s ease` : '',
        };
      }
    }
  };

  return (
    <div
      className={classNames(
        'i-carousel',
        direction === 'vertical' && 'i-carousel__vertical',
        type === 'card' && 'i-carousel__card',
        className
      )}
      style={{ ...style, width, height }}
      ref={carouselRef}
      {...restProps}
    >
      <div
        className="i-carousel__content"
        onMouseEnter={handleEnterContent}
        onMouseLeave={handleLeaveContent}
      >
        <ul
          className='i-carousel__wrapper'
          style={getWrapperStyle()}
        >
          {carouselItemList}
        </ul>
      </div>
      <CarouselNavigation
        itemNum={childrenLength}
        current={type === 'default' ? innerCurrent : innerCurrent + 1}
        onEnter={(current: number) => handleTo(type === 'default' ? current + 1 : current)}
      />
      <div
        className="i-carousel__arrow-last"
        onClick={() => handleClickArrow('last')}
      >
        <Icon color="#fff" name="ArrowLeft" />
      </div>
      <div
        className="i-carousel__arrow-next"
        onClick={() => handleClickArrow('next')}
      >
        <Icon color="#fff" name="ArrowRight" />
      </div>
    </div>
  );
};

Carousel.Item = CarouselItem;

CarouselItem.displayName = 'CarouselItem';
Carousel.displayName = 'Carousel';

export default Carousel;
