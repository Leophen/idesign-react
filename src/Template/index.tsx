import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface TemplateProps {
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
}

const Template: React.FC<TemplateProps> = (props) => {
  const {
    children = '',
    className,
    style,
    ...restProps
  } = props;

  return (
    <div
      className={classNames(
        'i-template',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      {children}
    </div>
  );
};

Template.displayName = 'Template';

export default Template;
