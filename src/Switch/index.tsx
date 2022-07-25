import React from 'react';
import classNames from 'classnames';
import './index.scss';
import useDefault from '../hooks/useDefault';
import Icon from '../Icon';
import { SwitchProps } from './type';

const Switch: React.FC<SwitchProps> = (props) => {
  const {
    className,
    style,
    size = 'medium',
    disabled = false,
    loading = false,
    inactiveColor,
    activeColor,
    inactiveLabel,
    activeLabel,
    value,
    defaultValue = false,
    onChange = () => { },
    ...restProps
  } = props;

  const [innerChecked, setInnerChecked] = useDefault(value, defaultValue, onChange);

  const handleSwitch = () => {
    if (disabled || loading) return;
    const changedValue = !innerChecked;
    setInnerChecked(changedValue)
  };

  const renderContent = (value: string | number | boolean) => {
    if (!!value && activeLabel) {
      return activeLabel;
    }
    if (!value && inactiveLabel) {
      return inactiveLabel;
    }
    return null;
  };

  return (
    <button
      type="button"
      role="switch"
      disabled={disabled}
      className={classNames(
        'i-switch',
        innerChecked && 'i-switch-is-checked',
        (disabled || loading) && 'i-switch-is-disabled',
        size === 'small' && 'i-switch--size-small',
        size === 'large' && 'i-switch--size-large',
        className,
      )}
      style={{
        ...(style || {}),
        ...({
          backgroundColor: innerChecked ? activeColor : inactiveColor,
        } || {}),
      }}
      onClick={handleSwitch}
      {...restProps}
    >
      <span className={'i-switch__handle'}>
        {loading && <Icon name="Loading" size={{ small: 12, medium: 16, large: 20 }[size]} />}
      </span>
      {renderContent(innerChecked) && (
        <div className="i-switch__content">{renderContent(innerChecked)}</div>
      )}
    </button>
  );
};

Switch.displayName = 'Switch';

export default Switch;
