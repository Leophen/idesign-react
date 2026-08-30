import { useState } from 'react';

export type ChangeHandler<T, P extends unknown[] = []> = (value: T, ...args: P) => void;

export default function useDefault<T, P extends unknown[] = []>(
  value: T | undefined,
  defaultValue: T,
  onChange?: ChangeHandler<T, P>,
): [T, ChangeHandler<T, P>] {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const defaultFn: ChangeHandler<T, P> = () => {};

  if (typeof value !== 'undefined') {
    return [value, onChange ?? defaultFn];
  }

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
