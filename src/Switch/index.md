---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 1
---

# Switch 开关

用于两个互斥选项，多用于触发「开/关」

## 基本用法

不带描述，最基础的开关。

```tsx
import React, { useState } from 'react';
import { Switch } from 'idesign-react';

const App = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (val) => {
    console.log('value', val);
    setChecked(val);
  };

  return (
    <div className="idesign-demo-block-row">
      <Switch />
      <Switch value={checked} onChange={handleChange} />
    </div>
  );
};

export default App;
```

## 自定义颜色

提供 `inactiveColor` 和 `activeColor` 属性控制开关关闭和打开时的颜色。

```tsx
import React, { useState } from 'react';
import { Switch } from 'idesign-react';

const App = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (val) => {
    setChecked(val);
  };

  return (
    <div className="idesign-demo-block-row">
      <Switch inactiveColor="#64D878" value={checked} onChange={handleChange} />
      <Switch activeColor="#64D878" value={checked} onChange={handleChange} />
      <Switch
        inactiveColor="#ff4949"
        activeColor="#64D878"
        value={checked}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```

## 不同尺寸

提供 `small`、`medium`（默认）、`large` 三种尺寸的开关。

```tsx
import React, { useState } from 'react';
import { Switch } from 'idesign-react';

const App = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (val) => {
    setChecked(val);
  };

  return (
    <div className="idesign-demo-block-row">
      <Switch size="small" value={checked} onChange={handleChange} />
      <Switch size="medium" value={checked} onChange={handleChange} />
      <Switch size="large" value={checked} onChange={handleChange} />
    </div>
  );
};

export default App;
```

## 带描述内容的开关

提供 `inactiveColor` 和 `activeColor` 属性控制开关关闭和打开时的颜色。

```tsx
import React, { useState } from 'react';
import { Switch } from 'idesign-react';
import { Icon } from 'idesign-react';

const App = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (val) => {
    setChecked(val);
  };

  const inactiveIcon = <Icon name="Close" />;
  const activeIcon = <Icon name="Check" />;

  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Switch
          size="small"
          inactiveLabel="关"
          activeLabel="开"
          value={checked}
          onChange={handleChange}
        />
        <Switch
          size="medium"
          inactiveLabel="关"
          activeLabel="开"
          value={checked}
          onChange={handleChange}
        />
        <Switch
          size="large"
          inactiveLabel="关"
          activeLabel="开"
          value={checked}
          onChange={handleChange}
        />
      </div>
      <div className="idesign-demo-block-row">
        <Switch
          size="small"
          inactiveLabel={inactiveIcon}
          activeLabel={activeIcon}
          value={checked}
          onChange={handleChange}
        />
        <Switch
          size="medium"
          inactiveLabel={inactiveIcon}
          activeLabel={activeIcon}
          value={checked}
          onChange={handleChange}
        />
        <Switch
          size="large"
          inactiveLabel={inactiveIcon}
          activeLabel={activeIcon}
          value={checked}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default App;
```

## 禁用状态

可以使用 `disabled` 属性来定义开关是否被禁用，该属性接受一个 `Boolean` 类型的值。

```tsx
import React, { useState } from 'react';
import { Switch } from 'idesign-react';

const App = () => {
  const [checked, setChecked] = useState(true);

  const onChange = (val) => {
    setChecked(val);
  };

  return (
    <div className="idesign-demo-block-row">
      <Switch disabled />
      <Switch disabled value={checked} onChange={onChange} />
    </div>
  );
};

export default App;
```

## 加载中的状态

提供 `loading` 属性控制开关是否为加载状态。

```tsx
import React, { useState } from 'react';
import { Switch } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Switch size="small" loading />
      <Switch size="medium" loading />
      <Switch size="large" loading value={true} />
    </div>
  );
};

export default App;
```

<API src="./index.tsx" />
