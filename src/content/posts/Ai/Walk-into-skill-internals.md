---
title: 走进 Skill 的内部机制
group:
  title: 基础
  order: 1
order: 0
---

![skill-internals-mechanism.png](/blog/imgs/ai/skill/skill-internals-mechanism.png)

## Skill 到底是什么？

很多人第一次看到 Skill，会把它理解成"一份写给模型看的 Markdown"。这个理解不能说错，但它只摸到了表面。真正有价值的 Skill，不是把经验写成文档，而是把一个可复用的工作流变成 Agent 能够发现、触发、加载、执行、验证和分发的能力包。

换句话说，Skill 的核心不是"写说明"，而是"把一次靠谱的做事方式压缩成下次还能靠谱复现的机制"。

## Skill 为什么不是 Markdown

`SKILL.md` 很重要，但 Skill 不等于 `SKILL.md`。

`SKILL.md` 是入口文件，负责告诉 Agent：这个 Skill 叫什么、什么时候该用、使用时应该遵循什么流程。可一个成熟的 Skill 往往还会带上引用材料、脚本、模板、图标、默认提示和工具依赖声明。

一个常见结构大概长这样：

```
my-skill/
├── SKILL.md
├── references/
├── scripts/
├── assets/
└── metadata-or-ui-config.yaml
```

所以，Markdown 更像 Skill 的控制面板。真正让它变成"能力"的，是这份入口说明背后的资源组织、触发机制和执行约束。

## Agent 是怎么发现一个 Skill 的

大多数支持 Skill 的 Agent，不会一开始就把所有 Skill 的完整内容都塞进上下文。它们通常先拿到一个轻量索引：`name`、`description` 和路径。只有当用户显式点名某个 Skill，或者任务和 `description` 匹配时，Agent 才会读取完整的 `SKILL.md`。

![skill-lifecycle.png](/blog/imgs/ai/skill/skill-lifecycle.png)

这就是 Skill 的第一层机制：先发现，再加载。

它带来一个很现实的后果：很多 Skill 不是正文写得不好，而是根本没有被正确发现。Agent 没读到正文之前，正文再精彩也没用。

如果要进一步优化发现准确率，还需要面对一个真实场景：对于中英混用的团队，description 用中文写还是英文写？Agent 的查询语言和 description 语言不一致时是否仍能命中？目前大多数实现不处理这一问题，所以保守的做法是在 description 里同时包含中英文关键触发词，确保不同语言下的自然语言任务都能命中。

## Skill 真正保存的是"做事方式"

如果把 Skill 当成知识库，很容易写成百科：背景、定义、概念、注意事项全塞进去。这样看起来很完整，但对 Agent 未必有用。

![way-of-doing-things.png](/blog/imgs/ai/skill/way-of-doing-things.png)

这也是 Skill 和普通文档最大的区别。普通文档是给人看的，Skill 是给 Agent 执行的。它不追求"讲得多"，而追求"下次还能按这个流程做对"。

## 为什么 description 决定 Skill 是否生效

`description` 不是介绍文案，而是触发器。

一个不好的 `description` 往往很泛：

```yaml
description: Help with reports.
```

它的问题不是英文短，而是不知道什么时候该触发。周报算 report 吗？PR 总结算 report 吗？线上事故复盘算 report 吗？Agent 只能猜。

更好的写法应该把触发场景、边界和用户可能说的话放进去：

```yaml
description: Use when the user asks to generate a weekly report from Notion records, summarize this week's completed work, classify items by scope, or produce a Chinese weekly status update.
```

这类描述更像路标，而不是名片。它告诉 Agent：看到哪些任务应该进来，哪些任务不该进来。

还有一个容易被忽略的点：当安装的 Skill 很多时，初始 Skill 列表会受到上下文预算限制，描述可能被压缩，甚至部分 Skill 会被省略。所以触发词要前置，边界要简洁，最重要的信息要放在开头。

