import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'FBB◦Blog',
    theme: 'dumi-theme-antd-style',
    socialLinks: {
      github: 'https://github.com/LuckyFBB',
    },
    logo: '/blog/logo.png',
    favicon: ['/blog/logo.png'],
    nav: [
      { link: '/react/react-before', title: '🤡 React' },
      { link: '/node/node-before', title: '🍟 Node' },
      { link: '/engineering/engineering-before', title: '🤺 工程化' },
      { link: '/data-structure/data-structure-before', title: '🌳 数据结构' },
      { link: '/more/more-before', title: '🧿 其他' },
    ],
  },
  base: '/blog/',
  publicPath: '/blog/',
});
