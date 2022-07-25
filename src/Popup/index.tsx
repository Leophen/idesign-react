import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Transition from '../Transition';
import useDefault from '../hooks/useDefault';
import Portal from './Portal';
import { PopupProps } from './type';

const Popup: React.FC<PopupProps> = (props) => {
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

  // 触发节点是否在指定包裹层中
  const hasParent = (node: any, parent: HTMLElement | null) => {
    while (node) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode
    }
    return false;
  };

  // 手动更新实时位置
  useEffect(() => {
    const currentTriggerNode = (triggerNode.current as any).children[0]
    setTargetLocation(currentTriggerNode)
  }, [updateLocation])

  // 打开气泡通用方法
  const switchPopup = (e: React.MouseEvent, show: boolean) => {
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
  const closePopup = () => {
    setInnerVisible(false)
  }

  // 气泡包裹层节点
  const triggerNode = useRef(null)

  // 全局监听事件，判断点击节点是否在气泡内，以确定是否关闭气泡
  const [listenClick, setListenClick] = useState(false)
  const ifClickInPopup = (e: any) => {
    // 点击位置在气泡外
    if (!hasParent(e.target, popupRef.current)) {
      // 点击位置既在气泡外 又在触发节点外
      if (!hasParent(e.target, triggerNode.current)) {
        closePopup()
      }
      setListenClick(false)
      window.removeEventListener('click', ifClickInPopup)
    }
  }
  useEffect(() => {
    if (listenClick) {
      window.addEventListener('click', ifClickInPopup)
      return () => window.removeEventListener('click', ifClickInPopup)
    }
  }, [listenClick])
  // 点击触发节点
  const handleClick = (e: React.MouseEvent) => {
    if (trigger === 'click') {
      switchPopup(e, !innerVisible)
      // 气泡在关闭状态下点击 则监听下一次全局点击事件
      if (!innerVisible) {
        setTimeout(() => setListenClick(true))
      }
    } return
  }

  const popupRef = useRef(null)
  const getPopupRef = (ref: any) => {
    popupRef.current = ref.current
  }

  // 判断点击和右击节点是否在气泡内
  const [listenContextMenu, setListenContextMenu] = useState(false)
  const ifHandleInPopup = (e: any) => {
    e.preventDefault();
    if (!hasParent(e.target, popupRef.current as any)) {
      closePopup()
      setListenContextMenu(false)
      window.removeEventListener('click', ifHandleInPopup)
      window.removeEventListener('contextmenu', ifHandleInPopup)
    }
  }
  useEffect(() => {
    if (listenContextMenu) {
      window.addEventListener('click', ifHandleInPopup)
      window.addEventListener('contextmenu', ifHandleInPopup)
      return () => {
        window.removeEventListener('click', ifHandleInPopup)
        window.removeEventListener('contextmenu', ifHandleInPopup)
      }
    }
  }, [listenContextMenu])
  // 右击触发节点
  const handleContextMenu = (e: React.MouseEvent) => {
    if (trigger === 'context-menu') {
      e.preventDefault();
      switchPopup(e, !innerVisible)
      if (!innerVisible) {
        setTimeout(() => setListenContextMenu(true))
      }
    } return
  }

  // 判断悬浮节点是否在气泡内
  const ifHoverInPopup = (e: any) => {
    e.preventDefault();
    // 悬浮位置在气泡外
    if (!hasParent(e.target, popupRef.current)) {
      // 悬浮位置既在气泡外 又在触发节点外
      if (!hasParent(e.target, triggerNode.current)) {
        closePopup()
      }
      window.removeEventListener('click', ifClickInPopup)
    }
  }

  // 悬浮触发节点
  const handleEnter = (e: React.MouseEvent) => {
    if (trigger === 'hover') {
      switchPopup(e, !innerVisible)
      setTimeout(() => {
        window.addEventListener('mouseover', ifHoverInPopup)
      })
    } return
  }

  // 触发节点宽高变化时重定位
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      setWidth((entries[0].contentRect.width || 0))
      setHeight((entries[0].contentRect.height || 0))
    });
    resizeObserver.observe((triggerNode.current as any))
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div
      className={classNames(
        'i-popup__reference',
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
        key='i-popup'
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
          getRef={getPopupRef}
        />
      </Transition>
    </div>
  );
};

Popup.displayName = 'Popup';

export default Popup;
