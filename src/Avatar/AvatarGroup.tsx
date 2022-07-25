import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { AvatarContextValue, AvatarGroupProps, AvatarProps } from './type'

export const AvatarContext = React.createContext<AvatarContextValue>(null as any);

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const {
    children,
    className,
    style,
    size = 32,
    shape = "circle",
    color,
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
      </div>
    </AvatarContext.Provider>
  )
}

export default AvatarGroup;
