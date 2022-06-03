import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';

export interface AvatarProps {
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
   * 头像图片地址
   */
  image?: string;
  /**
   * 头像大小
   * @default 32
   */
  size?: number;
  /**
   * 头像形状
   * @default circle
   */
  shape?: 'circle' | 'round';
  /**
   * 头像底色
   * @default #c1c4cb
   */
  color?: string;
}

export interface AvatarGroupProps extends AvatarProps {
  /**
   * 折叠方向
   * @default right
   */
  cascading?: "left" | "right";
}

export interface AvatarContextValue {
  inject: (props: AvatarProps) => AvatarProps;
}

export const AvatarContext = React.createContext<AvatarContextValue>(null as any);

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const {
    children,
    className,
    style,
    size = 32,
    shape = "circle",
    color = "#c1c4cb",
    cascading = "right",
  } = props

  // 注入每一项的 context
  const context: AvatarContextValue = {
    // 将头像组的 props 注入单个头像的方法
    inject: (singleAvatarProps: AvatarProps) => {
      return {
        size,
        shape,
        color,
        ...singleAvatarProps,
      };
    },
  };

  return (
    <AvatarContext.Provider value={context}>
      <div
        className={classNames(
          'i-avatar-group',
          `i-avatar__offset-${cascading}`,
          className
        )}
        style={{ ...style }}
      >
        {children}
        {/* {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          const childProps = {
            size,
            shape,
            color
          };
          return React.cloneElement(child, childProps);
        })} */}
      </div>
    </AvatarContext.Provider>
  )
}

const Avatar: React.FC<AvatarProps> & { Group: React.ElementType } = (props) => {
  // 存在头像组时从 Context 注入全局属性
  const context = useContext(AvatarContext);
  const newProps = context ? context.inject(props) : props;

  const {
    children,
    className,
    style,
    image,
    size = 32,
    shape = "circle",
    color = "#c1c4cb",
    ...others
  } = newProps;

  const [imgLoad, setImgLoad] = useState(true)
  const handleImgLoadError = () => {
    setImgLoad(false)
  }

  return (
    <div
      className={classNames(
        'i-avatar',
        shape === 'round' && `i-avatar__shape-${shape}`,
        className
      )}
      style={{ ...style, width: size, height: size, background: color }}
      {...others}
    >
      {image && imgLoad ?
        <img
          className='i-avatar__image'
          src={image}
          onError={handleImgLoadError}
          referrerPolicy="no-referrer"
        /> :
        (children ? children : <Icon name="User" color="#fff" />)
      }
    </div>
  );
};

Avatar.Group = AvatarGroup

AvatarGroup.displayName = 'AvatarGroup';
Avatar.displayName = 'Avatar';

export default Avatar;
