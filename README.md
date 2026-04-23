# 运营 SOP 知识库

基于 [VitePress](https://vitepress.dev/) 搭建的内部标准作业流程（SOP）查询平台。

- 📚 所有 SOP 用 Markdown 维护，版本随 Git 追溯
- 🔍 内置中文全文搜索
- 📎 支持 Word / PDF / Excel / 图片 作为附件下载
- 🚀 推送到 `main` 分支自动部署到 GitHub Pages

## 目录结构

```
SOP/
├── .github/workflows/deploy.yml     GitHub Actions 自动部署
├── docs/
│   ├── .vitepress/config.mts        站点配置（导航、侧边栏、搜索）
│   ├── index.md                     首页
│   ├── guide/                       使用指南
│   ├── customer-service/            客户服务 SOP
│   ├── sales/                       销售流程 SOP
│   ├── marketing/                   市场营销 SOP
│   ├── product/                     产品运营 SOP
│   ├── finance/                     财务流程 SOP
│   ├── hr/                          人事行政 SOP
│   ├── onboarding/                  新人培训
│   └── public/
│       ├── files/                   原始 Word/PDF/Excel 附件
│       └── assets/                  图片 / 截图
├── package.json
└── .gitignore
```

## 本地开发

### 前置要求

- [Node.js](https://nodejs.org/) >= 18

### 启动开发服务器

```bash
npm install
npm run dev
```

打开浏览器访问 <http://localhost:5173/SOP/> 即可。文件保存后页面会自动刷新。

### 构建与预览

```bash
npm run build     # 构建生成静态文件到 docs/.vitepress/dist
npm run preview   # 本地预览构建产物
```

## 部署到 GitHub Pages

### 一次性配置

1. 把本仓库推送到 GitHub：
   ```bash
   git remote add origin https://github.com/<你的组织>/SOP.git
   git push -u origin main
   ```
2. 在 GitHub 仓库页面：**Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 根据实际仓库名检查 [docs/.vitepress/config.mts](docs/.vitepress/config.mts) 中的 `base` 字段：
   - 若仓库叫 `SOP`，保持 `base: '/SOP/'`
   - 若是用户/组织主页（`<user>.github.io`），改为 `base: '/'`
   - 若使用自定义域名，改为 `base: '/'` 并在 `docs/public/` 下新建 `CNAME` 文件写入域名

### 日常发布

每次向 `main` 分支 push，GitHub Actions 会自动：

1. 安装依赖
2. 运行 `vitepress build`
3. 把 `docs/.vitepress/dist/` 发布到 GitHub Pages

约 1–2 分钟后生效。

## 如何新增或修改 SOP

详见站内文档：[使用指南 · 新增或修改 SOP](docs/guide/contributing.md)。

## 常见问题

**Q：上线后 CSS / JS 404？**
A：大概率是 `base` 字段与 GitHub Pages 的 URL 前缀不匹配。调整 [docs/.vitepress/config.mts](docs/.vitepress/config.mts) 的 `base` 即可。

**Q：搜索结果里中文被切成一个字一个字？**
A：VitePress 内置的本地搜索对中文支持已足够日常使用。若对搜索精度要求更高，可接入 [Algolia DocSearch](https://docsearch.algolia.com/) 免费方案。

**Q：需要权限控制（只对公司内部员工开放）？**
A：GitHub Pages 免费版不支持私有访问。可选方案：
- 升级 GitHub Enterprise，使用 Private Pages
- 改为部署到公司内网服务器（Nginx / Caddy 即可）
- 加一层 Cloudflare Access 做鉴权
