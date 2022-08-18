import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import PreviewDialog from './PreviewDialog';
import { ImageProps } from './type';
import Loading from '../Loading';

const IImage: React.FC<ImageProps> = (props) => {
  const {
    className,
    style,
    src,
    width,
    ...restProps
  } = props;

  const [previewShow, setPreviewShow] = useState(false)

  const iImage = useRef<any>(null)
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 })

  const [url, setUrl] = useState('')
  const urlToBase64 = (url: string) => {
    const Img = new Image();
    Img.src = url + '?v=' + Math.random();
    Img.setAttribute('crossOrigin', 'Anonymous');
    Img.onload = function () {
      const canvas = document.createElement('canvas'),
        width = Img.width,
        height = Img.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(Img, 0, 0, width, height);
      const dataURL = canvas.toDataURL('image/jpeg');
      setUrl(dataURL)
    };
  }

  useEffect(() => {
    src && urlToBase64(src)
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
      {url === '' ? (<Loading />) : (<img className='i-image-img' src={url} />)}
      <div className="i-image-mask" onClick={() => setPreviewShow(true)}>
        <Icon name="View" color="#fff" />
        预览
      </div>
      <PreviewDialog
        visible={previewShow}
        image={url}
        x={dialogPosition.x}
        y={dialogPosition.y}
        onClose={() => setPreviewShow(false)}
      />
    </div>
  );
};

IImage.displayName = 'Image';

export default IImage;
