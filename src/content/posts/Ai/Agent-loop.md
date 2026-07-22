---
title: Agent Loop：让 Agent 真正跑起来的核心机制
group:
  title: 基础
  order: 2
order: 0
---

## 前言

很多人理解 AI Agent 时，会先想到两件事：一个足够强的 LLM，以及一组可以调用的工具。

但只会调用工具还不够。LLM 调了一次工具，拿到结果之后，如果任务还没完成，它需要继续判断下一步：要不要读另一个文件？要不要再搜一遍？要不要运行测试？要不要停下来给出答案？

这个持续判断和行动的过程，就是 **Agent Loop**。

Anthropic 在《Building effective agents》中有一句很精炼的描述：

> Agents can handle sophisticated tasks, but their implementation is often straightforward. They are typically just LLMs using tools based on environmental feedback in a loop.

Agent 本质上是 LLM 在一个循环里，基于环境反馈使用工具。这里的关键词不是"工具"，而是 **循环**。

Agent Loop 可以简单理解为：

```
用户目标 -> LLM 判断 -> 工具行动 -> 环境反馈 -> 状态更新 -> LLM 再判断
```

它让 AI 从"一次性回答问题"，变成"持续推进任务"。

![20_37_06.png](/blog/imgs/ai/agent-loop/20_37_06.png)

## Agent Loop 为什么需要循环

真实任务很少能靠一次模型调用完成。

比如用户说："扫描当前项目里的 TODO 注释，按文件整理成一个清单，并标出哪些需要优先处理。"

这个任务看起来简单，但 Agent 至少要经历几步：

1. 判断应该先搜索代码；
2. 调用搜索工具查项目源码；
3. 读取搜索结果；
4. 判断是否还需要补充搜索测试、配置或文档目录；
5. 必要时读取相关文件上下文；
6. 最后按文件和优先级整理清单。

如果没有循环，LLM 最多只能根据已有上下文猜一个答案。它不知道项目里真实有哪些 TODO，也无法根据搜索结果继续调整下一步。

有了 Agent Loop，流程就变成了动态的：

```
第一轮：搜索 TODO -> 发现多处注释
第二轮：读取关键文件上下文 -> 判断 TODO 的风险
第三轮：补充搜索 tests/docs -> 确认是否遗漏
第四轮：信息足够 -> 输出清单
```

这里最重要的是：第二轮不是程序员提前写死的，而是 LLM 看完第一轮结果后自己判断出来的。

这也是 Agent 和普通 workflow 的区别。

workflow 是流程预先定义好的：第一步做什么、第二步做什么、第三步做什么。它适合审批流、报表生成、固定规则校验。

Agent Loop 适合路径不确定的任务：目标明确，但中间怎么走，要根据每一步反馈来决定。

**什么场景不需要 Agent Loop？**

并非所有任务都适合循环。下面几类场景用固定 workflow 更简单可控：

- **一问一答**：用户只问一个问题，不需要后续工具调用；
- **固定规则动作**：比如触发一个 webhook、往数据库写一条记录，动作路径完全确定；
- **纯编排任务**：比如定时 ETL 流程、审批链、模板渲染，每一步做什么都是事先约定好的。

Agent Loop 的适用场景是**目标明确但路径不确定**——在工具空间里摸索着往前走，每一步根据上一步的反馈决定下一步。如果路径完全确定，提前固定下来比每次让模型判断更高效、更可靠。

## 状态回流为什么关键

Agent Loop 的核心不是 `while`，而是 **状态回流**。

LLM 本身是无状态的。它不会天然记得自己上一轮搜过什么、读过什么、失败过什么。要让它"接着干"，Agent 程序必须把每一轮模型回复、工具调用、工具结果都追加到消息历史里。

以 TODO 扫描为例，第一轮 LLM 可能返回：

```json
{
  "type": "tool_use",
  "name": "search",
  "input": {
    "pattern": "TODO",
    "path": "."
  }
}
```

工具执行后返回：

```text
src/auth.js:42      // TODO: add token refresh logic
src/api.js:18       // TODO: handle timeout errors
src/utils.js:7      // TODO: refactor this function
docs/deploy.md:15   <!-- TODO: document rollback steps -->
```

这个结果不能只是展示给用户，而要作为 `tool_result` 回到消息历史里。下一轮 LLM 看到它，才会知道：

- 已经做过全局 TODO 搜索；
- 找到了代码和文档里的 TODO；
- `auth.js` 和 `api.js` 可能影响运行时行为，优先级更高；
- `utils.js` 更像代码质量项，优先级可以低一些；
- `docs/deploy.md` 属于文档补齐，应该单独归类。

