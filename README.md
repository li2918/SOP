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

## 🔒 访问密码

本站所有页面均已用 **StatiCrypt** 做 AES-256 端到端加密。访问时浏览器会先弹出密码框，输入正确密码才能看到内容。

- **密码发放：** 内部钉钉/企微群公告（不要写在任何公开位置）
- **30 天免登录：** 登录时勾选，之后 30 天内自动放行
- **密码轮换：** 有员工离职 / 每季度，请联系维护者重新加密所有 HTML（见下）

### 新增或修改 SOP 后的重加密流程

每次修改或新增 HTML 页面后，**必须**重新加密后再 push，否则明文会直接暴露。两种做法：

**方式 A：网页工具（无需安装）**
1. 打开 <https://robinmoisson.github.io/staticrypt/>
2. 选 "Encrypt multiple files" 上传要加密的 `.html`
3. 输入密码，勾选 "Remember me" 设 30 天
4. 下载加密文件，替换仓库里的版本

**方式 B：命令行（需本地装过 Node.js）**
```bash
npm install -g staticrypt    # 一次性安装
staticrypt path/to/page.html -p '你的密码' -d $(dirname path/to/page.html) \
  --short --remember 30 --config false \
  --template-title "运营 SOP 知识库" \
  --template-instructions "本站为公司内部文档，请输入访问密码" \
  --template-button "进入" --template-placeholder "请输入密码" \
  --template-error "密码错误，请重试" --template-remember "30 天内免登录"
```

### `files/` 和 `assets/` 不受密码保护

⚠️ StatiCrypt 只加密 HTML。放在 `files/` 的 Word/PDF/Excel、`assets/` 的图片只要 URL 暴露就能被直接下载。

**处理建议：**
- 敏感原件放企业网盘（飞书、钉钉、OneDrive 等），SOP 页面里只放外链
- 普通示意图、流程图可以直接放 `assets/`，风险较低

## 常见问题

**Q：网站打开样式全乱 / 链接 404？**
A：多半是相对路径错了。`index.html` 在根目录引用 `style.css`；`pages/xxx.html` 在子目录引用 `../style.css`（带两个点）。

**Q：搜索框没反应？**
A：检查浏览器是否禁用了 JavaScript。功能需要 JS，但只是 30 行原生 JS，不依赖任何库。

**Q：想加自定义域名（不用 github.io）？**
A：在 `Settings → Pages → Custom domain` 填入域名，并在 DNS 服务商把 CNAME 指向 `li2918.github.io`。然后在仓库根目录建 `CNAME` 文件，里面写域名。

**Q：想要版本历史？**
A：每次 push 都是 git 提交，Git 会自动记录谁在什么时候改了哪些内容。在 GitHub 仓库页面点任意文件 → **History** 即可查看。
