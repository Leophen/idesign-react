import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import Icon from '../Icon';
import useDefault from '../hooks/useDefault';
import tinycolor from 'tinycolor2';

export interface RateProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 分值
   */
  value?: number;
  /**
   * 默认分值
   * @default 0
   */
  defaultValue?: number;
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 是否可清除
   * @default false
   */
  allowClear?: boolean;
  /**
   * 是否支持半星
   * @default false
   */
  allowHalf?: boolean;
  /**
   * 最大分值
   * @default 5
   */
  count?: number;
  /**
   * 选中颜色
   */
  activeColor?: string;
  /**
   * 未选中颜色
   */
  voidColor?: string;
  /**
   * 选中图标
   * @default StarFill
   */
  activeIcon?: string;
  /**
   * 未选中图标
   * @default StarFill
   */
  voidIcon?: string;
  /**
   * 选择评分时触发
   */
  onChange?: (val: number) => void;
}

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
    activeColor,
    voidColor,
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
    let result = (type === 'name') ? voidIcon : (voidColor ?? 'void')
    const compareValue = ifHover ? hoverValue : innerValue
    if (compareValue > index) {
      result = (type === 'name') ? activeIcon : (activeColor ?? 'active')
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
            className={classNames(
              'i-rate-star',
              getStar(index, 'color') === 'active' && 'i-rate-star__active',
            )}
            onMouseEnter={() => handleEnterRateItem(index)}
            onMouseDown={() => handleDownRateItem(index)}
            key={`${item}${index}`}
          >
            <Icon
              name={getStar(index, 'name')}
              color={tinycolor(getStar(index, 'color')).isValid() ? getStar(index, 'color') : undefined}
              size={20}
            />
          </div>) : (
          <div
            className='i-rate-star'
            key={`${item}${index}`}
          >
            <div
              className={classNames(
                'i-rate-star',
                'i-rate-star__first',
                getStar(index, 'color') === 'active' && 'i-rate-star__active',
              )}
              onMouseEnter={() => handleEnterRateItem(index)}
              onMouseDown={() => handleDownRateItem(index)}
            >
              <Icon
                name={getStar(index, 'name')}
                color={tinycolor(getStar(index, 'color')).isValid() ? getStar(index, 'color') : undefined}
                size={20}
              />
            </div>
            <div
              className={classNames(
                'i-rate-star',
                'i-rate-star__second',
                getStar(index, 'color') === 'active' && 'i-rate-star__active',
              )}
              onMouseEnter={() => handleEnterRateItem(index + 0.5)}
              onMouseDown={() => handleDownRateItem(index + 0.5)}
            >
              <Icon
                name={getStar(index + 0.5, 'name')}
                color={tinycolor(getStar(index + 0.5, 'color')).isValid() ? getStar(index, 'color') : undefined}
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
