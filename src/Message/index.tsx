import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../Transition';
import {
  MergeConfigType,
  MessageConfig,
  MessageContainerProps,
  MessageList,
  MessageType,
  PositionType,
} from './type';
import { useContainer } from '../hooks/useContainer';
import './index.scss';

// 创建消息提示容器
const popupWrapper = useContainer('i-popup-wrapper', document.body);
const messageWrapper = useContainer('i-message-container', popupWrapper);

const MessageContainer: React.FC<MessageContainerProps> = (props) => {
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

const messageList: MessageList = {
  top: [],
  bottom: [],
};

const createMessageWrapper = (position: PositionType) => {
  const idName = `i-message-wrapper__${position}`;
  const container = useContainer(idName, messageWrapper, `i-message-wrapper ${idName}`);
  ReactDOM.render(
    <MessageContainer position={position} listData={messageList[position]} />,
    container,
  );
};

createMessageWrapper('top');
createMessageWrapper('bottom');

const getWrapper = (position: PositionType) => {
  return document.querySelector(`#i-message-wrapper__${position}`);
};

const updateMessageWrapper = (config: MergeConfigType) => {
  const { id = 0, position = 'top', duration = 3 } = config;

  position === 'top' ? messageList[position].push(config) : messageList[position].unshift(config);
  const renderContainer = getWrapper(position);

  // 延迟消除
  if (duration > 0) {
    setTimeout(() => {
      messageList[position].map((item: MergeConfigType, index: number) => {
        if (item.id === id) {
          messageList[position].splice(index, 1);
        }
      });
      ReactDOM.render(
        <MessageContainer position={position} listData={messageList[position]} />,
        renderContainer,
      );
    }, duration * 1000);
  }

  // 此刻更新
  ReactDOM.render(
    <MessageContainer position={position} listData={messageList[position]} />,
    renderContainer,
  );
};

const clearMessage = (position?: PositionType) => {
  const positionArr: PositionType[] = ['top', 'bottom'];
  if (position) {
    messageList[position] = [];
    ReactDOM.render(<MessageContainer position={position} listData={[]} />, getWrapper(position));
  } else {
    positionArr.forEach((item) => {
      messageList[item] = [];
      ReactDOM.render(<MessageContainer position={item} listData={[]} />, getWrapper(item));
    });
  }
};

const openMessage = (
  type: MessageType,
  messageConfig: MessageConfig,
  duration = 3,
  position = 'top',
) => {
  const isConfigMode = typeof messageConfig === 'object';
  const mergeConfig: MergeConfigType = {
    id: Date.now(),
    type,
    content: isConfigMode ? messageConfig?.content : messageConfig,
    duration: isConfigMode ? messageConfig?.duration ?? 3 : duration,
    position: isConfigMode ? messageConfig?.position ?? 'top' : (position as PositionType),
  };
  updateMessageWrapper(mergeConfig);
};

Message.info = (messageConfig: MessageConfig, duration?: number, position?: PositionType) =>
  openMessage('info', messageConfig, duration, position);
Message.success = (messageConfig: MessageConfig, duration?: number, position?: PositionType) =>
  openMessage('success', messageConfig, duration, position);
Message.warning = (messageConfig: MessageConfig, duration?: number, position?: PositionType) =>
  openMessage('warning', messageConfig, duration, position);
Message.error = (messageConfig: MessageConfig, duration?: number, position?: PositionType) =>
  openMessage('error', messageConfig, duration, position);
Message.closeAll = (position?: PositionType) => clearMessage(position);

Message.displayName = 'Message';

export default Message;
