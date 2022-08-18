import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import useDefault from '../hooks/useDefault';
import { RateProps } from './type';

const Rate: React.FC<RateProps> = (props) => {
  const {
    className,
    style,
    value,
    defaultValue = 0,
    readonly = false,
    allowClear = false,
    allowHalf = false,
    count = 5,
    activeColor = '#f5db4d',
    voidColor = 'var(--i-bg-back)',
    activeIcon = 'StarFill',
    voidIcon = 'StarFill',
    onChange = () => { },
    ...restProps
  } = props;

  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);
  const [hoverValue, setHoverValue] = useState(value || defaultValue)
  const [ifHover, setIfHover] = useState(false)

  const handleEnterRate = () => {
    !readonly && setIfHover(true)
  }

  const handleLeaveRate = () => {
    !readonly && setIfHover(false)
  }

  const handleEnterRateItem = (index: number) => {
    const step = !allowHalf ? 1 : 0.5
    !readonly && setHoverValue(index + step)
  }

  const handleDownRateItem = (index: number) => {
    const step = !allowHalf ? 1 : 0.5
    if (!readonly) {
      if (innerValue !== index + step) {
        setInnerValue(index + step)
      } else {
        allowClear && setInnerValue(0)
      }
    }
  }

  const getStar = (index: number, type: 'name' | 'color') => {
    let result = (type === 'name') ? voidIcon : voidColor
    const compareValue = ifHover ? hoverValue : innerValue
    if (compareValue > index) {
      result = (type === 'name') ? activeIcon : activeColor
    }
    return result
  }

  return (
    <div
      className={classNames(
        'i-rate',
        readonly && 'i-rate__readonly',
        className
      )}
      style={{ ...style }}
      onMouseEnter={handleEnterRate}
      onMouseLeave={handleLeaveRate}
      {...restProps}
    >
      {Array(count).fill('star').map((item, index) =>
        !allowHalf ? (
          <div
            className="i-rate-star"
            onMouseEnter={() => handleEnterRateItem(index)}
            onMouseDown={() => handleDownRateItem(index)}
            key={`${item}${index}`}
          >
            <Icon
              name={getStar(index, 'name')}
              color={getStar(index, 'color')}
              size={20}
            />
          </div>) : (
          <div
            className='i-rate-star'
            key={`${item}${index}`}
          >
            <div
              className="i-rate-star__first"
              onMouseEnter={() => handleEnterRateItem(index)}
              onMouseDown={() => handleDownRateItem(index)}
            >
              <Icon
                name={getStar(index, 'name')}
                color={getStar(index, 'color')}
                size={20}
              />
            </div>
            <div
              className="i-rate-star__second"
              onMouseEnter={() => handleEnterRateItem(index + 0.5)}
              onMouseDown={() => handleDownRateItem(index + 0.5)}
            >
              <Icon
                name={getStar(index + 0.5, 'name')}
                color={getStar(index + 0.5, 'color')}
                size={20}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

Rate.displayName = 'Rate';

export default Rate;
