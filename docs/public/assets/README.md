# 图片 / 截图存放目录

本目录用于存放各业务线 SOP 中引用的图片、截图、流程图等。

## 目录规范

```
assets/
├── customer-service/
├── sales/
├── marketing/
├── product/
├── finance/
├── hr/
└── onboarding/
```

## 命名规范

- 英文小写 + 短横线，如 `refund-flow.png`、`lead-funnel.jpg`
- 流程图建议用 PNG / SVG，截图建议用 PNG
- 图片宽度建议不超过 1600px，体积控制在 500 KB 以内
  （可用 [TinyPNG](https://tinypng.com/) 压缩）

## 在 SOP 中引用

```markdown
![退款流程图](/assets/customer-service/refund-flow.png)
```

注意：链接以 `/assets/...` 开头，不要写 `/public/assets/...`。
