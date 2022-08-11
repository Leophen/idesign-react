import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import MessageList from './MessageList';
import {
  MergeConfigType,
  MessageConfig,
  MessageConfigType,
  MessageListData,
  MessageType,
  PositionType,
} from './type';
import { useContainer } from '../hooks/useContainer';
import './index.scss';

// 创建消息提示容器
const popupWrapper = useContainer('i-popup-wrapper', document.body);
const messageWrapper = useContainer('i-message-container', popupWrapper);

const messageList: MessageListData = {
  top: [],
  bottom: [],
};

const createMessageWrapper = (position: PositionType) => {
  const idName = `i-message-wrapper__${position}`;
  const container = useContainer(idName, messageWrapper, `i-message-wrapper ${idName}`);
  ReactDOM.render(
    <MessageList position={position} listData={messageList[position]} />,
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
        <MessageList position={position} listData={messageList[position]} />,
        renderContainer,
      );
    }, duration * 1000);
  }

  // 此刻更新
  ReactDOM.render(
    <MessageList position={position} listData={messageList[position]} />,
    renderContainer,
  );
};

const openMessage = (
  type: MessageType,
  messageConfig: MessageConfig,
  duration = 3,
  position = 'top',
) => {
  const isConfigMode = typeof messageConfig === 'object' && !React.isValidElement(messageConfig);
  const mergeConfig: MergeConfigType = {
    id: Date.now(),
    type,
    content: isConfigMode ? (messageConfig as MessageConfigType)?.content : messageConfig,
    duration: isConfigMode ? (messageConfig as MessageConfigType)?.duration ?? 3 : duration,
    position: isConfigMode ? (messageConfig as MessageConfigType)?.position ?? 'top' : (position as PositionType),
  };
  updateMessageWrapper(mergeConfig);
};

const clearMessage = (position?: PositionType) => {
  const positionArr: PositionType[] = ['top', 'bottom'];
  if (position) {
    messageList[position] = [];
    ReactDOM.render(<MessageList position={position} listData={[]} />, getWrapper(position));
  } else {
    positionArr.forEach((item) => {
      messageList[item] = [];
      ReactDOM.render(<MessageList position={item} listData={[]} />, getWrapper(item));
    });
  }
};

Message.info = (messageConfig: MessageConfig, duration?: number, position?: PositionType) =>
  openMessage('info', messageConfig, duration, position);
Message.success = (messageConfig: MessageConfig, duration?: number, position?: PositionType) =>
  openMessage('success', messageConfig, duration, position);
Message.warning = (messageConfig: MessageConfig, duration?: number, position?: PositionType) =>
  openMessage('warning', messageConfig, duration, position);
Message.error = (messageConfig: MessageConfig, duration?: number, position?: PositionType) =>
  openMessage('error', messageConfig, duration, position);
Message.clear = (position?: PositionType) => clearMessage(position);

Message.displayName = 'Message';

export default Message;