第二轮如果 LLM 决定读取 `src/auth.js` 和 `src/api.js`，读取结果也要回流。第三轮如果补充搜索 `tests` 没有结果，这个"空结果"同样要回流。因为"没有搜到"也是状态，它能阻止模型重复搜索同一个位置。

所以，Agent Loop 的链路不是：

```
LLM -> 工具 -> 用户
```

而是：

```
LLM -> 工具 -> 消息历史 -> LLM
```

这就是 Agent 能持续工作的根本原因。

## 最小心智模型

所谓"最小心智模型"，不是要复刻某个框架的源码结构，而是用最少的概念抓住 Agent Loop 的本质。

它只关心四件事：

1. `messages`：保存用户输入、模型回复和工具结果；
2. `callLLM`：让模型基于当前消息历史做下一步判断；
3. `runToolSafely`：执行模型提出的工具调用；
4. `shouldFinalize`：判断是否真的可以结束。

这四件事连起来，就是一个最小 Agent Loop。

![ChatGPT Image 2026年7月4日 20_39_32.png](/blog/imgs/ai/agent-loop/20_39_32.png)

它和真实源码的关系可以这样理解：**最小心智模型解释"为什么能跑"，真实源码解决"怎样稳定地跑"。**

最小模型里，我们暂时不展开事件流、上下文压缩、并行工具执行、用户中断、follow-up message 等工程细节，只保留最关键的反馈闭环：

```
messages -> LLM -> tool_use -> tool_result -> messages
```

对应到代码，核心就是不断调用 LLM、执行工具、把结果写回消息历史。

```ts
type Message = {
  role: 'user' | 'assistant' | 'tool' | 'system';
  content: string;
};

type ToolUse = {
  name: string;
  input: unknown;
};

type ModelResponse = {
  content: string;
  stop_reason: 'tool_use' | 'end_turn' | 'max_tokens' | 'error';
  tool_use?: ToolUse;
};

async function runAgent(userTask: string) {
  const messages: Message[] = [{ role: 'user', content: userTask }];

  while (true) {
    const response = await callLLM(messages);

    messages.push({
      role: 'assistant',
      content: response.content,
    });

    if (response.stop_reason === 'tool_use' && response.tool_use) {
      const result = await runToolSafely(response.tool_use);

      messages.push({
        role: 'tool',
        content: JSON.stringify(result),
      });

      continue;
    }

    if (await shouldFinalize(messages, response)) {
      return response.content;
    }

    messages.push({
      role: 'system',
      content: 'Continue the task or verify the result before finalizing.',
    });
  }
}
```

这段代码里有几个关键点。

- `messages` 是 Agent 的短期记忆；
- `stop_reason === "tool_use"` 表示模型要继续调用工具；
- 工具结果会被重新写入 `messages`；
- `shouldFinalize` 决定是否真的可以结束。

它故意写得很小，因为这段代码的目的不是覆盖所有生产细节，而是让读者一眼看懂 Agent Loop 的核心：**模型不是只回答一次，而是在工具反馈后继续判断。**

这里把失控保护抽象掉了。生产系统当然需要防止循环失控，但具体实现可以有很多种：中断信号、工具返回的 `terminate`、每轮结束后的 `shouldStopAfterTurn`、预算控制，或者没有更多工具调用时自然结束。

<aside>

🛠 上面这个最小模型展示了 Agent Loop 最核心的反馈闭环。但它有意抽象掉了四组工程细节：\***\*事件与可观测性、上下文压缩与记忆、权限与安全边界、中断与恢复\*\***。这些缺口不是可有可无的修饰——它们各自解决一个真实问题：事件系统让用户能看到 Agent 在做什么，上下文管理保证 Agent 不会在长任务中迷失，权限控制防止模型越界操作，中断恢复应对执行过程中的各种意外。下面的真实实现会逐一补上这些缺口。

</aside>

## 从真实源码看工程化边界

如果看真实项目里的实现，会发现核心仍然是上面的反馈链路，只是多了工程化边界。

比如 `earendil-works/pi` 里的 `agent-loop.ts`，整体结构可以概括成这样：

```
agentLoop()
  -> runAgentLoop()
    -> runLoop()
      -> streamAssistantResponse()
      -> executeToolCalls()
      -> append toolResult messages
      -> prepareNextTurn / shouldStopAfterTurn
```

![ChatGPT Image 2026年7月4日 21_00_44.png](/blog/imgs/ai/agent-loop/21_00_44.png)

这个实现里有几个值得学习的点。

第一，它区分了"启动一次新任务"和"从当前上下文继续"。`agentLoop` 会把新的 prompt 加进上下文，而 `agentLoopContinue` 用于 retry 或已有 tool result 后继续跑。这说明真实 Agent 不只是"一次请求"，还要支持中断、重试和续跑。

