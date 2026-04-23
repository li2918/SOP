# 运营 SOP 知识库

一个纯静态网站，每个 SOP 对应一个 HTML 页面。**不需要 Node.js、不需要任何构建工具**。您在编辑器里直接改 HTML，push 即上线。

- 🗂️ `index.html` — 目录页（含按关键词搜索）
- 📄 `pages/` — 每个 SOP 一个 HTML 文件
- 🎨 `style.css` — 所有页面共享的样式
- 🖼️ `assets/` — 图片、截图
- 📎 `files/` — 原始 Word / PDF / Excel 附件

## 文件结构

```
SOP/
├── index.html              目录页
├── style.css               共享样式
├── pages/                  各 SOP 页面
│   └── example-sop.html    示例（可删除或替换）
├── assets/                 图片 / 截图
├── files/                  Word / PDF / Excel 下载
├── README.md               本文件
└── .gitignore
```

## 本地预览

双击 `index.html` 即可在浏览器打开。不需要启动任何服务器。

## 部署到 GitHub Pages

一次性配置（只需做一次）：

1. 打开仓库设置：<https://github.com/li2918/SOP/settings/pages>
2. **Build and deployment**：
   - Source：选 **Deploy from a branch**
   - Branch：选 `main` / 文件夹选 `/ (root)`
3. 保存

约 1 分钟后网站即可访问：**<https://li2918.github.io/SOP/>**

之后每次 push 到 `main`，页面自动更新，无需任何 Actions。

## 新增一篇 SOP

### 方式 A：在 GitHub 网页直接操作（最简单）

1. 打开 <https://github.com/li2918/SOP/tree/main/pages>
2. 点击右上角 **Add file → Create new file**
3. 文件名写 `my-sop.html`
4. 把 [`pages/example-sop.html`](pages/example-sop.html) 的内容复制过来，改成您要写的流程
5. 滑到底部点 **Commit changes**
6. 打开 [`index.html`](index.html)，点铅笔图标编辑，在对应分类的 `<ul>` 里加一行：
   ```html
   <li data-keywords="搜索关键词1 关键词2">
     <a href="pages/my-sop.html">我的 SOP 标题</a>
     <span class="desc">— 一句话描述</span>
   </li>
   ```
7. Commit

约 1 分钟后即可看到新 SOP。

### 方式 B：本地编辑 + git push

同样的，只不过在本地编辑器里（VS Code、记事本都行）改，然后：

```bash
git add .
git commit -m "新增 SOP：xxx"
git push
```

## 页面模板说明

打开 `pages/example-sop.html` 看完整示例。常用结构块：

| 元素 | 用途 |
| --- | --- |
| `<h1>` | 标题（每页一个） |
| `<div class="meta">` | 版本/日期/负责人 灰底信息块 |
| `<h2>` `<h3>` | 二、三级小标题 |
| `<ol>` / `<ul>` | 有序 / 无序列表 |
| `<table>` | 表格（异常处理、角色分工） |
| `<div class="note tip">` | 蓝色提示 |
| `<div class="note warning">` | 黄色警告 |
| `<div class="note danger">` | 红色高危 |
| `<div class="attachments">` | 附件下载区（灰底） |
| `<img src="../assets/xxx.png">` | 插入图片 |

> 不会写 HTML？把 Word 原文发给维护者，由他们转成 HTML 页面即可。

## 上传附件 / 图片

- Word / PDF / Excel 放到 `files/` 下，文件名用英文 + 短横线（例：`refund-policy-v3.2.docx`）
- 图片放到 `assets/` 下（例：`refund-flow.png`）
- 在 SOP 页面里引用：`<a href="../files/xxx.docx">` 或 `<img src="../assets/xxx.png">`

## 🔒 关于访问密码

**注意：当前是公开站点，任何拿到 URL 的人都能访问。**

给网站加密码有两种方式（不进 CI 的「一次性操作」）：

### 方案 1：把仓库 + 站点都变成私有（推荐）

最直接的做法：

1. 仓库设为 **Private**：`Settings → Danger Zone → Make private`
2. GitHub Pages 私有站点需要 GitHub Pro（$4/月）或 Team 套餐
3. 订阅后，Pages 会自动要求浏览者登录 GitHub 且是仓库协作者才能访问

这是运维最省心的方式 — 管理员只用在 GitHub 加/删协作者，不用轮换密码。

### 方案 2：StatiCrypt 给 HTML 加密（免费）

用 <https://robinmoisson.github.io/staticrypt/> 在线加密工具：

1. 打开上面的网址
2. 选择"Encrypt multiple files"
3. 上传 `index.html` 和 `pages/` 下所有 HTML
4. 设置强密码（≥14 位混合字符）
5. 下载加密后的 HTML，替换仓库里的原文件
6. commit + push 即可

**限制：** 每次修改 SOP 都得重新加密受影响的页面。长期来看比方案 1 麻烦。

> 如果您确定要走方案 2，告诉我，我可以帮您一次性写个本地批处理脚本简化这个步骤。

## 常见问题

**Q：网站打开样式全乱 / 链接 404？**
A：多半是相对路径错了。`index.html` 在根目录引用 `style.css`；`pages/xxx.html` 在子目录引用 `../style.css`（带两个点）。

**Q：搜索框没反应？**
A：检查浏览器是否禁用了 JavaScript。功能需要 JS，但只是 30 行原生 JS，不依赖任何库。

**Q：想加自定义域名（不用 github.io）？**
A：在 `Settings → Pages → Custom domain` 填入域名，并在 DNS 服务商把 CNAME 指向 `li2918.github.io`。然后在仓库根目录建 `CNAME` 文件，里面写域名。

**Q：想要版本历史？**
A：每次 push 都是 git 提交，Git 会自动记录谁在什么时候改了哪些内容。在 GitHub 仓库页面点任意文件 → **History** 即可查看。
