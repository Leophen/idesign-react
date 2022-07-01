import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import Icon from '../Icon'

export interface CarouselProps {
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
   * 当前轮播项
   */
  current?: number;
  /**
   * 当前默认轮播项
   * @default 0
   */
  defaultCurrent?: number;
  /**
   * 是否循环播放
   * @default true
   */
  loop?: boolean;
  /**
   * 轮播图的高度
   */
  height?: number;
  /**
   * 轮播图类型
   * @default default
   */
  type?: 'default' | 'card';
  /**
   * 轮播滑动方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 滑动动画时长
   * @default 300
   */
  duration?: number;
  /**
   * 切换轮播时触发
   */
  onChange?: (current: number) => void;
}

export interface CarouselItemProps {
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
}

export interface CarouselNavigationProps {

}

const CarouselNavigation: React.FC<CarouselNavigationProps> = (props) => {
  const {
    ...restProps
  } = props;

  return (
    <ul
      className='i-carousel__navigation'
      {...restProps}
    >

    </ul>
  )
}

const CarouselItem: React.FC<CarouselItemProps> = (props) => {
  const {
    children,
    className,
    style,
    ...restProps
  } = props;

  return (
    <li
      className={classNames(
        'i-carousel-item',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      {children}
    </li>
  )
}

const Carousel: React.FC<CarouselProps> & { Item: React.ElementType } = (props) => {
  const {
    children,
    className,
    style,
    current,
    defaultCurrent = 0,
    loop = true,
    height,
    type = 'default',
    direction = 'horizontal',
    duration = 300,
    onChange,
    ...restProps
  } = props;

  const [innerCurrent, setInnerCurrent] = useDefault(current, defaultCurrent, onChange);

  // 进行子组件筛选，创建子节点列表
  const childrenList = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child: any) => child.type.displayName === CarouselItem.displayName,
      ),
    [children],
  );
  const childrenLength = childrenList.length;

  // 创建渲染用的节点列表
  const carouselItemList = childrenList.map((child: any, index: number) =>
    React.cloneElement(child, {
      key: index,
      ...child.props,
    }),
  );
  // 列表头尾补一项（衔接轮播滑动）
  if (childrenLength > 0) {
    const firstEle = carouselItemList[0];
    const lastEle = carouselItemList[carouselItemList.length - 1];
    carouselItemList.push(
      React.cloneElement(firstEle, {
        ...firstEle.props,
        key: childrenLength
      }),
    );
    // carouselItemList.unshift(
    //   React.cloneElement(lastEle, {
    //     ...lastEle.props,
    //     key: -1
    //   }),
    // );
  }
  const carouselItemLength = carouselItemList.length

  const carouselRef = useRef<HTMLDivElement>(null)
  const [ifAnimation, setIfAnimation] = useState(false);
  const animationTimer = useRef<any>(null); // 计时器指针

  // 轮播图通用跳转函数
  const handleTo = useCallback(
    (index: number) => {
      setIfAnimation(true);
      setInnerCurrent(index);
    },
    [childrenLength],
  );

  // 监听每次轮播结束
  useEffect(() => {
    console.log(innerCurrent)
    // if (innerCurrent + 1 > carouselItemLength && type === 'card') {
    //   return setInnerCurrent(0);
    // }
    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
      animationTimer.current = null;
    }
    // window.requestAnimationFrame(
    //   () => {
    //     setIfAnimation(false);
    //     if (innerCurrent + 1 >= carouselItemLength && type !== 'card') {
    //       setInnerCurrent(0);
    //     }
    //   }
    // );
    animationTimer.current = setTimeout(() => {
      setIfAnimation(false);
      if (innerCurrent + 1 >= carouselItemLength && type !== 'card') {
        setInnerCurrent(0);
      }
    }, duration + 50); // 多 50ms 的间隔时间参考了 react-slick 的动画间隔取值
  }, [innerCurrent, carouselItemLength, duration, type]);

  const handleClickArrow = (direction: 'left' | 'right') => {
    console.log('-----------')
    console.log(ifAnimation)
    if (ifAnimation) {
      return false;
    } else {
      if (direction === 'left') {
        if (innerCurrent - 1 < 0) {
          return handleTo(childrenLength - 1);
        } else {
          return handleTo(innerCurrent - 1);
        }
      }
      if (direction === 'right') {
        if (type === 'card') {
          return handleTo(innerCurrent + 1 >= carouselItemLength ? 0 : innerCurrent + 1);
        } else {
          return handleTo(innerCurrent + 1);
        }
      }
    }
  }

  // Item 包裹层样式
  const getWrapperStyle = () => {
    const offsetHeight = height ? `${height}px` : `${carouselRef.current?.offsetHeight}px`;
    if (type === 'card') {
      // 卡片样式轮播
      return {
        height: offsetHeight,
      };
    } else {
      // 默认样式轮播
      if (direction === 'vertical') {
        // 垂直滑动
        return {
          height: offsetHeight,
          transform: `translate3d(0, -${innerCurrent * 100}%, 0px)`,
          transition: ifAnimation ? `transform ${duration / 1000}s ease` : '',
        };
      } else {
        // 水平滑动
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
        className
      )}
      style={{ ...style }}
      ref={carouselRef}
      {...restProps}
    >
      <div className="i-carousel__content">
        <ul
          className="i-carousel__wrapper"
          style={getWrapperStyle()}
        >
          {carouselItemList}
        </ul>
      </div>
      <CarouselNavigation />
      <div
        className="i-carousel__arrow-left"
        onClick={() => handleClickArrow('left')}
      >
        <Icon color="#fff" name="ArrowLeft" />
      </div>
      <div
        className="i-carousel__arrow-right"
        onClick={() => handleClickArrow('right')}
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
