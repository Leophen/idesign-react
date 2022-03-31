---
nav:
  title: 组件
  path: /components
group:
  title: 弹框提示组件
  order: 5
order: 4
---

# Dialog 对话框

模态对话框。

## 基本用法

可通过 `visible` 属性控制对话框显示隐藏。

```tsx
import React, { useState } from 'react'
import { Button, Dialog } from 'idesign-react'

const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible(true)}>
          打开对话框
        </Button>
        <Dialog
          header="对话框标题"
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <span>对话框内容</span>
        </Dialog>
      </div>
    </div>
  )
}

export default App
```

## 自定义对话框宽度

可通过 `width` 属性控制对话框宽度。

```tsx
import React, { useState } from 'react'
import { Button, Dialog } from 'idesign-react'

const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible(true)}>
          自定义宽度
        </Button>
        <Dialog
          header="对话框标题"
          visible={visible}
          width={800}
          onClose={() => setVisible(false)}
        >
          <span>对话框内容</span>
        </Dialog>
      </div>
    </div>
  )
}

export default App
```

## 自定义对话框头部

可通过 `header` 属性控制对话框头部内容。

```tsx
import React, { useState } from 'react'
import { Button, Dialog, Icon } from 'idesign-react'

const header = (
  <>
    <Icon name="TipWarningFill" />
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
        <Dialog
          header={header}
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <span>对话框内容</span>
        </Dialog>
      </div>
    </div>
  )
}

export default App
```

## 自定义对话框底部

可通过 `footer` 属性控制对话框底部内容。

```tsx
import React, { useState } from 'react'
import { Button, Dialog, Icon } from 'idesign-react'

const App = () => {
  const [visible, setVisible] = useState(false)

  const footer = (
    <>
      <Button variant="outline" onClick={() => setVisible(false)}>我再想想</Button>
      <Button>去意已决</Button>
    </>
  )

  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button type="primary" onClick={() => setVisible(true)}>
          自定义底部
        </Button>
        <Dialog
          header='对话框标题'
          footer={footer}
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <span>对话框内容</span>
        </Dialog>
      </div>
    </div>
  )
}

export default App
```

<API src="./index.tsx"></API>