另外，对于中英混用的协作环境，可以将中英文触发词并列放入 description，例如 `review code / 审查代码`，以兼容不同语言的自然语言查询。

## 为什么要渐进披露

Skill 的内部机制里，有一个非常关键的设计叫渐进披露。

![skill-progressive -disclosure.png](/blog/imgs/ai/skill/skill-progressive_-disclosure.png)

它大概分三层：

1. **第一层**：只暴露 `name`、`description`、路径，用来决定是否触发。
2. **第二层**：触发后读取完整 `SKILL.md`，获得核心流程。
3. **第三层**：根据任务需要，再读取 `references/`，调用 `scripts/`，使用 `assets/`。

这套机制的本质，是把上下文当成稀缺资源。Agent 不需要一开始知道所有细节，它只需要先知道"该不该用这个 Skill"。等真的命中任务，再读取更深的内容。

所以，写 Skill 时不要把所有东西都塞进 `SKILL.md`。正文应该保留核心流程和判断规则，大段规范、案例、API 文档、业务字段说明，应该放到 `references/` 里按需读取。

**渐进披露也带来一个被忽略的设计问题**：当用户通过 `/skill-name` 反复手动触发同一个 Skill 时，之前的上下文会不会污染下一轮行为？稳妥的做法是每次手动触发时清空上下文、重新加载渲染后的 Skill 内容，确保复现一致。

## Skill 在运行时到底发生了什么

不同 Agent 对 Skill 的实现会有一些差异：目录位置不同、命令名规则不同、frontmatter 字段不同、权限模型不同。但它们的核心运行机制非常接近，可以先理解成一条管线：

```
发现 Skill -> 建立索引 -> 判断触发 -> 读取正文 -> 渲染上下文 -> 执行任务 -> 验证结果
```

对应的流程大概是这样：

![skill-runtime-flow.svg](/blog/imgs/ai/skill/skill-runtime-flow.png)

如果把这个过程写成伪源码，它大概不是"模型读一个 Markdown 文件"这么简单，而是一条从发现到执行的渲染管线。注意，下面代码是基于 Agent Skills 规范和 Claude Code 文档整理出的概念模型，不是某个具体 Agent 的真实源码。

```ts
type SkillMeta = {
  name: string;
  description: string;
  location: string;
  commandName?: string;
  disableModelInvocation?: boolean;
  context?: 'inline' | 'fork';
  allowedTools?: string;
};

async function runSkillLifecycle(userInput: string) {
  const catalog = skillRoots().flatMap(scanSkillDirs).map(readFrontmatterOnly);

  const skill = startsWithSlashCommand(userInput)
    ? findByCommandName(userInput, catalog)
    : modelSelectsFromCatalog(userInput, catalog);
  if (!skill) return runWithoutSkill(userInput);

  const raw = readFile(skill.location);
  const body = stripFrontmatter(raw);
  const prompt = await renderOnce(body, {
    arguments: parseArguments(userInput),
    dynamicContext: true,
  });

  return skill.context === 'fork'
    ? runSubagent(prompt, skill.allowedTools)
    : appendToMainConversation(prompt, skill.allowedTools);
}
```

这里有几个关键点：

1. 发现阶段通常只读取 `name`、`description`、路径等轻量信息，不会把所有 `SKILL.md` 全部塞进上下文。
2. 触发可以来自用户显式输入 `/skill-name`，也可以来自模型根据 `description` 判断任务相关。
3. 渲染阶段会处理参数和动态上下文。有些实现会在模型看到 Skill 前先执行命令、读取文件或展开环境信息，并且通常只展开一轮，避免递归展开带来的风险。
4. 执行阶段可能把 Skill 内容注入主会话，也可能 fork 到子代理里隔离执行。前者适合持续指导当前任务，后者适合调研、总结、代码探索这类不想污染主会话上下文的工作。

