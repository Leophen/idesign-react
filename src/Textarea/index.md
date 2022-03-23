---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 4
---

# Textarea 多行文本框

## 基本用法

用于字符输入的多行输入框。

```tsx
import React, { useState } from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('iDesign');

  return (
    <>
      <Textarea
        placeholder="请输入内容（无默认值）"
        onChange={(value) => {
          console.log(value);
        }}
      />
      <br />
      <Textarea
        placeholder="请输入内容（有默认值）"
        value={value}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
      />
    </>
  );
};

export default App;
```

## 禁用状态

通过 `disabled` 属性指定是否禁用输入框。

```tsx
import React from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  return <Textarea disabled />;
};

export default App;
```

## 只读状态

通过 `readonly` 属性指定是否为只读状态。

```tsx
import React from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  return <Textarea readonly />;
};

export default App;
```

## 不同状态

通过 `status` 属性指定不同状态的输入框，通过 `tips` 属性指定 底部提示信息。

```tsx
import React from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  return (
    <>
      <Textarea placeholder="成功状态" status="success" />
      <br />
      <Textarea placeholder="警告状态" status="warning" />
      <br />
      <Textarea placeholder="错误状态" status="error" />
      <br />
      <Textarea placeholder="成功状态" status="success" tips="成功状态提示" />
      <Textarea placeholder="警告状态" status="warning" tips="警告状态提示" />
      <Textarea placeholder="错误状态" status="error" tips="错误状态提示" />
    </>
  );
};

export default App;
```

## 限制字数

通过 `maxLength` 属性指定最多可以输入的字符个数。

```tsx
import React, { useState } from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('iDesign');

  return (
    <>
      <Textarea maxLength={15} />
      <br />
      <Textarea
        value={value}
        maxLength={20}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
      />
    </>
  );
};

export default App;
```

## 禁用高度调整

通过 `noResize` 属性指定是否禁用右下角高度调整模块。

```tsx
import React from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  return <Textarea noResize />;
};

export default App;
```

## 限制高度

通过 `minRows` 和 `maxRows` 属性控制最小和最大高度。

```tsx
import React from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  return (
    <>
      <Textarea
        placeholder="限制最小高度，minRows={2}"
        minRows={2}
      />
      <br />
      <Textarea
        placeholder="限制最大高度，maxRows={6}"
        maxRows={6}
      />
      <br />
      <Textarea
        placeholder="限制最小和最大高度，minRows={2} maxRows={6}"
        minRows={2}
        maxRows={6}
      />
    </>
  );
};

export default App;
```

## 高度自适应

通过 `autoSize` 属性控制高度自适应。

```tsx
import React from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  return (
    <>
      <Textarea
        placeholder="高度自适应，autoSize = true"
        autoSize
      />
      <br />
      <Textarea
        placeholder="高度自适应 + 限制高度，minRows={2} maxRows={6}"
        autoSize
        minRows={2}
        maxRows={6}
      />
    </>
  );
};

export default App;
```

## 触发事件

一系列的事件触发操作。

```tsx
import React, { useState } from 'react';
import { Textarea } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('iDesign');

  return (
    <>
      <h3>onChange 输入时触发</h3>
      <Textarea
        onChange={(val, e) => {
          console.log('onChange', val, e);
        }}
      />
      <h3>onFocus 聚焦时触发</h3>
      <Textarea
        onFocus={(val, e) => {
          console.log('onFocus', val, e);
        }}
      />
      <h3>onBlur 失焦时触发</h3>
      <Textarea
        onBlur={(val, e) => {
          console.log('onBlur', val, e);
        }}
      />
    </>
  );
};

export default App;
```
