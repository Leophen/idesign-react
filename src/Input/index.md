---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 4
---

# Input 输入框

用于字符输入的单行输入框。

## 基本用法

基础的单行输入框，可通过 `defaultValue` 设置默认值，通过 `value` 属性设置受控值，通过 `onChange` 设置值改变时触发的操作：

```tsx
import React, { useState } from 'react'
import { Input } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('这是默认值')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <Input />
      <h4>有默认值（非受控）</h4>
      <Input defaultValue={value} />
      <h4>有固定值（受控）</h4>
      <Input value={value} />
      <h4>一般用法</h4>
      <Input value={value} onChange={handleChange} />
    </>
  )
}

export default App
```

## 禁用状态

通过 `disabled` 属性指定是否禁用输入框。

```tsx
import React from 'react';
import { Input } from 'idesign-react';

const App = () => {
  return <Input disabled />;
};

export default App;
```

## 只读状态

通过 `readonly` 属性指定是否为只读状态。

```tsx
import React from 'react';
import { Input } from 'idesign-react';

const App = () => {
  return <Input readonly />;
};

export default App;
```

## 聚焦全选

通过 `selectAll` 属性指定聚焦状态时自动全选。

```tsx
import React from 'react';
import { Input } from 'idesign-react';

const App = () => {
  return <Input selectAll />;
};

export default App;
```

## 不同尺寸

通过 `size` 属性指定不同尺寸的输入框，默认为 `medium`。

```tsx
import React from 'react';
import { Input } from 'idesign-react';

const App = () => {
  return (
    <>
      <Input size="small" />
      <br />
      <Input size="medium" />
      <br />
      <Input size="large" />
    </>
  );
};

export default App;
```

## 不同状态

通过 `status` 属性指定不同状态的输入框，通过 `tips` 属性指定 底部提示信息。

```tsx
import React from 'react';
import { Input } from 'idesign-react';

const App = () => {
  return (
    <>
      <Input placeholder="成功状态" status="success" />
      <br />
      <Input placeholder="警告状态" status="warning" />
      <br />
      <Input placeholder="错误状态" status="error" />
      <br />
      <Input placeholder="成功状态" status="success" tips="成功状态提示" />
      <Input placeholder="警告状态" status="warning" tips="警告状态提示" />
      <Input placeholder="错误状态" status="error" tips="错误状态提示" />
    </>
  );
};

export default App;
```

## 限制字数

通过 `maxLength` 属性指定最多可以输入的字符个数。

```tsx
import React, { useState } from 'react';
import { Input } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('iDesign');

  return (
    <>
      <Input maxLength={15} />
      <br />
      <Input
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

## 密码输入框

通过将 `type` 属性指定为 `password` 切换为密码输入框。

```tsx
import React from 'react';
import { Input } from 'idesign-react';

const App = () => {
  return <Input type="password" />;
};

export default App;
```

## 高级数字输入框

通过将 `type` 属性指定为 `number` 切换为数字滑块输入框：右侧显示数控按钮、悬浮左边缘出现鼠标数控滑块、可通过键盘上下键微调数值。

另外，可通过 `speed` 属性值设置滑块移动数值变化速率，通过 `step` 设置数值变化间隔，通过 `precision` 设置数值保留几位有效数字，通过 `hideNumberBtn` 设置隐藏数字输入框后缀按钮。

```tsx
import React, { useState } from 'react';
import { Input } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('1');

  const handleChange = (val) => {
    setValue(val)
  }

  return (
    <>
      <h4>默认数字输入框</h4>
      <Input type="number" />
      <h4>隐藏调整控件的数字输入框</h4>
      <Input type="number" hideNumberBtn />
      <h4>受控且有最大最小值的数字输入框</h4>
      <Input value={value} type="number" minNumber={1} maxNumber={50} onChange={handleChange} />
      <h4>受控且有最大最小值并锁定空值的数字输入框</h4>
      <Input value={value} type="number" minNumber={1} maxNumber={50} minNumberLock onChange={handleChange} />
      <h4>慢速拖拽控件且有最大值的数字输入框</h4>
      <Input
        placeholder="speed 设为 slow + 最大值 100"
        speed="slow"
        type="number"
        maxNumber={100}
      />
      <h4>快速拖拽控件且有最小值的数字输入框</h4>
      <Input placeholder="speed 设为 fast + 最小值 0" speed="fast" type="number" minNumber={0} />
      <h4>设置精度及数字间隔的数字输入框</h4>
      <Input
        placeholder="保留 2 位有效数字 + 间隔 0.5"
        type="number"
        precision={2}
        step={0.5}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <h4>带前后缀图标的数字输入框</h4>
      <Input
        type="number"
        prefixIcon="TagCollection"
        suffixIcon="Search"
        clickSuffixIcon={() => {
          alert('Search');
        }}
      />
    </>
  );
};

export default App;
```

## 带清空按钮的输入框

通过 `clearable` 属性或 `onClear` 显示清空按钮，实现一键清空输入框内容。

```tsx
import React, { useState } from 'react';
import { Input } from 'idesign-react';

