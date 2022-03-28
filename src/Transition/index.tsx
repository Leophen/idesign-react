import React from 'react'
import './index.scss'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type TransitionProps = CSSTransitionProps & {
  animation?: string
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    animation,
    ...restProps
  } = props

  return (
    <CSSTransition
      classNames={`i-${animation}`}
      {...restProps}
    >
      {children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition
