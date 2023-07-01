import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'FBB◦Blog',
    footer: `Copyright © 2022-${new Date().getFullYear()} Made with 🤸‍♂️ by FBB`,
    socialLinks: {
      github: 'https://github.com/LuckyFBB',
    },
    logo: '/blog/logo.png',
    nav: [
      { link: '/react', title: '🤡 React' },
      { link: '/node', title: '🍟 Node' },
      { link: '/engineering', title: '🤺 工程化' },
      { link: '/data-structure', title: '🌳 数据结构' },
      { link: '/more', title: '🧿 其他' },
    ],
  },
  base: '/blog/',
  publicPath: '/blog/',
  copy: ['public'],
});
