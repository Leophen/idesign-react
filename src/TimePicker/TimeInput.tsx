import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import _ from 'lodash';
import Input from '../Input';
import { TimeInputProps } from './type';
import { DEFAULT_FORMAT } from './index'

const TimeInput: React.FC<TimeInputProps> = (props) => {
  const {
    value = { hour: '00', minute: '00', second: '00', meridiem: 'AM' },
    disabled = false,
    format = DEFAULT_FORMAT,
    onChange = () => { }
  } = props

  const [innerValue, setInnerValue] = useState(value)
  const [show, setShow] = useState({
    hour: false,
    minute: false,
    second: false
  })

  useEffect(() => {
    /H|h/.test(format) && (show.hour = true);
    /m/.test(format) && (show.minute = true);
    /s/.test(format) && (show.second = true);
    setShow({ ...show })

    let newHour = /^[H]/.test(format) ? value.hour : Number(value.hour) % 12
    newHour = _.padStart(String(newHour), 2, '0');
    value.hour = newHour
    setInnerValue({ ...value })
  }, [value, format])

  const inputChangeHour = (val: string) => {
    val = _.padStart(String(val), 2, '0');
    innerValue.hour = val
    setInnerValue({ ...innerValue })
    onChange?.(innerValue)
  }

  const inputChangeMinute = (val: string) => {
    val = _.padStart(String(val), 2, '0');
    innerValue.minute = val
    setInnerValue({ ...innerValue })
    onChange?.(innerValue)
  }

  const inputChangeSecond = (val: string) => {
    val = _.padStart(String(val), 2, '0');
    innerValue.second = val
    setInnerValue({ ...innerValue })
    onChange?.(innerValue)
  }

  const handleUsualBlur = () => {
    innerValue.hour = _.padStart(String(innerValue.hour), 2, '0')
    innerValue.minute = _.padStart(String(innerValue.minute), 2, '0')
    innerValue.second = _.padStart(String(innerValue.second), 2, '0')
    setInnerValue({ ...value })
  }

  const timeColon = (
    <div
      className={classNames(
        'i-time-colon',
        disabled && 'i-time-colon__disabled'
      )}
    >
      :
    </div>
  )

  return (
    <Input
      placeholder=""
      readonly={!disabled}
      disabled={disabled}
      suffixIcon="Clock"
    >
      {show.hour && <>
        <Input
          size="small"
          type="number"
          hideNumberBtn
          minNumber={0}
          maxNumber={/^[H]/.test(format) ? 23 : 11}
          placeholder=''
          disabled={disabled}
          value={innerValue?.hour || ''}
          onChange={inputChangeHour}
          onBlur={handleUsualBlur}
        />
        {timeColon}
      </>}
      {show.minute && <>
        <Input
          size="small"
          type="number"
          hideNumberBtn
          minNumber={0}
          maxNumber={59}
          placeholder=''
          disabled={disabled}
          value={innerValue?.minute || ''}
          onChange={inputChangeMinute}
          onBlur={handleUsualBlur}
        />
      </>}
      {show.second && <>
        {timeColon}
        <Input
          size="small"
          type="number"
          hideNumberBtn
          minNumber={0}
          maxNumber={59}
          placeholder=''
          disabled={disabled}
          value={innerValue?.second || ''}
          onChange={inputChangeSecond}
          onBlur={handleUsualBlur}
        />
      </>}
    </Input>
  )
}

export default TimeInput;
