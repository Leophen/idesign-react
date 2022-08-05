import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import ReactDOM from 'react-dom';
import { PortalProps } from './type';

// 创建气泡提示容器
let popupWrapper = document.querySelector('#i-popup-wrapper')
if (!popupWrapper) {
  popupWrapper = document.createElement('div')
  popupWrapper.className = 'i-popup-wrapper'
  popupWrapper.id = 'i-popup-wrapper'
  document.body.append(popupWrapper)
}

const Portal: React.FC<PortalProps> = (props) => {
  const {
    portalClassName,
    portalStyle,
    noPadding = false,
    content,
    visible = false,
    getRef
  } = props

  const portalRef = useRef(null)

  useEffect(() => {
    visible && getRef?.(portalRef)
  }, [visible])

  const PopoverNode = (
    <div
      className={
        classNames(
          'i-popup',
          noPadding && 'i-popup__no-padding',
          portalClassName
        )}
      style={{ ...portalStyle }}
      ref={portalRef}
    >
      {content}
      <div className="i-popup__arrow" />
    </div>
  )

  return (
    ReactDOM.createPortal(PopoverNode, popupWrapper as HTMLElement)
  )
}

export default Portal;
