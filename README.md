# Coding Mind 运营 SOP 知识库

公司内部线下运营的标准作业流程（SOP）查询网站。纯静态 HTML，每个 SOP 一个页面，全站用 StatiCrypt AES-256 加密，托管在 GitHub Pages。

**Live：** <https://li2918.github.io/SOP/>
**访问密码：** 联系运营李老师（密码不留在仓库中）

## 这是什么

- **21 份** 线下运营 SOP，覆盖试课 / 新课 / 补课 / 改期 / 前台 / 电话 / 话术 / 财务 / 系统操作等
- **中英双语**：`/` 中文主版，`/en/` 英文版（部分全翻译，部分仍为 stub 跳转中文）
- **加密保护**：HTML 用 AES-256 + PBKDF2 加密，访客要输密码才能看内容
- **零构建**：不用 Node/npm 跑任何东西，每份 SOP 就是一个 HTML 文件

## 目录结构

```
SOP/
├── index.html                   中文目录页（加密）
├── style.css                    全站共享样式（不加密）
├── pages/                       20 份中文 SOP（全加密）
│   ├── daily-operations.html
│   ├── gift-card-redemption.html
│   └── ... 共 20 份
├── en/
│   ├── index.html               英文目录页（加密）
│   └── pages/                   20 份英文 SOP（加密；4 全译 + 16 stub）
├── assets/                      图片（不加密，目前为空）
├── files/                       Word/PDF/Excel 原件（不加密，目前为空）
├── README.md
└── .gitignore
```

## 7 大分类

| 分类 | 含 SOP |
| --- | --- |
| 📘 新人入职 | 岗位要求、日常工作制度、机构介绍 |
| 📚 课程运营 | 试课、新课/续课、补课、改期、课程/教师调整 |
| 📞 前台与沟通 | 电话接听、话术大全、时间沟通、日常问题 |
| 💰 财务与支付 | Wave Receipt 生成、Gift Card 发放与核销 |
| 💻 系统操作 | ShareMyWorks 学生指南、Zoom 录屏、密码速查 |
| 🎉 活动与营销 | Student Events + Flyer 制作 |
| ⚠️ 特殊情况 | 年度假期通知、非美国学生 DST 管理 |

## 部署

GitHub Pages 已配置 **Deploy from branch** `main /` (root)。
每次 push 到 `main`，约 1 分钟后自动上线，**不需要任何 Actions 或构建**。

一次性配置位置：<https://github.com/li2918/SOP/settings/pages>

## 维护流程

### 新增 / 修改 SOP

通常是由维护者（Claude）代操作。流程：

1. 把 Word/PDF/图片/文字需求发给维护者
2. 维护者产出明文 HTML（`pages/xxx.html` 中文 + `en/pages/xxx.html` 英文）
3. 维护者更新 `index.html` 和 `en/index.html` 的分类条目 + 关键词
4. 维护者用 StatiCrypt 加密所有新/改的 HTML
5. commit + push，约 1 分钟后线上可见

### 自己动手改（进阶）

如果想直接动手：

```bash
# 在本地编辑 pages/xxx.html 的明文 HTML
# 然后加密它（需要先装一次 staticrypt）
npm install -g staticrypt

staticrypt pages/xxx.html -p '<密码>' -d pages --short --remember 30 --config false \
  --template-title "运营 SOP 知识库" \
  --template-instructions "本站为公司内部文档，请输入访问密码" \
  --template-button "进入" --template-placeholder "请输入密码" \
  --template-error "密码错误，请重试" --template-remember "30 天内免登录" \
  --template-color-primary "#0969da" --template-color-secondary "#f6f8fa"

git add pages/xxx.html index.html
git commit -m "新增 SOP：xxx"
git push
```

英文版用对应的英文模板（Enter / Password / Wrong password, try again / Remember me for 30 days）。