第二，它有内外两层循环。内层循环处理 assistant response 和 tool calls，只要还有工具调用，就继续把结果喂回模型。外层循环会在 Agent 本来要停止时，再检查有没有新的 follow-up message。也就是说，用户在 Agent 工作期间追加的消息，也能被纳入下一轮。

第三，它把 `AgentMessage[]` 和 LLM 原生 `Message[]` 分开。Agent 内部保留自己的消息结构，只有在真正调用模型前，才通过 `convertToLlm` 转成模型需要的格式。这是一个很好的边界：Agent runtime 不应该被某个模型供应商的消息协议绑死。

第四，它的循环收束由多种条件共同决定：assistant 返回 `error` 或 `aborted` 会结束；一轮工具结果都带有 `terminate` 时会停止后续工具循环；`shouldStopAfterTurn` 可以在每轮结束后主动终止；没有 tool call、没有 steering message、也没有 follow-up message 时，循环自然结束。

第五，它不是等所有事情结束才输出结果，而是通过事件流不断发出 `agent_start`、`turn_start`、`message_update`、`tool_execution_start`、`tool_execution_end`、`agent_end` 等事件。这样 UI 能展示实时进度，日志系统也能完整记录 Agent 做过什么。

所以，真实源码验证了前面的判断：Agent Loop 的核心很简单，但一个可用的实现需要处理上下文、事件、工具执行、终止条件和恢复入口。

## 工具执行安全边界

在 Agent Loop 里，LLM 会不断提出工具调用意图。但模型不能直接拥有所有权限。

更稳妥的设计是：**LLM 负责提出动作意图，Agent 程序负责执行边界。**

也就是说，模型可以说"我想读这个文件""我想运行这个命令""我想修改这里"，但程序要判断：

- 这个工具是否存在；
- 当前任务是否允许调用；
- 是否需要用户确认；
- 参数是否安全；
- 执行失败后怎么反馈。

![ChatGPT Image 2026年7月4日 21_10_49.png](/blog/imgs/ai/agent-loop/21_10_49.png)

一个安全的工具执行器可以这样写：

```ts
async function runToolSafely(toolUse: ToolUse, tools: ToolMap) {
  const tool = tools[toolUse.name];

  if (!tool) {
    return {
      ok: false,
      content: `Unknown tool: ${toolUse.name}`,
    };
  }

  const permission = await checkPermission(toolUse);

  if (!permission.allowed) {
    return {
      ok: false,
      content: `Permission denied: ${permission.reason}`,
    };
  }

  try {
    return await tool(toolUse.input);
  } catch (error) {
    return {
      ok: false,
      content: error instanceof Error ? error.message : String(error),
    };
  }
}
```

注意，即使工具执行失败，也不一定代表任务失败。失败结果也应该回到消息历史里，让 LLM 判断下一步是换工具、改参数，还是向用户说明限制。

真实实现里，工具执行通常还会再细一层。

在 `agent-loop.ts` 中，工具调用不是拿到就直接执行，而是先经过 `prepareToolCall`：

- 找不到工具时，直接生成错误类型的 tool result；
- 执行前会调用 `prepareArguments` 整理参数；
- 再用 `validateToolArguments` 校验参数；
- 如果配置了 `beforeToolCall`，可以在这里做权限检查、用户确认或拦截；
- 工具执行后，还会经过 `afterToolCall`，允许统一改写结果、标记错误或要求终止。

这比一个简单的 `runTool()` 更接近生产形态。模型负责提出工具调用，但真正能不能执行、参数是否合法、结果如何包装，都由 Agent 程序控制。

另外，源码里还区分了顺序执行和并行执行。某些工具天然需要顺序执行，比如写文件、执行命令、修改状态；另一些工具可以并行，比如同时读取多个文件或做多路搜索。Agent Loop 不只是"调工具"，还要决定这批工具如何安全地调。

## 上下文管理

Agent Loop 每跑一轮，消息历史都会变长。用户目标、模型回复、工具参数、工具结果、错误日志，都会进入上下文。

如果不管理上下文，Agent 很快会遇到几个问题：

- token 成本越来越高；
- 旧信息干扰新判断；
- 关键日志被大量输出淹没；
- 超出上下文窗口后无法继续；
- 模型重复阅读无关内容。

所以成熟的 Agent 通常会做几件事：

