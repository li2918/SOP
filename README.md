# 运营 SOP 知识库

基于 [VitePress](https://vitepress.dev/) 搭建的内部标准作业流程（SOP）查询平台，**使用 StatiCrypt 端到端密码加密**。

- 🔐 部署的 HTML 用 AES-256 加密，访客需输入共享密码后方可查看
- 📚 所有 SOP 用 Markdown 维护，版本随 Git 追溯
- 🔍 内置中文全文搜索
- 📎 支持 Word / PDF / Excel / 图片 作为附件下载
- 🚀 推送到 `main` 分支自动部署到 GitHub Pages

## ⚠️ 必读：安全配置清单

本站有两道安全防线，**两道都要做好，缺一不可**：

### 第 1 道：仓库必须设为 Private（保护源 Markdown）

登录 GitHub → 打开 `https://github.com/li2918/SOP/settings` → 滚到底部 `Danger Zone` → `Change visibility` → **Make private**。

> 不做这一步，竞争对手直接到仓库里就能读原始 Markdown 文件——网站加再多密码也没用。

免费版 GitHub 账号在私有仓库上依然能部署 GitHub Pages，但如果没有 GitHub Pro / Team，Pages 会有一些限制。需要确认账号套餐支持 Pages on Private Repos（Pro 起支持，每月约 $4）。如果不能升级，见下文"备选方案"。

### 第 2 道：设置访问密码（保护部署的 HTML）

1. 打开 `https://github.com/li2918/SOP/settings/secrets/actions`
2. 点击 **New repository secret**
3. 名称：`STATICRYPT_PASSWORD`
4. 值：**至少 14 位**的强密码（建议 字母+数字+符号 混合，例如 `Op2026!SOP-Internal-Access`）
5. 保存

> 每次改密码只需回到这里更新 secret 的值，然后重新跑一次 Actions 工作流即可。

### 密码轮换建议

- 每季度轮换一次
- 有员工离职后立即轮换
- 全员通过企微/钉钉群公告新密码

## 本地开发

### 前置要求

- [Node.js](https://nodejs.org/) >= 18

### 启动开发服务器（不加密）

```bash
npm install
npm run dev
```

打开浏览器访问 <http://localhost:5173/SOP/> 即可。开发时无需密码，方便编辑。

### 本地预览加密后的效果

```bash
# Windows PowerShell
$env:STATICRYPT_PASSWORD="test-password"; npm run build:secure; npm run preview

# macOS / Linux
STATICRYPT_PASSWORD=test-password npm run build:secure && npm run preview
```

访问 <http://localhost:4173/SOP/> 会出现密码输入页，输入上面设置的密码即可进入。

## 部署到 GitHub Pages

### 一次性配置

1. ✅ 已推送仓库到 `https://github.com/li2918/SOP.git`
2. **把仓库设为 Private**（上文「第 1 道」）
3. **添加 `STATICRYPT_PASSWORD` Secret**（上文「第 2 道」）
4. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**
5. 根据实际仓库名检查 [docs/.vitepress/config.mts](docs/.vitepress/config.mts) 中的 `base` 字段：
   - 若仓库叫 `SOP`，保持 `base: '/SOP/'`
   - 若是用户/组织主页（`<user>.github.io`），改为 `base: '/'`
   - 若使用自定义域名，改为 `base: '/'` 并在 `docs/public/` 下新建 `CNAME` 文件写入域名

完成 1–5 后，访问 **<https://li2918.github.io/SOP/>** 会出现密码输入页。

### 日常发布

每次向 `main` 分支 push，GitHub Actions 会自动：

1. 安装依赖
2. 检查 `STATICRYPT_PASSWORD` secret 是否配置
3. 运行 `vitepress build`
4. 用 StatiCrypt 对所有 HTML 做 AES-256 加密
5. 把加密后的静态文件发布到 GitHub Pages

约 1–2 分钟后生效。工作流日志在 `https://github.com/li2918/SOP/actions` 查看。

## 目录结构

```
SOP/
├── .github/workflows/deploy.yml     GitHub Actions 自动部署 + 加密
├── scripts/encrypt.mjs              StatiCrypt 加密脚本（跨平台）
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

## 如何新增或修改 SOP

详见站内文档：[使用指南 · 新增或修改 SOP](docs/guide/contributing.md)。

## 常见问题

**Q：忘记密码怎么办？**
A：在 GitHub Settings → Secrets 把 `STATICRYPT_PASSWORD` 改成新值，然后在 Actions 页手动触发一次 `Deploy VitePress site to GitHub Pages` 工作流即可。

**Q：老用户勾了"30 天免登录"，轮换密码后他们还能继续看吗？**
A：不能。新部署后旧的加密 payload 就失效了，所有人都需要输入新密码。这正是我们期望的"离职即失效"机制。

**Q：StatiCrypt 的安全性够吗？**
A：对"防竞争对手"这个威胁模型足够，前提是密码足够强（14 位以上混合字符）且仓库 Private。技术细节：
- HTML 内容用 AES-256-CBC + PBKDF2 (600k 次迭代) 加密
- 密码从未传到服务器，全部在浏览器端解密
- 要暴力破解需要离线算 PBKDF2，14 位强密码按 2026 年算力需要数千年

**Q：VitePress 的 JS bundle 里有没有内容泄漏？**
A：StatiCrypt 只加密 HTML。VitePress 的 JS 包里包含页面内容用于客户端路由，理论上直接访问 `/SOP/assets/xxx.js` 能拿到部分文本。**所以仓库必须 Private**——Pages 部署的资源不可直接列目录，攻击者得先猜到具体文件名才行，而文件名带有 hash，不是确定性的。加上仓库 Private 这两层，实际攻击难度非常高。

**Q：上线后 CSS / JS 404？**
A：大概率是 `base` 字段与 GitHub Pages 的 URL 前缀不匹配。调整 [docs/.vitepress/config.mts](docs/.vitepress/config.mts) 的 `base` 即可。

**Q：不想升级 GitHub 套餐，有没有备选方案？**
A：有。把仓库保持 Private（免费版支持私有仓库）+ 改为部署到 Vercel / Netlify / Cloudflare Pages，它们都支持把私有仓库部署成公开访问的站点，并且仍可通过 GitHub Actions 触发。如果确定需要，可以追加实现。
