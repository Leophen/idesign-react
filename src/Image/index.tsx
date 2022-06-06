import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import Transition from '../Transition';
import ReactDOM from 'react-dom';

export interface ImageProps {
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
   * 图片地址
   */
  src?: string;
  /**
   * 图片宽度
   * @default 200
   */
  width?: number | string;
}

export interface PreviewDialogProps {
  visible?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
  image?: string;
  x?: number;
  y?: number;
}

const PreviewDialog: React.FC<PreviewDialogProps> = (props) => {
  const {
    visible = false,
    closeOnEsc = true,
    image,
    x = 0,
    y = 0,
    onClose = () => { }
  } = props;

  const dialog = useRef<any>(null)

  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  };

  const closePreviewDialog = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose?.()
    closeOnEsc && document.removeEventListener('keydown', handleKeyDown)
  }

  const [scale, setScale] = useState(1)
  const handleWheel = (e: any) => {
    e.persist()

    origin.x = e.clientX - dialog.current.offsetLeft
    origin.y = e.clientY - dialog.current.offsetTop
    setOrigin({ ...origin })

    let newScale = scale
    if (e.deltaY > 0) {
      newScale > 0.4 && (newScale -= 0.1)
    } else {
      newScale < 3 && (newScale += 0.1)
    }
    setScale(newScale)
  }

  const [position, setPosition] = useState({ x: '-50%', y: '-50%' })
  const start = useRef({ x: 0, y: 0 })
  const handleDown = (e: any) => {
    start.current.x = e.clientX
    start.current.y = e.clientY
    window.addEventListener('mousemove', handleMove)
  }
  const handleMove = (e: any) => {
    position.x = `calc(-50% + ${e.clientX - start.current.x}px)`
    position.y = `calc(-50% + ${e.clientY - start.current.y}px)`
    setPosition({ ...position })
    window.addEventListener('mouseup', handleUp)
  }
  const handleUp = () => {
    position.x = `-50%`
    position.y = `-50%`
    setPosition({ ...position })

    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseup', handleUp)
  }

  // 打开对话框时禁止背景滚动，对原 overflow 进行备份
  const bodyOverflow = useRef<string>(document.body.style.overflow);

  useEffect(() => {
    if (visible) {
      // 退出键功能
      closeOnEsc && document.addEventListener('keydown', handleKeyDown)

      // 初始缩放位置
      origin.x = x - dialog.current.offsetLeft
      origin.y = y - dialog.current.offsetTop
      setOrigin({ ...origin })
      setScale(1)

      // 打开对话框时禁止背景滚动
      document.body.style.overflow = 'hidden';
    }
    return () => {
      closeOnEsc && window.removeEventListener('keydown', handleKeyDown)

      // 关闭对话框时恢复背景滚动
      document.body.style.overflow = bodyOverflow.current;
    }
  }, [visible])

  const clickHandleBar = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className='i-preview-dialog-wrapper'>
      <Transition
        timeout={200}
        in={visible}
        animation='fade-in'
        key='i-preview-dialog__mask'
      >
        <>
          <div className="i-preview-dialog__mask" onClick={closePreviewDialog} onScroll={() => { return }}>
            <div className="i-preview-dialog__close" onClick={closePreviewDialog}>
              <Icon name="Close" size={20} color="#fff" />
            </div>
            <div className="i-preview-dialog__handle" onClick={clickHandleBar}>
              <section>
                <Icon name="SearchSub" size={24} color="#fff" />
                <Icon name="SearchPlus" size={24} color="#fff" />
              </section>
              <Icon name="FullScreen" size={24} color="#fff" />
              <section>
                <Icon name="RefreshLeft" size={24} color="#fff" />
                <Icon name="RefreshRight" size={24} color="#fff" />
              </section>
            </div>
          </div>
        </>
      </Transition>

      <Transition
        timeout={200}
        in={visible}
        animation='fade-in'
        key='i-preview-dialog'
      >
        <img
          style={{
            transform: `scale(${scale}) translate(${position.x}, ${position.y})`,
            transformOrigin: `${origin.x}px ${origin.y}px`
          }}
          className='i-preview-img'
          draggable={false}
          src={image}
          ref={dialog}
          onWheel={handleWheel}
          onMouseDown={handleDown}
        />
      </Transition>
    </div>
  )
};

const Image: React.FC<ImageProps> = (props) => {
  const {
    children = '',
    className,
    style,
    src,
    width,
    ...restProps
  } = props;

  const [previewShow, setPreviewShow] = useState(false)

  const iImage = useRef<any>(null)
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const rect = iImage.current.getBoundingClientRect()
    dialogPosition.x = rect.left
    dialogPosition.y = rect.top
    setDialogPosition({ ...dialogPosition })
  }, [])

  return (
    <div
      className={classNames(
        'i-image',
        className
      )}
      style={{ ...style, width }}
      ref={iImage}
      {...restProps}
    >
      <img className='i-image-img' src={src} />
      <div className="i-image-mask" onClick={() => setPreviewShow(true)}>
        <Icon name="View" color="#fff" />
        预览
      </div>
      <PreviewDialog
        visible={previewShow}
        image={src}
        x={dialogPosition.x}
        y={dialogPosition.y}
        onClose={() => setPreviewShow(false)}
      />
    </div>
  );
};

Image.displayName = 'Image';

export default Image;
