import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.scss';
import Button from '../Button'
import Icon from '../Icon'
import Transition from '../Transition';

export interface BackTopProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义内容
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 监听滚动的元素
   * @default () => window
   */
  target?: () => HTMLElement | Window;
  /**
   * 显示起点高度
   * @default 0
   */
  visibleHeight?: number
  /**
   * 是否平滑滚动
   * @default true
   */
  smooth?: boolean
  /**
   * 点击返回顶部时触发
   */
  onClick?: () => void;
  /**
   * 滚动层节点滚动时触发
   */
  onScroll?: () => void;
}

const BackTop: React.FC<BackTopProps> = (props) => {
  const {
    className,
    children,
    style,
    target = () => window,
    visibleHeight = 0,
    smooth = true,
    onClick = () => { },
    onScroll = () => { },
    ...restProps
  } = props;

  const [visible, setVisible] = useState(visibleHeight > 0 ? false : true);

  // 获取滚动层节点 t
  const getTarget = (target: HTMLElement | Window): HTMLElement => {
    return target === window ? document.documentElement : (target as HTMLElement);
  };

  const handleScroll = _.throttle((e: any) => {
    const top = (e.target as HTMLElement).scrollTop
    top >= visibleHeight ? setVisible(true) : setVisible(false)
    onScroll?.()
  }, 16)

  useEffect(() => {
    const t = getTarget(target?.())
    t?.addEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const t = getTarget(target?.())
    t?.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
    onClick?.();
  };

  return (
    <div
      className={classNames(
        'i-back-top',
        className
      )}
      style={{ ...style }}
      onClick={scrollToTop}
      {...restProps}
    >
      <Transition
        timeout={200}
        in={visible}
        animation='fade-in'
      >
        {children || (
          <Button shape="circle" className='i-back-top--button'>
            <Icon name="ArrowUpBold" />
          </Button>
        )}
      </Transition>
    </div>
  );
};

BackTop.displayName = 'BackTop';

export default BackTop;
