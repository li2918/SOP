# 附件原件存放目录

本目录用于存放各业务线 SOP 的原始 Word / PDF / Excel 文件，供下载。

## 目录规范

```
files/
├── customer-service/   客户服务类附件
├── sales/              销售类附件
├── marketing/          市场类附件
├── product/            产品运营类附件
├── finance/            财务类附件
├── hr/                 人事行政类附件
└── onboarding/         新人培训类附件
```

## 命名规范

- 使用**英文小写 + 短横线**，不要空格、中文，便于链接和版本控制
- 在文件名中带版本号，方便追溯
- 示例：
  - `refund-policy-v3.2.docx`
  - `monthly-closing-checklist-2026.xlsx`
  - `onboarding-handbook-v1.0.pdf`

## 在 SOP 中引用

```markdown
[退款政策 v3.2](/files/customer-service/refund-policy-v3.2.docx)
```

注意：链接以 `/files/...` 开头，**不要**写 `/public/files/...`。VitePress 会自动把 `public/` 目录下的内容映射到网站根路径。

## 大文件提示

超过 25 MB 的附件不建议放在 Git 仓库。可以：

1. 用 [Git LFS](https://git-lfs.com/) 托管
2. 或上传到公司文件服务器 / 云盘，在 SOP 中放外链
