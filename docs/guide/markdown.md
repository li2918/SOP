# Markdown 快速上手

本站所有 SOP 都用 Markdown 编写。Markdown 是一种极简的排版语法，半小时就能掌握常用的 80%。

## 标题

```markdown
# 一级标题（文章标题，每篇只写一个）
## 二级标题
### 三级标题
```

## 强调 / 链接 / 代码

```markdown
**加粗**      _斜体_      ~~删除线~~

[链接文字](https://example.com)

行内代码：`git status`

行内快捷键：<kbd>Ctrl</kbd> + <kbd>C</kbd>
```

## 列表

```markdown
- 无序项 1
- 无序项 2
  - 子项
  - 子项

1. 有序项 1
2. 有序项 2
```

## 表格

```markdown
| 列 A | 列 B | 列 C |
| --- | --- | --- |
| 1 | 2 | 3 |
| 4 | 5 | 6 |
```

对齐方式：

```markdown
| 左对齐 | 居中 | 右对齐 |
| :--- | :---: | ---: |
| a | b | c |
```

## 图片

```markdown
![替代文字](/assets/customer-service/flow.png)
```

推荐把截图存到 `docs/public/assets/<分类>/` 下，再通过 `/assets/<分类>/xxx.png` 引用。

## 附件下载

```markdown
[报销流程 Word 版](/files/finance/reimbursement-v2.docx)
```

把原件放到 `docs/public/files/<分类>/` 下即可。

## 引用与提示框

```markdown
> 这是一段引用，适合写注意事项。
```

VitePress 还支持彩色提示框：

```markdown
::: tip 小贴士
这是绿色提示。
:::

::: warning 注意
这是黄色警告。
:::

::: danger 危险
这是红色高亮。
:::

::: info 说明
这是蓝色信息。
:::
```

## 流程图（Mermaid）

VitePress 支持 Mermaid 语法绘制流程图：

````markdown
```mermaid
flowchart LR
    A[客户申请退款] --> B{金额 < 500?}
    B -- 是 --> C[客服自批]
    B -- 否 --> D[主管审批]
    C --> E[财务打款]
    D --> E
```
````

::: tip
Mermaid 默认不开启，如需使用，请联系维护者安装 `vitepress-plugin-mermaid` 插件。
:::

## 代码块

````markdown
```bash
npm install
npm run dev
```

```python
print("Hello")
```
````

## 完整参考

- 菜鸟教程：<https://www.runoob.com/markdown/md-tutorial.html>
- VitePress 官方 Markdown 文档：<https://vitepress.dev/guide/markdown>
