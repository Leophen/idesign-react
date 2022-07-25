import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Icon from '../Icon';
import { TransitionGroup } from 'react-transition-group'
import Transition from '../Transition'
import { MessageConfig, MessageProps } from './type';

const Message: React.FC<MessageProps> & {
  success?: any
  warning?: any
  error?: any
  info?: any
  closeAll?: any
} = (props) => {
  const {
    type = 'info',
    content = ''
  } = props;

  return (
    <div
      className='i-message'
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

interface MessageContainerProps {
  messageListData: any[]
  placement?: 'top' | 'bottom';
}

const MessageContainer: React.FC<MessageContainerProps> = (props) => {
  const { messageListData, placement = 'top' } = props
  return (
    <TransitionGroup>
      {
        messageListData.map(({ key, type, content }) => (
          <Transition
            timeout={200}
            in
            animation={`slide-in-${placement}`}
            key={key}
          >
            <Message type={type} content={content} />
          </Transition>
        ))
      }
    </TransitionGroup>
  )
}

const messageList: any = {
  'top': [],
  'bottom': []
}

const createMessageWrapper = (placement: 'top' | 'bottom') => {
  const idName = `i-message-wrapper__${placement}`
  let el = document.querySelector(`#${idName}`)
  if (!el) {
    el = document.createElement('div')
    el.className = `i-message-wrapper ${idName}`
    el.id = idName
    document.body.append(el)
  }
  ReactDOM.render(<MessageContainer placement={placement} messageListData={messageList[placement]} />, el)
}

createMessageWrapper('top')
createMessageWrapper('bottom')

const updateMessageContainer = (config: any, mode = 'add') => {
  const location = config.placement
  let el = document.querySelector(`#i-message-wrapper__${location}`)
  if (mode === 'add') { // 添加模式
    location === 'top' ? messageList[location].push(config) : messageList[location].unshift(config)
    // 延迟更新 DOM
    if (config.duration > 0) {
      setTimeout(() => {
        messageList[location].map((item: any, index: number) => {
          if (item.key === config.key) {
            messageList[location].splice(index, 1)
          }
        })
        ReactDOM.render(<MessageContainer placement={location} messageListData={messageList[location]} />, el)
      }, config.duration * 1000)
    }
  } else { // 删除模式
    messageList[location] = []
  }
  ReactDOM.render(<MessageContainer placement={location} messageListData={messageList[location]} />, el)
}

const openMessage = (
  type: 'info' | 'success' | 'warning' | 'error',
  content: string | MessageConfig,
  duration = 3,
  placement = 'top'
) => {
  updateMessageContainer({
    key: Date.now(),
    type,
    content: typeof content === 'object' ? content?.content : content,
    duration: typeof content === 'object' ? content?.duration || 3 : duration,
    placement: typeof content === 'object' ? content?.placement || 'top' : placement
  }, 'add')
}

const closeMessage = (
  content: string | MessageConfig,
  placement = 'top'
) => {
  updateMessageContainer({
    placement: typeof content === 'object' ? content?.placement || 'top' : placement
  }, 'del')
}

Message.info = (content: string | MessageConfig, duration?: number, placement?: 'top' | 'bottom') => openMessage('info', content, duration, placement)
Message.success = (content: string | MessageConfig, duration?: number, placement?: 'top' | 'bottom') => openMessage('success', content, duration, placement)
Message.warning = (content: string | MessageConfig, duration?: number, placement?: 'top' | 'bottom') => openMessage('warning', content, duration, placement)
Message.error = (content: string | MessageConfig, duration?: number, placement?: 'top' | 'bottom') => openMessage('error', content, duration, placement)
Message.closeAll = (content: string | MessageConfig, duration?: number, placement?: 'top' | 'bottom') => closeMessage(content, placement)

Message.displayName = 'Message';

export default Message;
