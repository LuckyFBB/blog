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
  },
  base: '/blog/',
  publicPath: '/blog/',
});
