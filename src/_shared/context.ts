import React from 'react';

/**
 * 创建带 dev 越界检测的 Context
 */
export function createStrictContext<T>(displayName: string) {
  const Context = React.createContext<T | null>(null);
  Context.displayName = displayName;

  const useContext = (): T => {
    const value = React.useContext(Context);
    if (value == null) {
      throw new Error(`[idesign-react] ${displayName} must be used within its Provider`);
    }
    return value;
  };

  return [Context, useContext] as const;
}
