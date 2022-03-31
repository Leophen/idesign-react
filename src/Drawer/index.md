---
nav:
  title: 组件
  path: /components
group:
  title: 弹框提示组件
  order: 5
order: 5
---

# Drawer 抽屉

屏幕边缘滑出的抽屉式浮层面板。

## 基本用法

可通过 `visible` 属性控制抽屉显示隐藏。

```tsx
import React, { useState } from 'react'
import { Button, Drawer } from 'idesign-react'

const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible(true)}>
          打开抽屉
        </Button>
        <Drawer
          header="抽屉标题"
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
      </div>
    </div>
  )
}

export default App
```

## 禁用退出键关闭功能

可通过 `closeOnEsc` 属性控制打开抽屉时按下 ESC 退出键是否触发关闭事件，默认为 `true`。

```tsx
import React, { useState } from 'react'
import { Button, Drawer } from 'idesign-react'

const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible(true)}>
          禁用抽屉退出键功能
        </Button>
        <Drawer
          header="抽屉标题"
          visible={visible}
          closeOnEsc={false}
          onClose={() => setVisible(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
      </div>
    </div>
  )
}

export default App
```

## 隐藏遮罩层

可通过 `showMask` 属性控制打开抽屉时是否显示遮罩层，默认为 `true`。

```tsx
import React, { useState } from 'react'
import { Button, Drawer } from 'idesign-react'

const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible(true)}>
          隐藏遮罩层
        </Button>
        <Drawer
          header="抽屉标题"
          visible={visible}
          showMask={false}
          onClose={() => setVisible(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
      </div>
    </div>
  )
}

export default App
```

## 自定义抽屉方向

可通过 `placement` 属性控制抽屉展开方向，默认为 `right`。

```tsx
import React, { useState } from 'react'
import { Button, Drawer } from 'idesign-react'

const App = () => {
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visible4, setVisible4] = useState(false)

  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible1(true)}>
          默认方向
        </Button>
        <Button type="primary" onClick={() => setVisible2(true)}>
          从左展开
        </Button>
        <Button type="primary" onClick={() => setVisible3(true)}>
          从上展开
        </Button>
        <Button type="primary" onClick={() => setVisible4(true)}>
          从下展开
        </Button>
        <Drawer
          header='抽屉标题'
          visible={visible1}
          onClose={() => setVisible1(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
        <Drawer
          header='抽屉标题'
          visible={visible2}
          placement='left'
          onClose={() => setVisible2(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
        <Drawer
          header='抽屉标题'
          visible={visible3}
          placement='top'
          onClose={() => setVisible3(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
        <Drawer
          header='抽屉标题'
          visible={visible4}
          placement='bottom'
          onClose={() => setVisible4(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
      </div>
    </div>
  )
}

export default App
```

## 自定义抽屉宽高

可通过 `width` 或 `height` 属性控制抽屉宽高。

```tsx
import React, { useState } from 'react'
import { Button, Drawer } from 'idesign-react'

const App = () => {
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible1(true)}>
          自定义宽度
        </Button>
        <Button type="primary" onClick={() => setVisible2(true)}>
          自定义高度
        </Button>
        <Drawer
          header="抽屉标题"
          visible={visible1}
          width={500}
          onClose={() => setVisible1(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
        <Drawer
          header="抽屉标题"
          visible={visible2}
          placement='top'
          height={500}
          onClose={() => setVisible2(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
      </div>
    </div>
  )
}

export default App
```

## 自定义抽屉头部

可通过 `header` 属性控制抽屉头部内容。

```tsx
import React, { useState } from 'react'
import { Button, Drawer, Icon } from 'idesign-react'

const header = (
  <>
    <Icon name="Histogram" />
    <span>这是一个自定义标题</span>
  </>
)

const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible(true)}>
          自定义头部
        </Button>
        <Drawer
          header={header}
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
      </div>
    </div>
  )
}

export default App
```

## 自定义抽屉底部

可通过 `footer` 属性控制抽屉底部内容，当设为 `false` 时隐藏抽屉底部内容。

```tsx
import React, { useState } from 'react'
import { Button, Drawer, Icon } from 'idesign-react'

const footer = (
  <>
    <Button variant="outline" onClick={() => setVisible1(false)}>我再想想</Button>
    <Button>去意已决</Button>
  </>
)

const App = () => {
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)

  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible1(true)}>
          自定义底部
        </Button>
        <Button type="primary" onClick={() => setVisible2(true)}>
          隐藏抽屉底部
        </Button>
        <Drawer
          header='抽屉标题'
          footer={footer}
          visible={visible1}
          onClose={() => setVisible1(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
        <Drawer
          header='抽屉标题'
          footer={false}
          visible={visible2}
          onClose={() => setVisible2(false)}
        >
          <span>抽屉内容</span>
        </Drawer>
      </div>
    </div>
  )
}

export default App
```

<API src="./index.tsx"></API>
