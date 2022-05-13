import { useState } from 'react';

export interface ChangeHandler<T, P extends any[]> {
  // @ts-ignore
  (value: T, ...args: P);
}

export default function useDefault<T, P extends any[]>(
  value: T | undefined,
  defaultValue: T,
  onChange: ChangeHandler<T, P>,
): [T, ChangeHandler<T, P>] {
  // 无论是否受控，都要 useState，因为 Hooks 是无条件的
  const [internalValue, setInternalValue] = useState(defaultValue);

  const defaultFn = () => {};

  // 受控模式
  if (typeof value !== 'undefined') {
    return [value, onChange || defaultFn];
  }

  // 非受控模式
  return [
    internalValue,
    (newValue, ...args) => {
      setInternalValue(newValue);
      if (typeof onChange === 'function') {
        onChange(newValue, ...args);
      }
    },
  ];
}
