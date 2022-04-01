import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import ReactDOM from 'react-dom';

export interface PopupProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 气泡提示内容
   */
  content?: React.ReactNode;
}

// 创建气泡提示容器
let popupWrapper = document.querySelector('#i-popup-wrapper')
if (!popupWrapper) {
  popupWrapper = document.createElement('div')
  popupWrapper.className = 'i-popup-wrapper'
  popupWrapper.id = 'i-popup-wrapper'
  document.body.append(popupWrapper)
}

const Popup: React.FC<PopupProps> = (props) => {
  const {
    children = '',
    className,
    style,
    ...others
  } = props;

  const triggerNode = useRef(null)

  useEffect(() => {
    console.log(triggerNode)
  })

  const PopupNode = (
    <div className="i-popup">
      popup
    </div>
  )

  ReactDOM.createPortal(PopupNode, popupWrapper as HTMLElement)

  return (
    <div
      ref={triggerNode}
      className={classNames(
        'i-popup__reference',
        className
      )}
      style={{ ...style }}
      {...others}
    >
      {children}
    </div>
  );
};

Popup.displayName = 'Popup';

export default Popup;
