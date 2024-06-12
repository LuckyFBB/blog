---
title: 基于 pnpm 的 monorepo 的工作流
group:
  title: 包管理
  order: 4
order: 1
---

## 什么是 Monorepo?

Monorepo 是一种项目管理方式，单个仓库管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。

目前很多大型项目都采用了该方式，Babel/Jest/Vue 等等，均是在 packages 下面分别管理不同的项目，类似如下的结构

```
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json
```

Monorepo 的好处

- 统一管理
- 依赖提升

[从 Multirepo 到 Monorepo 研发效率提升探索之路](https://juejin.cn/post/7316927971096379446)

## 什么是 pnpm?

[npm/Yarn/pnpm 包管理](/engineering/pnpm-package-management-that--i-know)

## **工程初始化**

### 基础概念

- **workspace context**
  工作空间所在的文件目录的一个个子目录就是工作空间的上下文，整个目录树构成了工作空间实体
- **workspace**
  工作空间是一个本地代码包，由同一项目的源代码组成。
- **workspace-root**
  一个项目包含一个或多个工作树，这些工作树本身可以包含任意数量的工作空间。任何项目都至少包含一个工作空间(根工作空间)

### 快速开始

使用 pnpm init 初始化项目，在项目中创建 pnpm-workspace.yaml 文件设置 workspace

```bash
packages:
  - 'packages/**'
```

表明 packages 下的每一个文件夹都当做一个 package，添加到 monorepo 中进行管理

```bash
├── packages
|   ├── components
|   ├── utils
```

分别创建 components/utils 这三个子项目

**全局依赖**

对于一些所有的 workspace 都需要用到的依赖，可以在根目录下面安装一次，相对于之前多仓库的管理安装三次，依赖提升安装次数减少

```bash
pnpm install typescript -D -W
```

-W 表示把依赖安装到 workspace-root，虽然没有在 packages 下面安装相关的依赖，但是按着 node_modules 的查找路径，会一直往上级查找依赖，自然能够找到 workspace-root 中的依赖

**局部依赖**

对于部分只存在于 packages 中依赖，可以采用 pnpm 提供的 --filter 来完成；当然也可以采用`cd packages/xxx；pnpm install xxx`

在 components 中我们需要安装 echarts 依赖，就需要使用到 --filter 来为其安装

```bash
pnpm install echarts --filter @sx/components
```

对于 monorepo 的一些 workspace 来说，很多都是以 @命名空间/包名，例如@babel/cli、@vue/server-renderer 等等

对应的 components 包中就能够看到如下依赖

```json
"dependencies": {
  "echart": "^0.1.3"
}
```

**link 依赖**

在 monorepo 中，如果两个 workspace 需要相互依赖引用，例如在 components 中引用 utils 作为依赖，和上述安装依赖的方式一致

```bash
 pnpm install @sx/utils --filter @sx/components
```

能够将 utils 安装成 components 的依赖

```bash
"dependencies": {
  "@sx/utils": "workspace:^1.0.0",
  "echart": "^0.1.3"
}
```

其中 workspace:^1.0.0 就是通过软连接关联上了 utils 文件夹

但是最后发包的时候，是不可能带有 workspace 这种本地字样的，如何处理？

实际上，当执行了`pnpm publish`后，会把基于的 workspace 的依赖变成外部依赖，如：

```bash
// before
"dependencies": {
		"@sx/utils": "workspace:^1.0.0",
}
// after
"dependencies": {
		"@sx/utils": "^1.0.0"
}
```

解决了开发环境和生产环境对依赖的问题。

## 总结

monorepo 是当下火热的项目管理方式，通过 pnpm 的 workspace 能够实现子项目相互依赖且不需要频繁发包。
