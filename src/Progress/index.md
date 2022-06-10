---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 15
---

# Progress 进度条

## 基本用法

通过 `percentage` 属性控制进度。

```tsx
import React from 'react';
import { Progress } from 'idesign-react';

const App = () => {
  return (
    <div>
      <Progress percentage={60} />
    </div>
  );
};

export default App;
```

## 隐藏进度提示

通过 `labelTxt` 属性控制是否显示进度提示。

```tsx
import React from 'react';
import { Progress } from 'idesign-react';

const App = () => {
  return (
    <div>
      <Progress percentage={60} labelTxt={false} />
    </div>
  );
};

export default App;
```

## 进度提示在内

条形进度条通过 `innerLabel` 属性控制是否显示进度提示，注意使用该属性时进度条最小高度会设为 `20`。

```tsx
import React from 'react';
import { Progress } from 'idesign-react';

const App = () => {
  return (
    <div>
      <Progress percentage={60} innerLabel />
    </div>
  );
};

export default App;
```

## 自定义进度提示

通过 `label` 属性设置自定义进度提示。

```tsx
import React from 'react';
import { Progress } from 'idesign-react';

const App = () => {
  return (
    <div className="i-design-demo-column">
      <Progress percentage={30} label="😄" />
      <Progress percentage={60} label={<div>🌛</div>} />
    </div>
  );
};

export default App;
```

## 自定义进度条颜色

通过 `color` 属性设置自定义进度条颜色，`backColor` 属性控制进度条底色。

```tsx
import React from 'react';
import { Progress } from 'idesign-react';

const App = () => {
  return (
    <div className="i-design-demo-column">
      <Progress percentage={30} color="#FFCF2E" />
      <Progress percentage={60} color="linear-gradient(90deg, rgb(0, 255, 255), rgb(255, 0, 255))" backColor="#FFCF2E" />
    </div>
  );
};

export default App;
```

## 自定义宽度或粗细

通过 `width` 来控制条形进度条长度/环形进度条直径，通过 `strokeWidth` 属性控制进度条粗细度。

```tsx
import React from 'react';
import { Progress } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <Progress percentage={30} width={300} />
      <Progress percentage={60} strokeWidth={20} />
    </div>
  );
};

export default App;
```

## 环形进度条

通过 `type` 属性设置进度条类型，为 `circle` 时显示环形进度条。

```tsx
import React from 'react';
import { Progress } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Progress type="circle" percentage={0} />
      <Progress type="circle" percentage={30} width={100} />
      <Progress type="circle" percentage={60} width={100} strokeWidth={20} />
      <Progress type="circle" percentage={90} width={100} label={<div>🌛</div>} />
    </div>
  );
};

export default App;
```

## 进度加载动画

通过 `indeterminate` 属性设置不确定的进度加载循环动画，可用 `duration` 控制循环速度，默认为 `3`。

```tsx
import React from 'react';
import { Progress } from 'idesign-react';

const App = () => {
  return (
    <>
      <div className="idesign-demo-block-column">
        <Progress percentage={30} indeterminate />
        <Progress percentage={30} indeterminate duration={1} />
      </div>
      <div className="idesign-demo-block-row" style={{ marginTop: 20 }}>
        <Progress type="circle" width={100} indeterminate />
        <Progress type="circle" width={100} percentage={30} indeterminate />
        <Progress type="circle" width={100} duration={1} indeterminate />
      </div>
    </>
  );
};

export default App;
```

<API />
