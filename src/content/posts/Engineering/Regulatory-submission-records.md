---
title: 规范提交记录
group:
  title: 项目规范
  order: 5
order: 1
---

## 前言

在[前一篇文章](/blog/engineering/code-inspection)中，主要讲解了利用 `git hooks` 做一些 `pre-commit` 代码检查的工作，主要是为了提交到仓库的代码保持统一的风格，因此采用 `git-hooks` 来做检查。

在我们提交 `commit` 信息的时候，我们还需要写 commit msg，对于 msg 来说，我们也想保持一种格式，规定好每一个变更的格式与内容。

那么就需要引入 `commitlint/commitizen` 等工具来完善该功能。

## 概念

### commitlint

执行 `git commit -m ”xxxx”` 的时候，用来检查 xxx 是否符合固定格式的

### commitizen

基于 Node.js 的 `git commit` 命令行工具，辅助生成标准的 `commit message`，具体的操作会交给适配器做

### adapter

`commitizen` 命令行工具的交互方式插件。例如 `cz-emoji`、`cz-emoji-chinese`、`cz-conventional-changelog` 等等

## 使用

### 安装 commitizen

全局安装 commitizen，这样子就能够全局使用 `cz/git-cz/git cz` 等命令了

```bash
pnpm install -g commitizen
```

### 安装 cz-git

安装 `commitizen` 对应的适配器，目前我们选择 `cz-git`

```bash
pnpm install -D cz-git
```

在 `packsge.json` 中添加对于 `commitizen` 的配置

```bash
{
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

当我们再次运行 `git-cz` 的时候，就会出现

![Untitled](/blog/imgs/regulatory-submission-records/Untitled.png)

### 安装 commitlint

```bash
pnpm install -D @commitlint/config-conventional @commitlint/cli
```

`@commitlint/cli`  是 `commitlint` 提供的命令行工具

`@commitlint/config-conventional` 是社区中一些共享的配置，是根据 Angular 提交规范预定义的规则包

定义 `commitlint.config.js` 配置 `lint` 规则，[cz-git 配置](https://cz-git.qbb.sh/zh/config/)，选择 emoji 模版后运行 `git-cz`

![Untitled](/blog/imgs/regulatory-submission-records/Untitled%201.png)

能够看到我们的提交信息都是有一定格式的

![Untitled](/blog/imgs/regulatory-submission-records/Untitled%202.png)

## standard-version

在我们需要发版本时，往往需要生成对应的 CHANGELOG.md，如果还是一条一条的写，未必也有点太蠢了。当 commit 信息规范之后，有对应的工具来帮我们完成这个事情。

上述用到的 `conventional-changelog` 其实一个完整的[生态](https://github.com/conventional-changelog)，能够 `lint message/generate changelogs/automate versioning`

### **安装**

```bash
pnpm add standard-version -D
```

添加脚本，执行 `pnpm release` 之后能够自动生成 changeLog 和 package version

```bash
{
  "scripts": {
    "release": "standard-version"
  }
}
```

![Untitled](/blog/imgs/regulatory-submission-records/Untitled%203.png)

### 原理

1. 解析 Git 提交历史，查找符合标准格式的提交信息。`Standard-version` 期望的提交信息格式是符合 `Conventional Commits` 规范的。

2. 根据提交信息的类型(feat、fix、docs 等)和关键字(BREAKING CHANGE、MAJOR、MINOR 等)，确定新版本号的增量。例如，如果提交信息中包含 `BREAKING CHANGE` Standard-version 将增加主版本号(Major)；如果提交信息中包含  `feat`  类型的提交，Standard-version 将增加次版本号(Minor)；如果包含  `fix`  类型的提交，将增加修订版本号(Patch)。

3. 更新项目的  `package.json`  文件中的版本号，并生成一个新的 Git 标签。新版本号将根据增量自动计算。

4. 通过 `conventional-changelog` 根据提交信息生成 `CHANGELOG` 文件，其中包含了自上一个版本以来的所有变更。

![Untitled](/blog/imgs/regulatory-submission-records/Untitled%204.png)

### changelog

`standard-version` 会根据 `commit` 信息生成对应的 `CHANGELOG`，如果我们在 `commit` 信息中使用了 `#number` 这个形式，`#number` 会自动的变成对应仓库的 `issue` 信息

![Untitled](/blog/imgs/regulatory-submission-records/Untitled%205.png)

如果我们添加 `repository.url` 信息，提交对应的 `commit`，能够发现 `#number` 会自动关联上 `repository`，`commit` 信息也是如此

![Untitled](/blog/imgs/regulatory-submission-records/Untitled%206.png)

在我们的业务迭代中，我们往往会使用其他的 bug 管理系统，不是放在 issue 上，希望能够替换 changelog 上的地址

`standard-version` 提供了对应的 [hook](https://github.com/conventional-changelog/standard-version?tab=readme-ov-file#lifecycle-scripts) 做生命周期上其他的处理，我们希望更改 `changelog` 需要在 `postchangelog` 上做处理

在 `package.json` 中新增如下的代码即可

```bash
{
  "standard-version": {
    "scripts": {
      "postchangelog": "handle changelog"
    }
  }
}
```
