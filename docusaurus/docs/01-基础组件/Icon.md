---
title: Icon 按钮
---

import IconDisplay from '/src/components/IconDisplay/index.tsx'

iDesign 提供了一套常用的图标集合，可直接使用。

## 基本用法

使用 `name` 属性选择展示的图标。

```tsx live
<div className="demo-block-row">
  <Icon name="ModeLight" />
  <Icon name="ModeDark" />
</div>
```

## 不同尺寸

提供 `size` 属性自定义图标大小。

```tsx live
<div className="demo-block-row">
  <Icon name="TipCheck" size={16} />
  <Icon name="TipCheck" size={24} />
  <Icon name="TipCheck" size={32} />
</div>
```

## 不同颜色

提供 `color` 属性自定义图标大小。

```tsx live
<div className="demo-block-row">
  <Icon name="TipClose" size={24} color="#5e62ea" />
  <Icon name="TipClose" size={24} color="#65b687" />
  <Icon name="TipClose" size={24} color="#f1ac51" />
  <Icon name="TipClose" size={24} color="#ec7491" />
</div>
```

## 全部图标

<IconDisplay />

## API

| 属性      | 说明             | 类型                         | 默认值 |
| --------- | ---------------- | ---------------------------- | ------ |
| className | 类名             | `string`                     | `--`   |
| style     | 组件自定义样式   | `CSSProperties`              | `--`   |
| name      | 图标名称         | `string`                     | `--`   |
| size      | 图标尺寸         | `string` \| `number`         | `16`   |
| color     | 图标颜色         | `string`                     | `--`   |
| disabled  | 是否禁用图标     | `boolean`                    | `--`   |
| onClick   | 点击图标触发事件 | `MouseEventHandler<Element>` | `--`   |
