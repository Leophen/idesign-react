import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface TemplateProps {
  /**
   * 按钮内容
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * XX组件
 */
const Template = (props: TemplateProps) => {
  const { children = '', className, style, ...others } = props;
  return (
    <div className={classNames('i-template', className)} style={{ ...style }} {...others}>
      {children}
    </div>
  );
};

Template.displayName = 'Template';

export default Template;
