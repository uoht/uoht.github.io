import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
// git add . ; git commit -m "更新名字和关于本站、侧边栏自动收起" ; git push origin source ; $env:GIT_USER="uoht"; yarn deploy
// yarn start
// npm run docusaurus build
// npm run docusaurus serve

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'uoht',
  tagline: 'Ciallo～(∠・ω< )⌒☆',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://uoht.moe',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'uoht', // Usually your GitHub org/user name.
  projectName: 'uoht.github.io', // Usually your repo name.
  deploymentBranch: 'main', // 添加这一行，指定部署分支
  trailingSlash: false, // 添加这一行，解决 URL 斜杠警告

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/uoht/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        // {
        //   showReadingTime: false,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   // editUrl:
        //   //   'https://github.com/uoht/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: './src/css/custom.scss',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
  //   [
  //   '@docusaurus/plugin-client-redirects',
  //   {
  //     redirects: [
  //       // /docs/oldDoc -> /docs/newDoc
  //       {
  //         to: '/docs/doc',
  //         from: '/',
  //       },
  //       // Redirect from multiple old paths to the new path
  //       // {
  //       //   to: '/docs/newDoc2',
  //       //   from: ['/docs/oldDocFrom2019', '/docs/legacyDocFrom2016'],
  //       // },
  //     ],
  //   },
  // ],
    'docusaurus-plugin-sass'],
  themes: [
    // ... 你的其他主题
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: "/",
        language: ["ja"],
        //ignoreFiles: ["manga"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    //image: 'img/docusaurus-social-card.jpg',
    docs: {
      sidebar: {
        // hideable: true,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'uoht',
      logo: {
        alt: 'uoht Logo',
        src: 'img/logo.jpg',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: '资源',
        // },
        { to: 'software', label: '软件', position: 'left' },
        { to: 'browser', label: '浏览器', position: 'left' },
        { to: 'other', label: '工具', position: 'left' },
        { to: 'anime', label: '动画', position: 'left' },
        { to: 'book', label: '书籍', position: 'left' },
        { to: 'music', label: '音乐', position: 'left' },
        { to: 'game', label: '游戏', position: 'left' },
        { to: 'ero', label: '涩涩', position: 'left' },
        //{ to: 'docs/general', label: '综合', position: 'left' },
        { to: 'loli', label: '萝莉', position: 'left' },
        {
          href: 'https://github.com/uoht/uoht.github.io',
          label: 'GitHub',
          position: 'right',
        },
        //{ to: 'docs/ero/ero', label: '', position: 'left' },


      ],
    },
    // footer: {
    //   style: 'dark',
    //   // links: [
    //   //   {
    //   //     title: 'Docs',
    //   //     items: [
    //   //       {
    //   //         label: 'Tutorial',
    //   //         to: '/docs/intro',
    //   //       },
    //   //     ],
    //   //   },
    //   //   {
    //   //     title: 'Community',
    //   //     items: [
    //   //       {
    //   //         label: 'Stack Overflow',
    //   //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //   //       },
    //   //       {
    //   //         label: 'Discord',
    //   //         href: 'https://discordapp.com/invite/docusaurus',
    //   //       },
    //   //       {
    //   //         label: 'X',
    //   //         href: 'https://x.com/docusaurus',
    //   //       },
    //   //     ],
    //   //   },
    //   //   {
    //   //     title: 'More',
    //   //     items: [
    //   //       {
    //   //         label: 'Blog',
    //   //         to: '/blog',
    //   //       },
    //   //       {
    //   //         label: 'GitHub',
    //   //         href: 'https://github.com/uoht/docusaurus',
    //   //       },
    //   //     ],
    //   //   },
    //   // ],
    //   copyright: `Copyright © ${new Date().getFullYear()} <a href="https://uoht.github.io">uoht.github.io</a>, All Rights Reserved`,
    // },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
