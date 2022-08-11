import React from 'react';
import './index.scss';
import { MessageMethod, MessageProps, PositionType } from './type';
import Icon from '../Icon';

const Message: React.FC<MessageProps> & {
  success?: MessageMethod;
  warning?: MessageMethod;
  error?: MessageMethod;
  info?: MessageMethod;
  closeAll?: (position?: PositionType) => void;
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
