import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createPopper } from '@popperjs/core';
import './index.scss';
import Transition from '../Transition';
import useDefault from '../hooks/useDefault';
import { PopupProps } from './type';
import Portal from './Portal';

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

const Popup: React.FC<PopupProps> = (props) => {
  const {
    children = '',
    className,
    portalClassName,
    portalStyle,
    style,
    content,
    placement = 'top',
    trigger = 'hover',
    visible,
    defaultVisible = false,
    disabled = false,
    sameWidth = false,
    noPadding = false,
    onTrigger = () => { }
  } = props;

  const [innerVisible, setInnerVisible] = useDefault(visible, defaultVisible, onTrigger);

  const referenceRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<any>(null)

  const updateContentRef = (ref: any) => {
    contentRef.current = ref?.current
  }

  let popperInstance: any = null
  // 创建 popper 实例
  const createPopperInstance = () => {
    if (contentRef.current) {
      popperInstance = createPopper(
        referenceRef.current?.children[0] as HTMLElement,
        contentRef.current as HTMLElement,
        {
          placement: placement,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 16]
              }
            },
            {
              name: 'sameWidth',
              enabled: sameWidth,
              phase: 'beforeWrite',
              requires: ['computeStyles'],
              // @ts-ignore
              fn: ({ state }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`
              },
              // @ts-ignore
              effect: ({ state }) => {
                // @ts-ignore
                state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
              }
            },
            {
              name: "observeReferenceModifier",
              enabled: true,
              phase: "main",
              fn: () => { },
              effect: ({ state, instance }) => {
                const { reference } = state.elements;
                const referenceObserver = new ResizeObserver((entries) => {
                  instance.update();
                });
                referenceObserver.observe(reference as HTMLElement);
                return () => {
                  referenceObserver.disconnect();
                };
              }
            }
          ]
        }
      )
      popperInstance.update()
    }
  }

  useEffect(() => {
    createPopperInstance()
    return () => {
      popperInstance?.destroy?.()
      popperInstance = null
    }
  }, [])

  // 通用方法 - 切换气泡显示隐藏
  const switchPopupShow = (show: boolean) => {
    if (disabled) {
      return
    }
    setInnerVisible(show)
    show && setTimeout(() => createPopperInstance())
  }

  // 通用方法 - 判断该位置是否在气泡外
  const ifOutContent = (target: HTMLElement) => {
    return !hasParent(target, contentRef.current as HTMLElement)
  }

  // 通用方法 - 判断该位置是否在触发节点外
  const ifOutReference = (target: HTMLElement) => {
    return !hasParent(target, referenceRef.current as HTMLElement)
  }

  const [listenClick, setListenClick] = useState(false)
  const [listenContextMenu, setListenContextMenu] = useState(false)

  // 悬浮后的操作
  const hoverHandle = (e: any) => {
    e.preventDefault()
    // 悬浮位置在气泡外
    if (ifOutContent(e.target)) {
      // 悬浮位置既在气泡外 又在触发节点外
      if (ifOutReference(e.target)) {
        switchPopupShow(false)
      }
      window.removeEventListener('mouseover', hoverHandle)
    }
  }

  // 鼠标点击后的操作
  const clickHandle = (e: MouseEvent) => {
    // 点击位置在气泡外
    if (ifOutContent(e.target as HTMLElement)) {
      // 点击位置既在气泡外 又在触发节点外
      if (ifOutReference(e.target as HTMLElement)) {
        switchPopupShow(false)
      }
      setListenClick(false)
      window.removeEventListener('click', clickHandle)
    }
  }

  // 鼠标右键后的操作
  const rClickHandle = (e: MouseEvent) => {
    e.preventDefault()
    // 点击位置既在气泡外
    if (ifOutContent(e.target as HTMLElement)) {
      switchPopupShow(false)
      setListenContextMenu(false)
      window.removeEventListener('click', rClickHandle)
      window.removeEventListener('contextmenu', rClickHandle)
    }
  }

  useEffect(() => {
    listenClick && window.addEventListener('click', clickHandle)
    return () => {
      window.removeEventListener('click', clickHandle)
    }
  }, [listenClick])

  useEffect(() => {
    if (listenContextMenu) {
      window.addEventListener('click', rClickHandle)
      window.addEventListener('contextmenu', rClickHandle)
    }
    return () => {
      window.removeEventListener('click', rClickHandle)
      window.removeEventListener('contextmenu', rClickHandle)
    }
  }, [listenContextMenu])

  // 触发节点 - 悬浮
  const handleHoverReference = () => {
    if (trigger !== 'hover') {
      return
    }
    const newVal = !innerVisible
    switchPopupShow(newVal)
    setTimeout(() => window.addEventListener('mouseover', hoverHandle))
  }

  // 触发节点 - 点击
  const handleClickReference = () => {
    if (trigger !== 'click') {
      return
    }
    const newVal = !innerVisible
    switchPopupShow(newVal)
    // 气泡在关闭状态下点击 则监听下一次全局点击事件
    if (newVal) {
      setTimeout(() => setListenClick(true))
    }
  }

  // 触发节点 - 右键
  const handleRClickReference = (e: React.MouseEvent<HTMLDivElement>) => {
    if (trigger !== 'context-menu') {
      return
    }
    e.preventDefault()
    const newVal = !innerVisible
    switchPopupShow(newVal)
    // 气泡在关闭状态下点击 则监听下一次全局点击事件
    if (newVal) {
      setTimeout(() => setListenContextMenu(true))
    }
  }

  return (
    <>
      <div
        className={classNames(
          'i-popup__reference',
          className
        )}
        style={{ ...style }}
        ref={referenceRef}
        onClick={handleClickReference}
        onMouseEnter={handleHoverReference}
        onContextMenu={handleRClickReference}
      >
        {children}
      </div>

      <Transition
        timeout={200}
        in={innerVisible && !disabled}
        animation='fade-in'
        key='i-popover'
      >
        <Portal
          portalClassName={portalClassName}
          portalStyle={{ ...portalStyle }}
          noPadding={noPadding}
          visible={innerVisible && !disabled}
          content={content}
          getRef={updateContentRef}
        />
      </Transition>
    </>
  )
};

Popup.displayName = 'Popup';

export default Popup;
