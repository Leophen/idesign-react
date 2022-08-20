import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import { InputGroupProps } from './type';

const InputGroup: React.FC<InputGroupProps> = (props) => {
  const {
    className,
    children,
    style,
    prefixContent,
    suffixContent,
    clickPrefix,
    clickSuffix
  } = props;

  const [contentHeight, setContentHeight] = useState(0);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let maxHeight = 0;
    const groupChild = groupRef.current && (groupRef.current as HTMLElement).childNodes;
    groupChild &&
      Array.from(groupChild).map((item) => {
        if (
          (item as HTMLElement).className !== 'i-input__group-prefix' &&
          (item as HTMLElement).className !== 'i-input__group-suffix' &&
          (item as HTMLElement).offsetHeight > maxHeight
        ) {
          maxHeight = (item as HTMLElement).offsetHeight;
        }
      });
    setContentHeight(maxHeight);
  });

  const handleClickWith = (location: 'pre' | 'suf', e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.stopPropagation();
    if (clickPrefix && location === 'pre') {
      clickPrefix(e);
      return;
    }
    if (clickSuffix && location === 'suf') {
      clickSuffix(e);
      return;
    }
  };

  return (
    <div
      className={classNames('i-input__group', className)}
      style={{ ...(style || {}), ...{ height: contentHeight } }}
      ref={groupRef}
    >
      {prefixContent && (
        <div
          className={classNames('i-input__group-prefix', clickPrefix && 'i-input__group-cursor')}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickWith('pre', e)}
        >
          {prefixContent}
        </div>
      )}
      {children}
      {suffixContent && (
        <div
          className={classNames('i-input__group-suffix', clickSuffix && 'i-input__group-cursor')}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickWith('suf', e)}
        >
          {suffixContent}
        </div>
      )}
    </div>
  );
};

export default InputGroup;
