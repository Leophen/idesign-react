import React from 'react';
import './index.scss';
import { MessageProps } from './type';
import Icon from '../Icon';

const Message: React.FC<MessageProps> & {
  success?: any;
  warning?: any;
  error?: any;
  info?: any;
  closeAll?: any;
} = (props) => {
  const {
    type = 'info',
    content = '',
    ...restProps
  } = props;

  return (
    <div className="i-message" {...restProps}>
      <Icon
        name={
          {
            info: 'TipInfo',
            success: 'TipCheckFill',
            warning: 'TipWarningFill',
            error: 'TipCloseFill',
          }[type]
        }
        size={20}
      />
      {content}
    </div>
  );
};

Message.displayName = 'Message';

export default Message;
