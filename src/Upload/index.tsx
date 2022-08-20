import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Button from '../Button';
import Icon from '../Icon';
import Message from '../Message';
import { UploadProps } from './type';

const Upload: React.FC<UploadProps> = (props) => {
  const defaultPlaceHolder = props.theme === 'drag' ? '点击或拖动到框内上传' : '点击上传'
  const {
    children,
    className,
    style,
    placeholder = defaultPlaceHolder,
    theme = 'button',
    maxSize = 10,
    onChange,
    ...restProps
  } = props;

  const MAX_SIZE = useMemo(() => maxSize * 1024 * 1024, [maxSize])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickInput = () => {
    inputRef.current?.click()
  }

  const uploadFile = (file: File) => {
    if (file) {
      if (file.size > MAX_SIZE) {
        const unit = MAX_SIZE > 1 * 1024 ? 'M' : 'kb'
        const size = MAX_SIZE > 1 * 1024 ? maxSize : maxSize * 1024
        Message.error(`文件大小不得超过 ${size} ${unit}`);
      } else {
        onChange?.(file)
      }
    }
  }

  const handleUpload = (e: React.ChangeEvent) => {
    e.persist()
    const file = ((e.target as HTMLInputElement).files || [])[0]
    uploadFile(file)
  }

  const [ifDragIn, setIfDragIn] = useState(false)

  const handleDragOver = (e: React.MouseEvent) => {
    e.preventDefault()
    setIfDragIn(true)
  }

  const handleDragLeave = (e: React.MouseEvent) => {
    setIfDragIn(false)
  }

  const handleDragDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    uploadFile(file)
    setIfDragIn(false)
  }

  const renderUpload = () => {
    if (theme === 'button') {
      return (
        <Button type="info" variant="outline" icon="ArrowLineUpload">
          {placeholder}
        </Button>
      )
    } else if (theme === 'block') {
      return (
        <div className="i-upload__block">
          <Icon name="ThePlus" size={20} />
          {placeholder}
        </div>
      )
    } else if (theme === 'drag') {
      return (
        <div
          className={classNames(
            'i-upload__drag',
            ifDragIn && 'i-upload__dragging'
          )}
          draggable
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDragDrop}
        >
          <Icon name="ArrowLineUpload" size={20} />
          <span className='i-upload-placeholder'>{placeholder}</span>
          <span className='i-upload-tip'>支持不超过 10M 的 excel 类型文件</span>
        </div>
      )
    }
  }

  return (
    <div
      className={classNames(
        'i-upload',
        className
      )}
      style={{ ...style }}
      onClick={handleClickInput}
      {...restProps}
    >
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleUpload}
      />
      {children ? children : renderUpload()}
    </div>
  );
};

Upload.displayName = 'Upload';

export default Upload;
