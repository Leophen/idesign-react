import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Icon from '../Icon';
import { TransitionGroup } from 'react-transition-group'
import Transition from '../Transition'

export interface MessageProps {
  /**
  * 全局提示类型
  * @default info
  */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 全局提示内容
   */
  content?: string;
  /**
   * 消息显示时长，单位：秒。值为 0 表示永久显示
   * @default 3
   */
  duration?: number;
}

export interface MessageConfig extends MessageProps { }

const Message: React.FC<MessageProps> & {
  success?: any
  warning?: any
  error?: any
  info?: any
  closeAll?: () => void
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
  messageList: any[]
}

const MessageContainer: React.FC<MessageContainerProps> = (props) => {
  const { messageList } = props
  return (
    <TransitionGroup>
      {
        messageList.map(({ key, type, content }) => (
          <Transition
            timeout={200}
            in
            animation="slide-in-top"
            key={key}
          >
            <Message key={key} type={type} content={content} />
          </Transition>
        ))
      }
    </TransitionGroup>
  )
}

let el = document.querySelector('#message-wrapper')
if (!el) {
  el = document.createElement('div')
  el.className = 'message-wrapper'
  el.id = 'message-wrapper'
  document.body.append(el)
}

let messageList: any[] = []
ReactDOM.render(<MessageContainer messageList={messageList} />, el)

const updateMessageContainer = (config: any, mode = 'add') => {
  if (mode === 'add') {
    messageList.push(config)
    if (config.duration > 0) {
      setTimeout(() => {
        messageList.map((item, index) => {
          if (item.key === config.key) {
            messageList.splice(index, 1)
          }
        })
        ReactDOM.render(<MessageContainer messageList={messageList} />, el)
      }, config.duration * 1000)
    }
  } else {
    messageList = []
  }

  ReactDOM.render(<MessageContainer messageList={messageList} />, el)
}

const openMessage = (
  type: 'info' | 'success' | 'warning' | 'error',
  content: string | MessageConfig,
  duration = 3
) => {
  updateMessageContainer({
    key: Date.now(),
    type,
    content: typeof content === 'object' ? content?.content : content,
    duration: typeof content === 'object' ? content?.duration || 3 : duration
  })
}

const closeMessage = () => {
  updateMessageContainer({}, 'del')
}

Message.info = (content: string | MessageConfig, duration: number) => openMessage('info', content, duration)
Message.success = (content: string | MessageConfig, duration: number) => openMessage('success', content, duration)
Message.warning = (content: string | MessageConfig, duration: number) => openMessage('warning', content, duration)
Message.error = (content: string | MessageConfig, duration: number) => openMessage('error', content, duration)
Message.closeAll = closeMessage

Message.displayName = 'Message';

export default Message;
