import type { CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export const categories = [
  {
    dir: 'Ai',
    slug: 'ai',
    title: 'AI',
    description: 'AI 工具、Agent 工作流和新鲜技术探索。',
  },
  {
    dir: 'React',
    slug: 'react',
    title: 'React',
    description: 'Hooks、状态管理、路由、渲染机制与 React 生态实践。',
  },
  {
    dir: 'Node',
    slug: 'node',
    title: 'Node',
    description: 'Node 运行时、Buffer、进程通信与服务端基础能力。',
  },
  {
    dir: 'Engineering',
    slug: 'engineering',
    title: '工程化',
    description: 'Babel、Webpack、SWC、npm 与项目效率工具链。',
  },
  {
    dir: 'Base',
    slug: 'base',
    title: '前端基础',
    description: 'JS / TS、浏览器、语言机制与日常开发基础。',
  },
  {
    dir: 'DataStructure',
    slug: 'data-structure',
    title: '数据结构',
    description: '常见数据结构、算法思路和刷题复盘。',
  },
  {
    dir: 'More',
    slug: 'more',
    title: '其他',
    description: '阅读笔记、系统知识和一些暂时没归类的内容。',
  },
] as const;

export type Category = (typeof categories)[number];

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
const categoryOrder = new Map(categories.map((category, index) => [category.slug, index]));

export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function slugifySegment(segment: string) {
  if (/^[A-Z0-9]+$/.test(segment)) {
    return segment.toLowerCase();
  }

  return segment
    .replace(/NodeJS/g, 'NodeJs')
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .toLowerCase();
}

export function getEntryParts(entry: PostEntry) {
  return entry.id.split('/');
}

export function isRootIndex(entry: PostEntry) {
  return entry.id.toLowerCase() === 'index';
}

export function isCategoryIndex(entry: PostEntry) {
  const parts = getEntryParts(entry);
  return parts.length === 2 && parts[1].toLowerCase() === 'index';
}

export function isArticle(entry: PostEntry) {
  const parts = getEntryParts(entry);
  return parts.length === 2 && !isCategoryIndex(entry);
}

export function getCategoryBySlug(slug: string) {
  return categoryBySlug.get(slug);
}

export function getCategoryForEntry(entry: PostEntry) {
  const [dir] = getEntryParts(entry);
  return categoryBySlug.get(slugifySegment(dir));
}

export function getArticleSlug(entry: PostEntry) {
  const parts = getEntryParts(entry);
  return slugifySegment(parts[parts.length - 1]);
}

export function getPostPath(entry: PostEntry) {
  const category = getCategoryForEntry(entry);
  if (!category) return '/';
  return `/${category.slug}/${getArticleSlug(entry)}/`;
}

export function getPostUrl(entry: PostEntry) {
  return withBase(getPostPath(entry));
}

export function getCategoryUrl(category: Category) {
  return withBase(`/${category.slug}/`);
}

export function sortPosts(posts: PostEntry[]) {
  return [...posts].sort((a, b) => {
    const categoryA = getCategoryForEntry(a);
    const categoryB = getCategoryForEntry(b);
    const categoryDiff =
      (categoryOrder.get(categoryA?.slug ?? '') ?? 99) -
      (categoryOrder.get(categoryB?.slug ?? '') ?? 99);

    if (categoryDiff !== 0) return categoryDiff;

    const orderDiff = (a.data.order ?? 999) - (b.data.order ?? 999);
    if (orderDiff !== 0) return orderDiff;

    return a.data.title.localeCompare(b.data.title, 'zh-CN');
  });
}

export function getArticlesByCategory(posts: PostEntry[], category: Category) {
  return sortPosts(posts.filter((post) => getCategoryForEntry(post)?.slug === category.slug));
}
