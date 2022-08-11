import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Icon from '../Icon';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../Transition';
import { MessageConfig, MessageProps } from './type';
import { useContainer } from '../hooks/useContainer';

// 创建消息提示容器
const popupWrapper = useContainer('i-popup-wrapper', document.body);
const messageWrapper = useContainer('i-message-container', popupWrapper);

const Message: React.FC<MessageProps> & {
  success?: any;
  warning?: any;
  error?: any;
  info?: any;
  closeAll?: any;
} = (props) => {
  const { type = 'info', content = '', ...restProps } = props;

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

interface MessageContainerProps {
  messageListData: any[];
  placement?: 'top' | 'bottom';
}

const MessageContainer: React.FC<MessageContainerProps> = (props) => {
  const { messageListData, placement = 'top' } = props;
  return (
    <TransitionGroup>
      {messageListData.map(({ key, type, content }) => (
        <Transition
          timeout={300}
          in
          animation={`message-${placement}`}
          key={key}
        >
          <Message
            type={type}
            content={content}
          />
        </Transition>
      ))}
    </TransitionGroup>
  );
};

const messageList: any = {
  top: [],
  bottom: [],
};

const createMessageWrapper = (placement: 'top' | 'bottom') => {
  const idName = `i-message-wrapper__${placement}`;
  const container = useContainer(idName, messageWrapper, `i-message-wrapper ${idName}`);
  ReactDOM.render(
    <MessageContainer placement={placement} messageListData={messageList[placement]} />,
    container,
  );
};

createMessageWrapper('top');
createMessageWrapper('bottom');

const updateMessageContainer = (config: any, mode = 'add') => {
  const location = config.placement;
  if (mode === 'add') {
    const el = document.querySelector(`#i-message-wrapper__${location}`);
    // 添加模式
    location === 'top' ? messageList[location].push(config) : messageList[location].unshift(config);
    // 延迟更新 DOM
    if (config.duration > 0) {
      setTimeout(() => {
        messageList[location].map((item: any, index: number) => {
          if (item.key === config.key) {
            messageList[location].splice(index, 1);
          }
        });
        ReactDOM.render(
          <MessageContainer placement={location} messageListData={messageList[location]} />,
          el,
        );
      }, config.duration * 1000);
    }
    ReactDOM.render(
      <MessageContainer placement={location} messageListData={messageList[location]} />,
      el,
    );
  } else {
    // 清空消息
    const topContainer = document.querySelector('#i-message-wrapper__top');
    const bottomContainer = document.querySelector('#i-message-wrapper__bottom');
    if (location === 'top') {
      messageList.top = []
      ReactDOM.render(
        <MessageContainer placement='top' messageListData={[]} />,
        topContainer,
      )
    } else if (location === 'bottom') {
      messageList.bottom = []
      ReactDOM.render(
        <MessageContainer placement='bottom' messageListData={[]} />,
        bottomContainer,
      )
    } else {
      messageList.top = []
      messageList.bottom = []
      ReactDOM.render(
        <MessageContainer placement='top' messageListData={[]} />,
        topContainer,
      )
      ReactDOM.render(
        <MessageContainer placement='bottom' messageListData={[]} />,
        bottomContainer,
      )
    }
  }
};

const openMessage = (
  type: 'info' | 'success' | 'warning' | 'error',
  content: string | MessageConfig,
  duration = 3,
  placement = 'top',
) => {
  updateMessageContainer(
    {
      key: Date.now(),
      type,
      content: typeof content === 'object' ? content?.content : content,
      duration: typeof content === 'object' ? content?.duration || 3 : duration,
      placement: typeof content === 'object' ? content?.placement || 'top' : placement,
    },
    'add',
  );
};

const clearMessage = (placement?: 'top' | 'bottom') => {
  updateMessageContainer(
    {
      placement
    },
    'del',
  );
};

Message.info = (content: string | MessageConfig, duration?: number, placement?: 'top' | 'bottom') =>
  openMessage('info', content, duration, placement);
Message.success = (
  content: string | MessageConfig,
  duration?: number,
  placement?: 'top' | 'bottom',
) => openMessage('success', content, duration, placement);
Message.warning = (
  content: string | MessageConfig,
  duration?: number,
  placement?: 'top' | 'bottom',
) => openMessage('warning', content, duration, placement);
Message.error = (
  content: string | MessageConfig,
  duration?: number,
  placement?: 'top' | 'bottom',
) => openMessage('error', content, duration, placement);
Message.closeAll = (
  placement?: 'top' | 'bottom',
) => clearMessage(placement);

Message.displayName = 'Message';

export default Message;
