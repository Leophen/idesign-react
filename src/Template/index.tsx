import React from 'react';
import classNames from 'classnames';
import './index.scss';

export interface TemplateProps {
  /**
   * 类名
   */
  className?: string;
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
    ...others
  } = props;

  return (
    <div
      className={classNames(
        'i-template',
        className
      )}
      style={{ ...style }}
      {...others}
    >
      {children}
    </div>
  );
};

Template.displayName = 'Template';

export default Template;
