import React, { useState } from 'react';
import Message from './Message';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../Transition';
import { MessageListProps } from './type';
import './index.scss';

const MessageList: React.FC<MessageListProps> = (props) => {
  const { listData, position = 'top' } = props;
  const [enteredIds, setEnteredIds] = useState<number[]>([])

  const handleEntered = (id: number) => {
    enteredIds.push(id)
    setEnteredIds([...enteredIds])
  }

  return (
    <TransitionGroup>
      {listData.map(({ id, type, content }) => (
        <Transition
          timeout={300}
          in
          animation={`message-${position}`}
          key={id}
          onEntered={() => handleEntered(id)}
        >
          <Message type={type} content={content} entered={enteredIds.includes(id)} />
        </Transition>
      ))}
    </TransitionGroup>
  );
};

MessageList.displayName = 'MessageList';

export default MessageList;
