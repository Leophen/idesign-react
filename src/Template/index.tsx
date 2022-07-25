import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { TemplateProps } from './type';

const Template: React.FC<TemplateProps> = (props) => {
  const {
    children,
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
