import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import PreviewDialog from './PreviewDialog';
import { ImageProps } from './type';

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