const App = () => {
  const [value1, setValue1] = useState('iDesign1');
  const [value2, setValue2] = useState('iDesign2');

  return (
    <>
      <Input
        value={value1}
        clearable
        onChange={(val) => {
          setValue1(val);
        }}
      />
      <br />
      <Input
        value={value2}
        onChange={(val) => {
          setValue2(val);
        }}
        onClear={(e) => {
          console.log('onClear', e);
        }}
      />
    </>
  );
};

export default App;
```

## 带内置图标的输入框

通过 `prefixIcon` 或 `suffixIcon` 来指定输入框前后内置图标。

```tsx
import React, { useState } from 'react';
import { Input } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('iDesign');

  return (
    <>
      <Input prefixIcon="Search" />
      <br />
      <Input suffixIcon="Calendar" />
      <br />
      <Input
        value={value}
        clearable
        suffixIcon="Search"
        onChange={(val) => {
          setValue(val);
        }}
      />
      <br />
      <Input
        prefixIcon="Search"
        suffixIcon="Calendar"
        clickPrefixIcon={(e) => console.log(e)}
        clickSuffixIcon={(e) => console.log(e)}
      />
    </>
  );
};

export default App;
```

## 组合输入框

通过 `Input.Group` 包裹不同内容组成单行的组合输入框，可结合 [Grid](./grid) 组件来控制宽度占比。

```tsx
import React from 'react';
import { Input } from 'idesign-react';
import { Grid } from 'idesign-react';
import { Button } from 'idesign-react';
import { Icon } from 'idesign-react';

const App = () => {
  const prefixIcon = <Icon name="ShoppingCart" />;
  const suffixIcon = <Icon name="Search" />;

  return (
    <>
      <h4>输入框 + 输入框</h4>
      <Input.Group>
        <Input />
        <Input />
      </Input.Group>
      <br />
      <Input.Group>
        <Grid>
          <Grid.Item width={120}>
            <Input />
          </Grid.Item>
          <Grid.Item>
            <Input />
          </Grid.Item>
        </Grid>
      </Input.Group>
      <br />
      <Input.Group>
        <Grid>
          <Grid.Item span={4}>
            <Input />
          </Grid.Item>
          <Grid.Item span={8}>
            <Input />
          </Grid.Item>
          <Grid.Item span={12}>
            <Input />
          </Grid.Item>
        </Grid>
      </Input.Group>

      <h4>输入框 + 按钮</h4>
      <Input.Group>
        <Input />
        <Button style={{ marginLeft: '10px' }}>搜索</Button>
      </Input.Group>

      <h4>输入框 + 前后缀</h4>
      <Input.Group prefixContent="http://">
        <Input />
      </Input.Group>
      <br />
      <Input.Group prefixContent="http://" suffixContent=".com">
        <Input />
      </Input.Group>
      <br />
      <Input.Group
        prefixContent={prefixIcon}
        suffixContent={suffixIcon}
        clickPrefix={(e) => console.log(e)}
        clickSuffix={(e) => console.log(e)}
      >
        <Input />
      </Input.Group>
    </>
  );
};

export default App;
```

## 触发事件

一系列的事件触发操作。

```tsx
import React, { useState } from 'react';
import { Input } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('iDesign');

  return (
    <>
      <h4>onChange 输入时触发</h4>
      <Input
        onChange={(val, e) => {
          console.log('onChange', val, e);
        }}
      />
      <h4>onFocus 聚焦时触发</h4>
      <Input
        onFocus={(val, e) => {
          console.log('onFocus', val, e);
        }}
      />
      <h4>onBlur 失焦时触发</h4>
      <Input
        onBlur={(val, e) => {
          console.log('onBlur', val, e);
        }}
      />
      <h4>onKeyDown 键盘按下时触发</h4>
      <Input
        onKeyDown={(val, e) => {
          console.log('onKeyDown', val, e);
        }}
      />
      <h4>onEnter 键盘按下回车时触发</h4>
      <Input
        onEnter={(val, e) => {
          console.log('onEnter', val, e);
        }}
      />
      <h4>onKeyUp 键盘释放时触发</h4>
      <Input
        onKeyUp={(val, e) => {
          console.log('onKeyUp', val, e);
        }}
      />
      <h4>onClear 清空按钮点击时触发</h4>
      <Input
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
        onClear={(e) => {
          console.log('onClear', e);
        }}
      />
    </>
  );
};

export default App;
```

## Input API

<API hideTitle />

## InputGroup API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 按钮内容 | `ReactNode` | `--` |
| className | 类名 | `string` | `--` |
| style | 自定义样式 | `CSSProperties` | `--` |
| prefixContent | 输入框组合前缀 | `ReactNode` | `--` |
| clickPrefix | 点击前缀触发事件 | `(context: { e: React.MouseEvent<HTMLDivElement> }) => void` | `--` |
| clickSuffix | 点击后缀触发事件 | `(context: { e: React.MouseEvent<HTMLDivElement> }) => void` | `--` |
