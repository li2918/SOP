# 如何新增 / 修改 SOP

本知识库由所有运营伙伴共同维护。任何人发现流程过时、步骤遗漏，都欢迎更新。

## 适合你的方式

| 你的情况 | 建议方式 |
| --- | --- |
| 熟悉 Git 和 Markdown | 在本地 clone 仓库，修改后提 Pull Request |
| 只会用 Word 编辑 | 把 Word 文件发给知识库维护者，由其转换上线 |
| 只是想纠正错别字 | 直接在 GitHub 网页上点 ✏️ 修改 |

## 目录约定

```
docs/
├── .vitepress/config.mts   ← 导航 / 侧边栏在这里配置
├── index.md                ← 首页
├── public/
│   ├── files/              ← 原始 Word / PDF / Excel 附件存放处
│   │   └── <分类>/
│   └── assets/             ← SOP 中引用的截图、图片
│       └── <分类>/
├── customer-service/       ← 客户服务分类
│   ├── index.md            ← 分类概览
│   └── refund.md           ← 具体 SOP（文件名用英文小写短横线）
├── sales/
├── marketing/
├── product/
├── finance/
├── hr/
└── onboarding/
```

## 新增一条 SOP 的完整步骤

### 第 1 步：创建 Markdown 文件

在对应分类文件夹下新建一个 `.md` 文件，文件名尽量用英文短横线：

- ✅ `refund.md`、`lead-followup.md`、`monthly-closing.md`
- ❌ `退款流程.md`、`lead followup.md`

### 第 2 步：按模板填写内容

复制下面的模板到新文件中，再填入自己的内容：

````markdown
# SOP 标题（与左侧边栏一致）

| 版本 | 生效日期 | 负责部门 | 文档 Owner |
| --- | --- | --- | --- |
| v1.0 | 2026-01-01 | 客户服务部 | 张三 |

## 适用场景

简述本 SOP 在什么情况下启用，什么情况下不适用。

## 角色与分工

- **客服专员**：接单、初步判断
- **客服主管**：审核、升级
- **财务专员**：退款打款

## 操作步骤

1. **客户发起退款** — 通过 400 电话 / 在线工单。
2. **客服专员核对订单**
   - 登录工单系统查看订单状态
   - 判断是否符合退款政策（见附件 1）
3. **客服主管审核**
   - 金额 < 500 元：客服专员自批
   - 金额 ≥ 500 元：主管审批
4. **财务打款**
   - 3 个工作日内通过原支付渠道退回

## 异常处理

| 异常 | 处理方式 | 对接人 |
| --- | --- | --- |
| 超过 30 天 | 走特批流程 | 客服主管 |
| 原支付渠道失效 | 转账至客户提供账户，留存证明 | 财务 |

## 关联附件

- [退款政策 v3.2（Word）](/files/customer-service/refund-policy-v3.2.docx)
- [客户账户信息登记表（Excel）](/files/customer-service/refund-account-form.xlsx)

## 流程图

![退款流程图](/assets/customer-service/refund-flow.png)

## 更新记录

- 2026-01-01 · 张三 · 新建
````

### 第 3 步：把原件 / 图片放进对应目录

| 资源类型 | 存放目录 | 在 SOP 中引用方式 |
| --- | --- | --- |
| Word / PDF / Excel 原件 | `docs/public/files/<分类>/` | `[文件名](/files/<分类>/xxx.docx)` |
| 图片 / 截图 | `docs/public/assets/<分类>/` | `![说明](/assets/<分类>/xxx.png)` |

::: tip 注意
`public/` 目录下的内容会被 VitePress 原样拷贝到网站根路径，所以在 Markdown 里写链接时**不要**包含 `public/` 前缀。
:::

### 第 4 步：把新 SOP 加到侧边栏

打开 [docs/.vitepress/config.mts](/) ，找到对应分类的 `sidebar` 段，加一条记录：

```ts
'/customer-service/': [
  {
    text: '客户服务 SOP',
    items: [
      { text: '概览', link: '/customer-service/' },
      { text: '售后退款流程', link: '/customer-service/refund' }, // ← 新增
    ],
  },
],
```

### 第 5 步：本地预览

```bash
npm install       # 首次才需要
npm run dev
```

浏览器打开控制台提示的地址（通常是 `http://localhost:5173/SOP/`），确认页面显示正常。

### 第 6 步：提交变更

```bash
git checkout -b add-refund-sop
git add .
git commit -m "新增：客户服务 - 售后退款流程 v1.0"
git push origin add-refund-sop
```

然后在 GitHub 上发起 Pull Request，由知识库维护者审核合并。合并后几分钟内 GitHub Actions 会自动发布到线上。

## 修改已有 SOP

1. 在文末「更新记录」表格追加一行，说明改动
2. 如果是重大调整，把版本号从 `v1.0` 升到 `v1.1` / `v2.0`
3. 其余流程同新增

## 不确定归在哪个分类？

- 涉及外部客户 → 客户服务 / 销售 / 市场
- 涉及内部员工 → 人事行政 / 新人培训
- 涉及资金 → 财务
- 涉及产品功能使用 → 产品运营

仍不确定，就放到你最常打交道的分类，后续可以随时移动。
