import React from 'react';
import Message from './Message';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../Transition';
import { MessageListProps } from './type';
import './index.scss';

const MessageList: React.FC<MessageListProps> = (props) => {
  const { listData, position = 'top' } = props;

  return (
    <TransitionGroup>
      {listData.map(({ id, type, content }) => (
        <Transition timeout={300} in animation={`message-${position}`} key={id}>
          <Message type={type} content={content} />
        </Transition>
      ))}
    </TransitionGroup>
  );
};

MessageList.displayName = 'MessageList';

export default MessageList;
