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
  width?: React.CSSProperties["width"];
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

  const [origin, setOrigin] = useState({ x: `0px`, y: `0px` })

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

    origin.x = `${e.clientX - dialog.current.offsetLeft}px`
    origin.y = `${e.clientY - dialog.current.offsetTop}px`
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
    e.stopPropagation()
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
      origin.x = `${x - dialog.current.offsetLeft}px`
      origin.y = `${y - dialog.current.offsetTop}px`
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

  const [rotate, setRotate] = useState(0)
  const clickHandle = (type: 'reScale' | 'scale' | 'full' | 'reRotate' | 'rotate') => {
    if (type === 'reScale') {
      let newScale = scale
      newScale > 0.4 && (newScale -= 0.1)
      setScale(newScale)
      origin.x = `0px`
      origin.y = `0px`
      setOrigin({ ...origin })
    }
    if (type === 'scale') {
      let newScale = scale
      newScale < 3 && (newScale += 0.1)
      setScale(newScale)
      origin.x = `0px`
      origin.y = `0px`
      setOrigin({ ...origin })
    }
    if (type === 'full') {
      let newScale = 1
      setScale(newScale)
    }
    if (type === 'reRotate') {
      let newRotate = rotate - 90
      setRotate(newRotate)
      origin.x = `center`
      origin.y = `center`
      setOrigin({ ...origin })
    }
    if (type === 'rotate') {
      let newRotate = rotate + 90
      setRotate(newRotate)
      origin.x = `center`
      origin.y = `center`
      setOrigin({ ...origin })
    }
  }

  return (
    <div className='i-preview-dialog-wrapper'>
      <Transition
        timeout={200}
        in={visible}
        animation='fade-in'
        key='i-preview-dialog__mask'
      >
        <div className="i-preview-dialog__mask" onMouseDown={closePreviewDialog} onScroll={() => { return }}>
          <div className="i-preview-dialog__close" onMouseDown={closePreviewDialog}>
            <Icon name="Close" size={20} color="#fff" />
          </div>
          <div className="i-preview-dialog__handle" onMouseDown={clickHandleBar}>
            <section>
              <Icon name="SearchSub" size={24} color="#fff" onClick={() => clickHandle('reScale')} />
              <Icon name="SearchPlus" size={24} color="#fff" onClick={() => clickHandle('scale')} />
            </section>
            <Icon name="FullScreen" size={24} color="#fff" onClick={() => clickHandle('full')} />
            <section>
              <Icon name="RefreshLeft" size={24} color="#fff" onClick={() => clickHandle('reRotate')} />
              <Icon name="RefreshRight" size={24} color="#fff" onClick={() => clickHandle('rotate')} />
            </section>
          </div>
          <img
            style={{
              transform: `scale(${scale}) translate(${position.x}, ${position.y}) rotate(${rotate}deg)`,
              transformOrigin: `${origin.x} ${origin.y}`
            }}
            className='i-preview-img'
            draggable={false}
            src={image}
            ref={dialog}
            onWheel={handleWheel}
            onMouseDown={handleDown}
          />
        </div>
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
