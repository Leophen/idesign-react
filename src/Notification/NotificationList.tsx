import React, { useState } from 'react';
import Notification from './Notification';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../Transition';
import { NotificationListProps } from './type';
import './index.scss';

const NotificationList: React.FC<NotificationListProps> = (props) => {
  const { listData, position = 'top-right', onClose } = props;
  const [enteredIds, setEnteredIds] = useState<number[]>([])

  const handleEntered = (id: number) => {
    enteredIds.push(id)
    setEnteredIds([...enteredIds])
  }

  return (
    <TransitionGroup>
      {listData.map(({ id, type, title, content, closeable }, index) => (
        <Transition
          timeout={300}
          in
          animation={`notification-${position}`}
          key={id}
          onEntered={() => handleEntered(id)}
        >
          <Notification
            type={type}
            title={title}
            content={content}
            closeable={closeable}
            entered={enteredIds.includes(id)}
            onClose={() => onClose?.(index, position)}
          />
        </Transition>
      ))}
    </TransitionGroup>
  );
};

NotificationList.displayName = 'NotificationList';

export default NotificationList;
