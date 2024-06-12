---
title: 了解 package.json
group:
  title: 包管理
  order: 4
order: 0
---

<style>
    .quote {
        background-color: #FFE7CC;
        padding: 10px;
        border-radius: 8px;
        font-weight: 500;
    }
</style>

## npm 中的依赖包

### 依赖包类型

1. dependencies

   应用依赖/业务依赖。应用发布上线后所需要的依赖，依赖的代码属于线上代码的一部分，例如`react`/`vue`等框架，`ant-design`/`element`等组件库

   使用`npm i ${packageName} -S` 来安装依赖

2. devDependencies

   开发环境依赖。在项目开发时所需要的依赖，例如构建工具`webpack`/`gulp`，单元测试工具`jest`等

   使用`npm i ${packageName} -D`来安装依赖

3. peerDependencies

   同等依赖。提示宿主环境去安装满足插件所指定的依赖包。例如**antd@3.x**，该 ui 组件库只是提供了一套 react 组件，它会要求宿主环境安装指定的 react 版本

   ```json
   "peerDependencies": {
     "react": ">=16.0.0",
     "react-dom": ">=16.0.0"
   }
   ```

   它要求宿主环境安装`react`/`react-dom`版本都大于 16.0.0

   <div class="quote">
   📌 在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题

   </div>

4. optionalDependencies

   可选依赖。其中的依赖安装失败也不会影响安装过程。但是值得注意的是，`optionalDependencies`会覆盖`dependencies`中的同名依赖包，因此不要在两个地方都定义

5. bundledDependencies / bundleDependencies

   打包依赖。打包发布时希望一些依赖包也出现在最终的包里

   ```json
   {
     "name": "fbb-test",
     "dependencies": {
       "mysql2": "^2.1.0"
     },
     // ...
     "bundledDependencies": ["mysql2"]
   }
   ```

   执行打包时，`fbb-test.1.0.0`包中就会包含 mysql。值得注意的是，在`bundledDependencies`中指定的包，一定要在`dependencies`和`devDependencies`中声明

### 语义化版本控制

依赖中的版本号反映了代码所做的修改，产生了语义化的版本号

npm 包使用语义化版控制，我们可安装一定版本范围的 npm 包，npm 会选择和你指定的版本相匹配的(`latest`)最新版本安装

npm 采用了`semver`规范作为依赖版本管理方案。由三个部分组成:**主版本号**.**次版本号**.**补丁版本号**。变更不同的版本号，代表着不一样的含义

- 主版本号: 软件做了不兼容的变更，重大变更
- 次版本号: 添加/废弃了某些功能，向下兼容
- 补丁版本号: bug 修复，向下兼容

常见的版本号

- react: 16.3.0
  表示精准的版本号，任何其他的版本号都不匹配
- react: ^16.3.6
  表示兼容补丁和小版本更新的版本号。**兼容除了最左侧非 0 版本号之外的变化**
  除了最左侧非 0 版本之外
  ```json
  ^16.3.6 等价于 >= 16.3.6 < 17.0.0，除了16不能变之外，其他都可以改变
  ^0.3.6 等价于 >= 0.3.6 < 0.4.0，因为左侧是0，3不变，其他都能兼容
  ^0.0.6 等价于 >= 0.0.6 < 0.0.7，等价于精确到0.0.6
  ```
- react: ~16.3.6
  表示兼容补丁更新的版本号。~的定义分为两部分，如果列出了小版本号(第二位)，则兼容补丁的修改；如果没有列出次版本号，则兼容次版本号和补丁号
  ```json
  ~16.3.6 兼容补丁号，等价于 >= 16.3.6 < 16.4.0
  ~16.3 没有补丁号，和上面等价，>= 16.3.0 < 16.4.0
  ~16 没有列出小版本号，兼容小版本号和补丁号，等价于 >= 16.0.0 < 17.0.0
  ~0.3.6  >= 0.3.6 < 0.4.0
  ```
- react: 16.x
  x/X/\*/空，都表示通配符的版本号，可以匹配任何内容
  ```json
  * 表示匹配任何版本号
  16.x 16.* 匹配所有主版本号为16的所有版本，等价于 >= 16.0.0 < 17.0.0
  16.3.x 16.3.* 匹配所有以16.3开头的所有版本，等价于 >= 16.3.0 < 16.4.0
  ```
