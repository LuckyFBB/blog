---
title: 代码检查
group:
  title: 项目规范
  order: 5
order: 0
---

在团队越来越庞大之后，每一个成员的代码风格也是不一样的，为了能够让仓库的代码风格统一，往往需要一些工具来帮我们完成这个事情，目前用的比较多的工程化方法就是`husky+lint-staged`

## git hooks

`git hooks` 主要能够在某些特定行为发生时触发某些自定义程序。

### 常见的 git hooks

**客户端**

- `pre-commit` hook 在运行 `git commit` 命令时且在 `commit` 完成前被触发
- `commit-msg` hook 在编辑完 `commit-msg` 时被触发，并且接受一个参数，这个参数是存放当前 `commit-msg` 的临时文件的路径
- `pre-push` hook 在运行 `git push` 命令时且在 `push` 命令完成前被触发

**服务端 hook**

- `pre-receive` 在服务端接受到推送时且在推送过程完成前被触发
- `post-receive` 在服务端接收到推送且推送完成后被触发

更多的 `git hooks` 可查阅 [git 官方文档](https://git-scm.com/docs/githooks)

### 设计缺陷

但是由于原生的 `git hooks` 都是存放在 `.git/hooks` 文件中，由于 `.git` 文件夹是隐藏文件夹，不会被 `Git` 所追踪，那么就需要每一位团队成员分别维护一份，还要考虑同步问题，的确有些困难，所以有了新的解决方案——`husky`

## husky

### 什么是 husky

[husky](https://github.com/typicode/husky) 是常见的 `git hook` 工具，能够解决原生 `git hook` 无法版本追踪的问题。

使用 `husky` 可以挂载 `Git` 钩子，当我们本地进行 `git commit` 或 `git push` 等操作前，能够执行其它一些操作，比如进行 `ESLint` 检查，如果不通过，就不允许 `commit` 或 `push`

### 使用

1. 在项目中安装 husky

   ```bash
   pnpm install husky -D
   ```

2. 启用 Git 挂钩

   `husky install` 命令告诉 `Git` 改为使用 `.husky` 目录

   ```bash
   // v8
   pnpm husky install
   npm set-script prepare "husky install"

   // v9，将上述两条命令合并为一条
   npx husky init
   ```

   要在安装后自动启用 `Git` 挂钩，编辑 `package.json` ，确保 `husky` 可以正常使用

   此时的 package.json 会增加一行 script

   ```json
   {
     "scripts": {
   	  // ...
   	  // v8
       "prepare": "husky install"
       // v9
       "prepare": "husky"
     },
   }
   ```

   [v9.0.1 changelog](https://github.com/typicode/husky/releases/tag/v9.0.1)

### husky install 干了什么?

1. 检查项目的根目录中是否存在 `.git` 目录，以确保你正在运行该命令的是一个 Git 仓库。
2. 检查项目的根目录中是否存在 `.husky` 目录，该目录用于存储 Husky 的配置和钩子脚本。如果 `.husky` 目录不存在，它会自动创建该目录。
3. 将 Husky 的 Git 钩子脚本复制到 `.husky` 目录中。这些脚本包括 `pre-commit`、`pre-push` 等钩子，它们在相应的 Git 操作之前执行。

   并且会更改 `.git/config` 文件中的 `core.hooksPath` 内容，更改为对应的 `.husky/_`，那么执行对应 `git hook` 的时候就会找到对应 `hooksPath` 的内容

### husky add 干了什么?

```bash
// v8
npx husky add  .husky/pre-commit "npm test"

// v9
echo "npm test" > .husky/pre-commit
```

执行完毕之后在 `.husky` 文件夹会多一个 pre-commit 的文件脚本，当执行 `git commit -m "xxx"` 就会触发对应的命令

### husky 是如何解决原生的 git hooks 的问题的

- 原生 `git hooks` 主要的问题是 git 无法跟踪 `.git/hooks` 下的文件，这个问题已经通过 `git core.hooksPath` 解决了
- 开发者需要手动设置 `git core.hooksPath`，`husky init` 命令中帮助我们设置了 `git core.hooksPath`，然后在 `package.json` 的 `scripts` 中添加 `"prepare": "husky"`，这样每次安装依赖的时候就会执行 `husky`，因此就可以保证设置的 `git hooks` 可以被触发了

## Lint-staged

### 什么是 Lint-staged?

在 `pre-commit` hook 中均为对当前 `commit` 的文件进行校验、格式化等，而不是对全局的文件进行校验，因此在脚本中我们需要知道当前在 `Git` 暂存区的文件有哪些，而 `Git` 本身也没有向 `pre-commit` 脚本传递相关参数，[Lint-staged](https://github.com/okonet/lint-staged) 这个包为我们解决了这个问题。

简单说就是当我们触发 `pre-commit` hook 中的脚本命令后，配合 `Lint-staged` 的配置可以只检查暂存区的文件从而避免我们每次检查都把整个项目的代码都检查一遍的尴尬情况。其次，`Lint-staged` 允许指定不同类型后缀文件执行不同指令的操作，并且可以按步骤再额外执行一些其它 `shell` 指令。

**Lint-staged 是如何知道当前暂存区有哪些文件的？**

Lint-staged 内部也没有什么高级操作，它在内部运行了 `git diff --staged --diff-filter=ACMR --name-only -z` 命令，这个命令会返回暂存区的文件信息，类似如下所示的代码

```js
const { execSync } = require('child_process');
const lines = execSync(
  'git diff --staged --diff-filter=ACMR --name-only -z',
).toString();

const stagedFiles = lines.replace(/\u0000$/, '').split('\u0000');
```

### 使用

1. 安装 `lint-staged`

   ```bash
   pnpm install lint-staged
   ```

2. 配置 `lint-staged`

   `lint-staged` 只是做文件过滤的，不会做任何的格式化操作，均需要搭配对应的 `eslint/prettier/stylelint` 等等。

   可以将 `lint-staged` 的配置写在 `package.json` 中或者 `.lintstagedrc.js` 中

   ```js
   // .lintstagedrc.js
   module.exports = {
     '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
   };
   ```

3. 添加命令
   ```js
   echo "pnpm exec lint-staged" > .husky/pre-commit
   ```

当上诉步骤都配置好了之后，执行 `git commit -m ""` ，就会执行对应的 `lint-staged` 校验

![Untitled](/blog/imgs/code-inspection/Untitled.png)

### 工作流程

![Untitled](/blog/imgs/code-inspection/Untitled%201.png)

## 总结

本文主要讲解了 husky 出现的原因解决了什么问题，以及如何使用 lint-staged 对我们的代码进行校验
