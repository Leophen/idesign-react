import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import AvatarGroup, { AvatarContext } from './AvatarGroup'
import { AvatarProps } from './type';

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
    color,
    ...restProps
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
      {...restProps}
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
