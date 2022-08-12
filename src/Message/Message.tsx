import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import { MessageMethod, MessageProps, PositionType } from './type';
import Icon from '../Icon';

const Message: React.FC<MessageProps> & {
  success?: MessageMethod;
  warning?: MessageMethod;
  error?: MessageMethod;
  info?: MessageMethod;
  clear?: (position?: PositionType) => void;
} = (props) => {
  const {
    type = 'info',
    content,
    entered = false,
    ...restProps
  } = props;

  const msgRef = useRef<HTMLDivElement>(null)
  const [msgHeight, setMsgHeight] = useState<number | undefined>(undefined)
  useEffect(() => {
    if (entered) {
      const { height } = (msgRef.current as HTMLDivElement).getBoundingClientRect()
      setMsgHeight(height)
    }
  }, [entered])

  return (
    <div
      className="i-message"
      style={{ height: msgHeight }}
      ref={msgRef}
      {...restProps}
    >
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
