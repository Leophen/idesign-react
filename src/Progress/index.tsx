import React from 'react';
import classNames from 'classnames';
import './index.scss';
import { ProgressProps } from './type';

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    className,
    style,
    percentage = 0,
    type = 'bar',
    labelTxt = true,
    innerLabel = false,
    label,
    color,
    backColor,
    width = 200,
    strokeWidth = 6,
    indeterminate = false,
    duration = 3,
    ...restProps
  } = props;

  const animateBar = `indeterminate_bar ${duration}s infinite ease-in-out`

  const progressBar = (
    <>
      <div
        className={classNames(
          'i-progress-bar',
          innerLabel && 'i-progress-bar__has-label',
        )}
        style={{
          width,
          height: strokeWidth,
          background: backColor
        }}
      >
        <div
          className="i-progress-bar__inner"
          style={{
            width: `${percentage}%`,
            background: color,
            animation: indeterminate ? animateBar : 'unset'
          }}
        />
        {innerLabel && (labelTxt || label) && (
          <div className="i-progress__info">
            {!label ? `${percentage}%` : label}
          </div>
        )}
      </div>
      {!innerLabel && (labelTxt || label) && (
        <div className="i-progress__info">
          {!label ? `${percentage}%` : label}
        </div>
      )}
    </>
  )

  const getStyleNum = (val: string | number) => {
    return parseInt(String(width))
  }

  const circle = {
    d: getStyleNum(width),
    r: (getStyleNum(width) / 2) - strokeWidth / 2,
    l: getStyleNum(width) * Math.PI
  }

  const animateCircle = `indeterminate_circle ${duration}s infinite linear`

  const progressCircle = (
    <div
      className={classNames(
        'i-progress-circle',
        innerLabel && 'i-progress-circle__has-label',
      )}
      style={{
        width,
        height: width
      }}
    >
      <svg
        width={circle.d}
        height={circle.d}
      >
        <circle
          cx={circle.d / 2}
          cy={circle.d / 2}
          r={circle.r}
          fill="none"
          className="i-progress-circle__bg"
          style={{
            stroke: backColor,
            strokeWidth,
          }}
        />
        <circle
          cx={circle.d / 2}
          cy={circle.d / 2}
          r={circle.r}
          fill="none"
          className="i-progress-circle__inner"
          style={{
            stroke: color,
            strokeWidth,
            strokeLinecap: 'round',
            strokeDasharray: circle.l,
            strokeDashoffset: !indeterminate ? circle.l - circle.l * percentage / 100 : circle.l * 2,
            animation: indeterminate ? animateCircle : 'unset'
          }}
        />
      </svg>
      {(labelTxt || label) && (
        <div className="i-progress__info">
          {!label ? `${percentage}%` : label}
        </div>
      )}
    </div>
  )

  return (
    <div
      className={classNames(
        'i-progress',
        className
      )}
      style={{ ...style }}
      {...restProps}
    >
      {type !== 'bar' ? progressCircle : progressBar}
    </div>
  );
};

Progress.displayName = 'Progress';

export default Progress;
