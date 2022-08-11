import React from 'react';
import Notification from './Notification';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../Transition';
import { NotificationListProps } from './type';
import './index.scss';

const NotificationList: React.FC<NotificationListProps> = (props) => {
  const { listData, position = 'top-right', onClose } = props;

  return (
    <TransitionGroup>
      {listData.map(({ id, type, title, content, closeable }, index) => (
        <Transition timeout={300} in animation={`slide-in-${position}`} key={id}>
          <Notification
            type={type}
            title={title}
            content={content}
            closeable={closeable}
            onClose={() => onClose?.(index,position)}
          />
        </Transition>
      ))}
    </TransitionGroup>
  );
};

NotificationList.displayName = 'NotificationList';

export default NotificationList;
