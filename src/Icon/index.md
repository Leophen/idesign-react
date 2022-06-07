---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
  order: 1
order: 2
---

# Icon 图标

iDesign 提供了一套常用的图标集合，可直接使用。

## 基本用法

使用 `name` 属性选择展示的图标。

```tsx
import React from 'react';
import { Icon } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Icon name="ModeLight" />
      <Icon name="ModeDark" />
    </div>
  );
};

export default App;
```

## 不同尺寸

提供 `size` 属性自定义图标大小。

```tsx
import React from 'react';
import { Icon } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Icon name="TipCheck" size={24} />
      <Icon name="TipCheck" size={32} />
      <Icon name="TipCheck" size={48} />
    </div>
  );
};

export default App;
```

## 不同颜色

提供 `color` 属性自定义图标大小。

```tsx
import React from 'react';
import { Icon } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Icon name="TipClose" size={32} color="#8A88FF" />
      <Icon name="TipClose" size={32} color="rgb(58, 54, 255)" />
      <Icon name="TipClose" size={32} color="hsl(211, 100%, 61%)" />
      <Icon name="TipClose" size={32} color="#19E6F3" />
    </div>
  );
};

export default App;
```

## 全部图标

```tsx
/**
 * inline: true
 */

import React, { useState, useEffect } from 'react';
import { Icon } from 'idesign-react';
import _ from 'lodash';
import axios from 'axios';
import classNames from 'classnames';

const App = () => {
  const [iconArr, setIconArr] = useState([]);
  const api =
    'https://at.alicdn.com/t/font_3161433_glke53nnqws.json?spm=a313x.7781069.1998910419.80&file=font_3161433_glke53nnqws.json';

  useEffect(() => {
    let isUnmounted = false;
    const abortController = new window.AbortController();
    axios
      .get(api)
      .then((res) => setIconArr(res.data.glyphs))
      .finally(() => {});
    return () => {
      isUnmounted = true;
      abortController.abort;
    };
  }, []);

  const sortedIconArr = _.sortBy(iconArr, (item) => item.name);

  const [copyed, setCopyed] = useState(false);
  const [curName, setCurName] = useState('');
  const resetCopyTip = () => {
    setCopyed(false);
    setCurName('');
    clearTimeout(resetCopyTip);
  };
  const handleCopyName = (value) => {
    navigator.clipboard.writeText(`<Icon name="${value}" />`);
    setCopyed(true);
    setCurName(value);
    setTimeout(resetCopyTip, 500);
  };

  return (
    <ul className="i-design-demo-icon-list">
      {sortedIconArr.map((item) => {
        return (
          <li
            className={classNames(
              'i-design-demo-icon-item',
              curName === item.name && copyed && '-copyed',
            )}
            key={item.icon_id}
            onClick={() => handleCopyName(item.name)}
          >
            <Icon name={item.name} size={32} />
            <div>{item.name}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default App;
```

<API />
