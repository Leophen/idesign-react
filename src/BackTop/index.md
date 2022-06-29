---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 7
---

# BackTop 回到顶部

## 基本用法

对具体 `window` 滚动使用：

```tsx
import React from 'react';
import { BackTop } from 'idesign-react';

const App = () => {
  return (
    <BackTop />
  );
};

export default App;
```

## 具体节点滚动

对具体 `DOM` 节点滚动使用：

```tsx
import React from 'react';
import { BackTop } from 'idesign-react';

const App = () => {
  const data = Array(24).fill('item')
  return (
    <>
      <BackTop
        target={
          () => document.getElementById('idesign-demo-scroll1')
        }
      />
      <div id="idesign-demo-scroll1" style={{height: 400, overflow: 'auto'}}>
        {data.map((item, index) => (
          <li className="idesign-demo-itemy" key={index}>
            {item}
          </li>
        ))}
      </div>
    </>
  );
};

export default App;
```

## 滚动显示起点

通过 `visibleHeight` 属性控制滚动到指定高度时，才显示返回顶部按钮：

```tsx
import React from 'react';
import { BackTop } from 'idesign-react';

const App = () => {
  const data = Array(24).fill('item')
  return (
    <>
      <BackTop
        visibleHeight={100}
        target={
          () => document.getElementById('idesign-demo-scroll2')
        }
      />
      <div id="idesign-demo-scroll2" style={{height: 400, overflow: 'auto'}}>
        {data.map((item, index) => (
          <li className="idesign-demo-itemy" key={index}>
            {item}
          </li>
        ))}
      </div>
    </>
  );
};

export default App;
```

## 自定义返回顶部按钮

直接包裹自定义内容：

```tsx
import React from 'react';
import { BackTop } from 'idesign-react';

const App = () => {
  return (
    <BackTop>
      <div>⬆️</div>
    </BackTop>
  );
};

export default App;
```



<API />