1. **压缩旧消息**：把早期过程总结成短摘要。
2. **保留关键事实**：记录已经搜过哪里、改过哪些文件、哪些测试失败过。
3. **裁剪工具结果**：日志只保留错误片段和关键上下文。
4. **限制工具范围**：只把当前任务需要的工具暴露给模型。
5. **结构化状态**：把目标、计划、观察结果、错误信息分开保存。

上下文管理不是性能优化，而是 Agent 能不能长时间稳定工作的基础。

## 退出前恢复

很多简单实现会把 `end_turn` 当作结束信号：

```ts
if (response.stop_reason === 'end_turn') {
  return response.content;
}
```

但在真实任务里，模型停下来不一定代表任务真的完成。它可能只是：

- 输出被 `max_tokens` 截断；
- 上下文太长，需要压缩；
- 工具结果太大，模型没有抓住重点；
- 还没有做最终验证；
- 误判任务已经完成；
- 最后一轮工具失败，但错误还没解释清楚。

所以更稳的做法是，在退出前做一次恢复判断：

```ts
async function shouldFinalize(messages: Message[], response: ModelResponse) {
  if (response.stop_reason === 'max_tokens') {
    return false;
  }

  if (needsContextCompaction(messages)) {
    return false;
  }

  if (needsVerification(messages)) {
    return false;
  }

  if (lastToolFailed(messages) && !errorExplained(response)) {
    return false;
  }

  return response.stop_reason === 'end_turn';
}
```

比如写代码任务里，Agent 不应该只说"我改好了"。更好的结束条件是：代码改完，测试跑过，失败能解释，成功能给出验证结果。

## **事件流与可观测性**

Agent Loop 运行时，用户不应该只看到最后一句"完成了"。更好的体验是能看到 Agent 正在做什么：

- 正在搜索哪些文件；
- 准备调用哪个工具；
- 工具是否执行成功；
- 是否需要权限确认；
- 为什么继续，为什么停止。

所以很多 Agent 会把运行过程输出成事件流，而不是单纯的文本流。

```ts
async function* runAgentEvents(userTask: string, signal?: AbortSignal) {
  const messages: Message[] = [{ role: 'user', content: userTask }];

  while (true) {
    if (signal?.aborted) {
      yield {
        type: 'result',
        reason: 'aborted',
      };
      return;
    }

    const response = await callLLM(messages);

    yield {
      type: 'assistant_message',
      content: response.content,
    };

    messages.push({
      role: 'assistant',
      content: response.content,
    });

    if (response.stop_reason === 'tool_use' && response.tool_use) {
      yield {
        type: 'tool_call',
        tool: response.tool_use.name,
        input: response.tool_use.input,
      };

      const result = await runToolSafely(response.tool_use);

      yield {
        type: 'tool_result',
        result,
      };

      messages.push({ role: 'tool', content: JSON.stringify(result) });

      if (result.terminate) {
        yield {
          type: 'result',
          reason: 'tool_terminate',
        };
        return;
      }

      continue;
    }

    yield {
      type: 'result',
      reason: response.stop_reason,
      content: response.content,
    };

    return;
  }
}
```

![21_23_50.png](/blog/imgs/ai/agent-loop/21_23_50.png)

它通过 `AbortSignal` 支持外部中断，通过工具结果里的 `terminate` 支持工具侧终止，通过非 `tool_use` 的响应自然结束。真实源码里的 `agent-loop.ts` 也是类似思路：循环不是靠一个硬编码数字停止，而是由事件、工具结果、配置钩子和上下文状态共同决定。

事件流的价值在于可观察性。UI 可以展示进度，日志系统可以记录工具调用，审计系统可以追踪权限决策。Agent 不再是一个黑盒。

## 总结

Agent Loop 的本质，是一个持续运行的反馈循环：

```
调用 LLM -> 执行工具 -> 回填结果 -> 继续判断 -> 直到完成
```

它解决的是一个非常核心的问题：LLM 如何从"一次性生成答案"，变成"根据环境反馈持续推进任务"。

一个靠谱的 Agent Loop，至少要处理好这些事：

- 为什么需要循环；
- 工具结果如何回流到状态；
- 如何写出清晰的循环骨架；
- 工具执行如何做权限和错误边界；
- 上下文如何压缩和保留关键事实；
- 退出前如何恢复和验证；
- 运行过程如何通过事件流暴露出来。

当这些环节被设计清楚，AI Agent 才不只是一个会聊天、会调用工具的应用，而是一个能在真实环境里一步步完成任务的系统。

## 参考资料

[Claude Code 是怎么跑起来的：从 Agent Loop 理解代理循环实现](https://cloud.tencent.com/developer/article/2654909)  
[Agent Loop：让 Agent 自己跑起来](https://mp.weixin.qq.com/s/GXMgtuSwcwrtqqmb8Gr9mg)
