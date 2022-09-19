import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Transition from '../Transition';
import useDefault from '../hooks/useDefault';
import Portal from './Portal';
import { PopoverProps } from './type';
import { useHasParent } from '../hooks/useHasParent';

// 原 Popup 原生实现写法
const Popover: React.FC<PopoverProps> = (props) => {
  const {
    children = '',
    className,
    portalClassName = '',
    style,
    content,
    placement = 'top',
    trigger = 'hover',
    visible,
    defaultVisible = false,
    disabled = false,
    updateLocation,
    onTrigger = () => { }
  } = props;

  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const setTargetLocation = (target: HTMLElement) => {
    const rect = target.getBoundingClientRect()
    setTop((rect?.top || 0) + window.scrollY)
    setLeft((rect?.left || 0) + window.scrollX)
    setWidth((rect?.width || 0))
    setHeight((rect?.height || 0))
  }

  const [innerVisible, setInnerVisible] = useDefault(visible, defaultVisible, onTrigger);

  // 手动更新实时位置
  useEffect(() => {
    const currentTriggerNode = (triggerNode.current as any).children[0]
    setTargetLocation(currentTriggerNode)
  }, [updateLocation])

  // 打开气泡通用方法
  const switchPopover = (e: React.MouseEvent, show: boolean) => {
    // 设置气泡位置
    // let currentTriggerNode: any = e.target
    // while (currentTriggerNode?.parentNode === (triggerNode.current as unknown as HTMLElement).children[0]) {
    //   currentTriggerNode = currentTriggerNode?.parentNode
    // }
    // if (currentTriggerNode === triggerNode.current) {
    //   currentTriggerNode = currentTriggerNode.children[0]
    // }
    // console.log(currentTriggerNode.parentNode,triggerNode.current.children[0])
    const currentTriggerNode = (triggerNode.current as any).children[0]
    if (show) {
      e.persist();
      setTargetLocation((currentTriggerNode))
    }
    // 设置气泡显示隐藏
    setInnerVisible(show)
  }

  // 关闭气泡通用方法
  const closePopover = () => {
    setInnerVisible(false)
  }

  // 气泡包裹层节点
  const triggerNode = useRef<HTMLDivElement>(null)

  // 全局监听事件，判断点击节点是否在气泡内，以确定是否关闭气泡
  const [listenClick, setListenClick] = useState(false)
  const ifClickInPopover = (e: any) => {
    // 点击位置在气泡外
    if (!useHasParent(e.target, popoverRef.current)) {
      // 点击位置既在气泡外 又在触发节点外
      if (!useHasParent(e.target, triggerNode?.current as HTMLElement)) {
        closePopover()
      }
      setListenClick(false)
      window.removeEventListener('click', ifClickInPopover)
    }
  }
  useEffect(() => {
    if (listenClick) {
      window.addEventListener('click', ifClickInPopover)
      return () => window.removeEventListener('click', ifClickInPopover)
    }
  }, [listenClick])
  // 点击触发节点
  const handleClick = (e: React.MouseEvent) => {
    if (trigger === 'click') {
      switchPopover(e, !innerVisible)
      // 气泡在关闭状态下点击 则监听下一次全局点击事件
      if (!innerVisible) {
        setTimeout(() => setListenClick(true))
      }
    } return
  }

  const popoverRef = useRef<any>(null)
  const getPopoverRef = (ref: any) => {
    popoverRef.current = ref.current as HTMLElement
  }

  // 判断点击和右击节点是否在气泡内
  const [listenContextMenu, setListenContextMenu] = useState(false)
  const ifHandleInPopover = (e: any) => {
    e.preventDefault();
    if (!useHasParent(e.target, popoverRef.current as any)) {
      closePopover()
      setListenContextMenu(false)
      window.removeEventListener('click', ifHandleInPopover)
      window.removeEventListener('contextmenu', ifHandleInPopover)
    }
  }
  useEffect(() => {
    if (listenContextMenu) {
      window.addEventListener('click', ifHandleInPopover)
      window.addEventListener('contextmenu', ifHandleInPopover)
      return () => {
        window.removeEventListener('click', ifHandleInPopover)
        window.removeEventListener('contextmenu', ifHandleInPopover)
      }
    }
  }, [listenContextMenu])
  // 右击触发节点
  const handleContextMenu = (e: React.MouseEvent) => {
    if (trigger === 'context-menu') {
      e.preventDefault();
      switchPopover(e, !innerVisible)
      if (!innerVisible) {
        setTimeout(() => setListenContextMenu(true))
      }
    } return
  }

  // 判断悬浮节点是否在气泡内
  const ifHoverInPopover = (e: any) => {
    e.preventDefault();
    // 悬浮位置在气泡外
    if (!useHasParent(e.target, popoverRef.current)) {
      // 悬浮位置既在气泡外 又在触发节点外
      if (!useHasParent(e.target, triggerNode?.current as HTMLElement)) {
        closePopover()
      }
      window.removeEventListener('click', ifClickInPopover)
    }
  }

  // 悬浮触发节点
  const handleEnter = (e: React.MouseEvent) => {
    if (trigger === 'hover') {
      switchPopover(e, !innerVisible)
      setTimeout(() => {
        window.addEventListener('mouseover', ifHoverInPopover)
      })
    } return
  }

  // 触发节点宽高变化时重定位
  useEffect(() => {
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(entries => {
        setWidth((entries[0].contentRect.width || 0))
        setHeight((entries[0].contentRect.height || 0))
      });
      resizeObserver.observe((triggerNode.current as any))
      return () => resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      className={classNames(
        'i-popover__reference',
        className
      )}
    >
      <section
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onContextMenu={handleContextMenu}
        ref={triggerNode}
      >
        {children}
      </section>

      <Transition
        timeout={200}
        in={innerVisible && !disabled}
        animation='fade-in'
        key='i-popover'
      >
        <Portal
          style={{ ...style }}
          className={portalClassName}
          visible={innerVisible && !disabled}
          content={content}
          placement={placement}
          top={top}
          left={left}
          width={width}
          height={height}
          getRef={getPopoverRef}
        />
      </Transition>
    </div>
  );
};

Popover.displayName = 'Popover';

export default Popover;
