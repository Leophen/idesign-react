import React, { useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import Button from '../Button';
import Icon from '../Icon';

export interface UploadProps {
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
   * 占位符
   * @default 点击上传
   */
  placeholder?: string;
  /**
   * 上传组件风格
   * @default button
   */
  theme?: 'button' | 'block';
  /**
   * 上传时触发
   */
  onChange?: (file: File) => void
}

const Upload: React.FC<UploadProps> = (props) => {
  const {
    children,
    className,
    style,
    placeholder = '点击上传',
    theme = 'button',
    onChange,
    ...restProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickInput = () => {
    inputRef.current?.click()
  }

  const handleUpload = (e: React.ChangeEvent) => {
    e.persist()
    const file = ((e.target as HTMLInputElement).files || [])[0]
    onChange?.(file)
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
