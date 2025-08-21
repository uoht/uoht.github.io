import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
// git add . ; git commit -m "添加萝莉画师" ; git push origin source
// $env:GIT_USER="uoht"; yarn deploy
// yarn start

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'uoht的小站',
  tagline: 'Ciallo～(∠・ω< )⌒☆',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://uoht.github.io',
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
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/uoht/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/uoht/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    // ... 你的其他主题
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // `hashed` 推荐用于索引文件的长期缓存
        hashed: true,

        // 如果文档使用中文，建议设置：
        language: ["en", "zh"],

        // 自定义搜索栏快捷键（默认是 "mod+k"）：
        // searchBarShortcutKeymap: "s", // 使用 'S' 键
        // searchBarShortcutKeymap: "ctrl+shift+f", // 使用 Ctrl+Shift+F

        // 如果你使用了 `noIndex: true`，设置 `forceIgnoreNoIndex` 来启用本地索引：
        // forceIgnoreNoIndex: true,
      }),
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    //image: 'img/docusaurus-social-card.jpg',
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
        { to: 'docs/doc/software', label: '软件', position: 'left' },
        { to: 'docs/doc/browser', label: '浏览器', position: 'left' },
        { to: 'docs/doc/anime', label: '动画', position: 'left' },
        { to: 'docs/doc/book', label: '书籍', position: 'left' },
        { to: 'docs/doc/music', label: '音乐', position: 'left' },
        { to: 'docs/doc/game', label: '游戏', position: 'left' },
        //{ to: 'docs/general', label: '综合', position: 'left' },
        { to: 'docs/doc/other', label: '其他', position: 'left' },
        {
          href: 'https://github.com/uoht/uoht.github.io',
          label: 'GitHub',
          position: 'right',
        },
        { to: 'docs/ero/ero', label: '', position: 'left' },
        { to: 'docs/loli/intro', label: '', position: 'left' },

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