> ⚠️ **千万不要 push 明文 HTML**。push 前确认文件开头是 `<html class="staticrypt-html">`，不是 `<html lang="zh-CN">`。

### 轮换密码

员工离职 / 每季度例行更换时：

1. 维护者本地跑一段"批量解密 → 用新密码重新加密"的脚本（大约 42 个 HTML 文件）
2. push 后老的 `remember me` 本地缓存在所有人浏览器里自动失效，下次访问需要输入新密码
3. 通过钉钉/企微群公告新密码，**不要写在仓库任何位置**

## 页面模板

每个 SOP 页面沿用同一套结构（见任意 `pages/*.html` 的明文版本，或要求维护者示范）：

| 元素 | 用途 |
| --- | --- |
| `<h1>` | 标题（每页一个） |
| `<div class="meta">` | 版本/日期/负责人 灰底信息块 |
| `<h2>` `<h3>` | 二/三级小标题 |
| `<ol>` / `<ul>` | 有序 / 无序列表 |
| `<table>` | 表格（异常处理、角色分工） |
| `<div class="note tip">` | 蓝色提示 |
| `<div class="note warning">` | 黄色警告 |
| `<div class="note danger">` | 红色高危 |
| `<a class="lang-switch">` | 语言切换按钮（可选） |

## 🔒 安全模型

### 已实现

- HTML 用 AES-256-CBC + PBKDF2（600K 次迭代）加密
- 密码仅在浏览器内参与哈希和解密，从不传到服务器
- "30 天免登录"勾选后，本地 localStorage 记住哈希（不是明文）

### 已知限制

- **`files/` 和 `assets/` 不受密码保护** — StatiCrypt 只加密 HTML，静态资源直连 URL 即可下载
  - 敏感原件（Word/PDF/Excel）放企业网盘（飞书/钉钉等），SOP 页里用外链
  - 普通流程图 PNG 放 `assets/` 问题不大
- **仓库是公开的**，加密 HTML 的 payload 所有人都能看见；安全性依赖于密码强度 + PBKDF2 的抗暴力
  - 密码至少 12 位、混合字符才算够安全
  - 若升级到 GitHub Pro + 私有仓库 + Private Pages 可获得更强保护（付费）

### 密码策略

- 每季度轮换 / 有员工离职立即轮换
- 长度 ≥ 12 位，建议混合大小写 + 数字
- 仅通过钉钉/企微群内部渠道发放，任何公开位置（仓库/文档/邮件抄送给外部）都不要出现

## 技术栈

- 纯 HTML + CSS + 原生 JS（目录页搜索仅 30 行）
- [StatiCrypt](https://github.com/robinmoisson/staticrypt) v3.x
- GitHub Pages

无构建步骤、无依赖、无 CI。

## 常见问题

**Q：样式全乱 / 链接 404？**
多半是相对路径写错。`index.html` 在根引用 `style.css`；`pages/xxx.html` 用 `../style.css`；`en/pages/xxx.html` 用 `../../style.css`。

**Q：搜索框没反应？**
浏览器禁用了 JS。功能依赖 JS，但仅 30 行原生代码，无第三方库。

**Q：忘了密码？**
联系运营李老师。密码只在内部渠道流通。

**Q：想加自定义域名？**
`Settings → Pages → Custom domain` 填域名，DNS 把 CNAME 指向 `li2918.github.io`，仓库根建 `CNAME` 文件写入域名。

**Q：想要某份 SOP 的改动历史？**
每次 push 就是一个 Git commit。GitHub 上任一文件点 **History** 可查"谁在什么时候改了哪些内容"。

**Q：SOP 里想要嵌入图片？**
图片放 `assets/`，在 SOP HTML 里用 `<img src="../assets/xxx.png">`（注意相对路径）。

**Q：英文版 SOP 点进去是跳转提示，不是英文内容？**
说明那篇仍是 stub（只有 4 份做了全翻译）。可以告知维护者优先翻哪几篇。
