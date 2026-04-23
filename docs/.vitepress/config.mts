import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 站点信息
  title: '运营 SOP 知识库',
  description: '公司运营标准作业流程（SOP）统一查询平台',
  lang: 'zh-CN',

  // 部署到 GitHub Pages 子路径时请修改此项为 '/<仓库名>/'
  // 如果使用自定义域名或 user/organization page，保持 '/'
  base: '/SOP/',

  // 最后更新时间
  lastUpdated: true,
  cleanUrls: true,

  // 忽略死链接检查（避免占位页阻塞构建）
  ignoreDeadLinks: true,

  // 网站 favicon（替换 docs/public/favicon.ico 即可）
  head: [
    ['link', { rel: 'icon', href: '/SOP/favicon.ico' }],
  ],

  themeConfig: {
    // 网站 Logo（可选，放入 docs/public/logo.svg 后启用）
    // logo: '/logo.svg',

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '使用指南', link: '/guide/' },
      {
        text: 'SOP 分类',
        items: [
          { text: '客户服务', link: '/customer-service/' },
          { text: '销售流程', link: '/sales/' },
          { text: '市场营销', link: '/marketing/' },
          { text: '产品运营', link: '/product/' },
          { text: '财务流程', link: '/finance/' },
          { text: '人事行政', link: '/hr/' },
          { text: '新人培训', link: '/onboarding/' },
        ],
      },
    ],

    // 侧边栏（按路径匹配）
    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '总览', link: '/guide/' },
            { text: '如何查询 SOP', link: '/guide/search' },
            { text: '如何新增 / 修改 SOP', link: '/guide/contributing' },
            { text: 'Markdown 快速上手', link: '/guide/markdown' },
          ],
        },
      ],
      '/customer-service/': [
        {
          text: '客户服务 SOP',
          items: [
            { text: '概览', link: '/customer-service/' },
            // 示例： { text: '售后退款流程', link: '/customer-service/refund' },
          ],
        },
      ],
      '/sales/': [
        {
          text: '销售流程 SOP',
          items: [
            { text: '概览', link: '/sales/' },
          ],
        },
      ],
      '/marketing/': [
        {
          text: '市场营销 SOP',
          items: [
            { text: '概览', link: '/marketing/' },
          ],
        },
      ],
      '/product/': [
        {
          text: '产品运营 SOP',
          items: [
            { text: '概览', link: '/product/' },
          ],
        },
      ],
      '/finance/': [
        {
          text: '财务流程 SOP',
          items: [
            { text: '概览', link: '/finance/' },
          ],
        },
      ],
      '/hr/': [
        {
          text: '人事行政 SOP',
          items: [
            { text: '概览', link: '/hr/' },
          ],
        },
      ],
      '/onboarding/': [
        {
          text: '新人培训',
          items: [
            { text: '概览', link: '/onboarding/' },
          ],
        },
      ],
    },

    // 内置本地全文搜索（支持中文）
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索 SOP',
                buttonAriaLabel: '搜索 SOP',
              },
              modal: {
                noResultsText: '未找到相关 SOP',
                resetButtonTitle: '清除搜索',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    // 文档底部导航（上一页/下一页文本）
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // 大纲
    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    // 最后更新显示
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    // 页脚
    footer: {
      message: '内部知识库，仅供公司内部使用',
      copyright: `© ${new Date().getFullYear()} 运营 SOP 知识库`,
    },

    // 返回顶部等文案
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // 顶栏右侧链接（可选：指向内部 Git 仓库）
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/your-org/SOP' },
    // ],
  },
})