这也解释了为什么 Skill 看起来只是 Markdown，运行起来却更像一套轻量插件系统：它真正复用的不是一段文字，而是"发现、加载、渲染、执行和验证"这一整套工作流。

## 如何验证一个 Skill 是否真的有效

判断一个 Skill 有没有价值，不是看它写得多完整，而是看它有没有改变 Agent 的行为。

可以看五个指标：

1. 触发准确率：用户自然描述任务时，它是否会被正确选中？
2. 误触发率：不该用它的时候，它是否乱入？
3. 执行稳定性：同类任务重复执行，步骤是否一致？
4. 验证闭环：它是否要求 Agent 做必要检查？
5. 维护成本：新增边界时，是补充几句规则，还是要重写整份文档？

还可以准备一组测试提示词：

```
帮我从 Notion 生成这周周报
把今天 GitLab 的 fix/feat/hotfix 提交同步到 Notion
帮我 review 这个 GitLab MR
为这个 Bug 生成禅道修复备注
```

观察它们是否命中对应 Skill，是否读取该读的 reference，是否运行该运行的脚本，是否给出符合团队习惯的输出。

如果一个 Skill 只有在用户精确喊出名字时才工作，它还只是一个手册。如果用户自然描述需求时它也能稳定接管流程，它才真正进入了 Agent 的工作系统。

**一个延伸问题：怎么测试 Skill 的稳定性？** 由于 LLM 行为有随机性，同一个 Skill 多次执行可能得到不同结果。建议对输出不做"逐字一致"的断言，而是做关键动作校验——比如是否读了 `references/` 下的文件、是否运行了 `scripts/` 中的脚本、最终输出是否包含预期结构。这样既允许 LLM 的自然表达，又保证了流程的不变性。

## 一个好 Skill 最值钱的是坑点清单

很多人写 Skill 时，会把精力放在"背景介绍"上。但真正值钱的部分，往往是坑点清单。

**执行顺序**

1. 哪些步骤必须先做，不能颠倒？
2. 哪些操作应该脚本化，避免 Agent 每次临场重写？

**判断与边界**

1. 哪些工具看起来能用，其实会产出错误结果？
2. 哪些场景必须先问用户，哪些可以直接合理假设？
3. 哪些输出必须验证，验证失败时怎么降级？

**资源组织**

1. 哪些信息应该放正文，哪些应该放 `references/`？
2. 哪些动作需要审批，哪些文件不能动？

按维度分组后，每个作者可以更快定位自己缺哪类坑点，而不是面对一排问题无从下手。

Skill 的价值不是把人类知道的全部东西铺满，而是把任务中最容易翻车的地方提前标红。

比如"生成图片"这个任务，难点不只是写 prompt，而是知道什么时候应该用图片生成工具，什么时候该直接画 SVG，透明背景什么时候可以色键抠图，什么时候需要提醒用户走原生透明路径。这样的判断，才是 Skill 的含金量。

## 会写 Skill，就是会把经验产品化

我会用这个公式判断一个 Skill 是否值得存在：

```
好 Skill = 清晰触发 + 精简正文 + 按需引用 + 确定性脚本 + 坑点前置 + 可验证输出
```

单次提示词像口头交代，`AGENTS.md` 像项目规矩，MCP 像外部工具接口，Hook 像生命周期拦截器，而 Skill 像可复用的任务方法论。它把触发条件、执行步骤、参考材料、脚本工具和验证标准打包在一起，让经验从"这次对了"变成"下次也能对"。

所以，走进 Skill 的内部机制，真正要看的不是那一份 Markdown，而是它背后的触发路由、渐进加载、资源组织、运行时渲染和团队分发路径。

会写 Skill，不只是会写文档，而是会把经验做成系统。

## 参考资料

1. [Claude Code Docs: Extend Claude with skills](https://code.claude.com/docs/en/skills)
2. [Agent Skills Specification](https://agentskills.io/specification)
