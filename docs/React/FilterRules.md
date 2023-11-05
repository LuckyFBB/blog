---
title: 且或组件实现思路
group:
  title: React 组件
  order: 3
order: 0
---

## 前言

在业务实现中，时常会出现且或关系逻辑的拼接，UI 小姐姐说，加钱，这个组件应该写成这样的展示方式。

![Untitled](/blog/imgs/andOr/Untitled.png)

前端程序员 🧑‍💻：😯，so easy!!!

## 前期分析

### 需要确定好数据结构

因为是嵌套结构，可以通过 ➕➖ 来增加层级或者数据，因此采用树形结构来存储数据。

```js
interface IFilterValue<T> {
  key: string;
  level?: number; // 当前节点的层级，用于判断一些按钮的展示
  type?: number; // 当前节点的条件关系，0 | 1
  formValues?: T; // Form 节点的相关的信息(子节点无条件节点时才有)
  children?: IFilterValue<T>[]; // 子节点的信息(子节点存在条件节点时才有)
}
```

上述的图片的数据为：

```js
{
    "key": "OXVz_UZ3E",
    "level": 1,
    "children": [
        {
            "key": "aIQFa4yp-V",
            "type": 2,
            "level": 2,
            "children": [
                {
                    "formValues": {
                        "condition": 1,
                        "rowPermission": ""
                    },
                    "key": "L40pT7vZi",
                    "level": 2
                },
                {
                    "key": "Zn7hi6dvTL",
                    "type": 1,
                    "level": 3,
                    "children": [
                        {
                            "key": "ytcmRyXxe",
                            "level": 3,
                            "formValues": {
                                "condition": 1,
                                "rowPermission": ""
                            }
                        },
                        {
                            "formValues": {
                                "condition": 1,
                                "rowPermission": ""
                            },
                            "key": "_yjPVHv6Qd",
                            "level": 3
                        }
                    ]
                }
            ]
        },
        {
            "formValues": {
                "condition": 1,
                "rowPermission": ""
            },
            "key": "yQXokMiTx",
            "level": 1
        }
    ],
    "type": 1
}
```

### 明确每个操作按钮的实现

### 明确组件的封装

- 组件只希望实现条件节点/线条/操作按钮的展示，因此后面的组件需要作为参数 component 传入
- 组件对层级有一个控制，支持 maxLevel 来控制
- 每一次新增数据的时候，默认值需要传入 _initRowValues_
- 支持两种模式 编辑状态 和 查看状态
- 支持受控和非受控两种模式

## 组件封装

### FilterRules

提供给用户使用的组件，实现数据的增删改查操作。可以采用受控和非受控两种模式。

它接受的参数如下：

```js
interface IProps<T> {
  columns?: string[];
  value?: IFilterValue<T>;
  name?: NamePath;
  isEdit?: boolean;
  maxLevel?: number;
  component: JSX.Element;
  initRowValues?: T;
  notEmpty?: boolean;
  onChange?: (value: any) => void;
}
```

```js
export const FilterRules = <T,>(props: IProps<T>) => {
    const {
        component,
        maxLevel = 5,
        isEdit = true,
        notEmpty = true,
        value,
        initRowValues,
        onChange,
    } = props;

    const finRelationNode = (parentData, targetKey, needCurrent) => {};
    const handleAddCondition = (keyObj: { key: string; isOut?: boolean }) => {};
    const addCondition = (
        treeNode: any,
        keyObj: { key: string; isOut?: boolean },
        initRowValue: T
    ) => {};
    const handleDeleteCondition = (key: string) => {};
    const deleteCondition = (parentData, key: string) => {};
    const updateLevel = (node) => {};
    const handleChangeCondition = (key, type) => {};
    const handleChangeFormValues = (key, values) => {};

    return (
        <RulesController<T>
            maxLevel={maxLevel}
            isEdit={isEdit}
            value={value}
            component={component}
            onAddCondition={handleAddCondition}
            onDeleteCondition={handleDeleteCondition}
            onChangeCondition={handleChangeCondition}
            onChangeFormValues={handleChangeFormValues}
        />
    );
};
```

- 编辑情况

  - 非受控组件使用

    ```js
    <Form form={form}>
        <Form.Item name={'condition'}>
            <FilterRules<IRowValue>
                component={<RowColumnConfig columns={record?.columns ?? []} />}
                maxLevel={MAX_LEVEL}
                initRowValues={INIT_ROW_VALUES}
                notEmpty={false}
            />
        </Form.Item>
    </Form>

    // RowColumnConfig 实现，name 可能是 children[0].formValues
    <Form.Item
        name={['condition', ...name, 'column']}
        rules={[{ message: '请选择字段', required: true }]}
        initialValue={column}
    >
        <Select placeholder="请选择字段">
            {columns.map((item) => (
                <Option key={item} value={item}>
                    {item}
                </Option>
            ))}
        </Select>
    </Form.Item>

    // 最后通过 form.validateFields() 拿到的和上述的数据结构一致
    ```

  - 受控组件使用

    ```js
    const [ruleData, setRuleData] = useState({
        level: 0,
        formValues: {
            column: first.column,
            condition: first.condition,
            rowPermission: first?.value,
        },
    });

    <FilterRules<IRowValue>
    		value={ruleData}
        component={<RowColumnConfig columns={record?.columns ?? []} />}
        maxLevel={MAX_LEVEL}
        initRowValues={INIT_ROW_VALUES}
        notEmpty={false}
    		onChange={setRuleData}
    />

    // 通过 ruleData 就能够拿到最后的结果
    ```

- 查看使用

  ```js
  <FilterRules
    component={<RowColumnConfig columns={[]} />}
    isEdit={false}
    value={value}
  />
  ```

  ![Untitled](/blog/imgs/andOr/Untitled%201.png)

### RulesController

做节点的展示，渲染正确的组件

## 具体实现

### 编辑时高度计算

#### 计算每个节点的高度

![Untitled](/blog/imgs/andOr/Untitled%202.png)

- 如果是普通节点，它的高度为 ITEM_HEIGHT + MARGIN (输入框的高度 + marginBottom)
- 如果是条件节点，它的高度为 children 中每一个节点的高度 + 添加节点的高度 ITEM_HEIGHT

```js
const calculateTreeItemHeight = (item, isEdit) => {
  if (!item?.children)
    return {
      ...item,
      height: ITEM_HEIGHT + MARGIN,
      lineHeight: ITEM_HEIGHT,
    };
  item.children = item.children.map((child) =>
    calculateTreeItemHeight(child, isEdit),
  );
  item.height = item.children.reduce(
    (prev, curr) => prev + curr.height,
    ITEM_HEIGHT,
  );
  return item;
};
```

#### 计算每个节点的连线高度

![Untitled](/blog/imgs/andOr/Untitled%203.png)

- 如果是最后一个条件节点
  线条长度为 块级高度 - (第一个节点高度 - MARGIN)/2 - 最后一个节点/2
- 如果不是最后一个条件节点
  线条长度为 firstNodeLineHeight + 剩余子节点高度 + 添加节点/2
  - 如果第一个子节点是普通节点：firstNodeLineHeight = 节点高度/2 + MARGIN
  - 如果第一个子节点是条件节点：firstNodeLineHeight = 子节点线条高度 + 添加节点/2

```js
const calculateTreeItemHeight = (item, isEdit) => {
  if (!item?.children)
    return {
      ...item,
      height: ITEM_HEIGHT + MARGIN,
      lineHeight: ITEM_HEIGHT,
    };
  item.children = item.children.map((child) =>
    calculateTreeItemHeight(child, isEdit),
  );
  const isLastCondition = !item.children.some(isCondition);
  const firstNodeIsCondition = isCondition(item.children[0]);
  item.height = item.children.reduce(
    (prev, curr) => prev + curr.height,
    ITEM_HEIGHT,
  );
  // 如果当前节点是最后的判断节点
  if (isLastCondition) {
    const firstNodeLineHeight = item.children[0]?.height - MARGIN;
    const lastNodeHeight = ITEM_HEIGHT;
    item.lineHeight =
      item.height - firstNodeLineHeight / 2 - lastNodeHeight / 2;
  } else {
    const firstNodeLineHeight = firstNodeIsCondition
      ? item.children[0].lineHeight / 2 + ITEM_HEIGHT / 2
      : ITEM_HEIGHT / 2 + MARGIN;
    item.lineHeight =
      firstNodeLineHeight +
      item.children
        ?.slice(1)
        .reduce((prev, curr) => prev + curr.height, ITEM_HEIGHT / 2);
  }
  return item;
};
```

### 查看时高度计算

#### 计算每个节点的高度

节点高度 等于每一个节点的高度之和

```js
const calculateTreeItemHeight = (item, isEdit) => {
if (!item?.children) return { ...item, height: ITEM_HEIGHT + MARGIN, lineHeight: ITEM_HEIGHT };
item.children = item.children.map((child) => calculateTreeItemHeight(child, isEdit));
item.height = item.children.reduce((prev, curr) => prev + curr.height, 0);
return item;
```

需要注意此时的高度是包括了最后一个子节点的 marginBottom，如下图
![Untitled](/blog/imgs/andOr/Untitled%205.png)

#### 计算每个节点的连线高度

连线高度为 firstNodeLineHeight + 中间节点高度 + lastNodeLineHeight

- 如果是最后一个条件节点
  lineHeight = 块级高度 - MARGIN - ITEM_HEIGHT/2 - ITEM_HEIGHT/2
  ![Untitled](/blog/imgs/andOr/Untitled%206.png)

- 如果不是最后一个条件节点，需要根据其子节点在做计算
  ![Untitled](/blog/imgs/andOr/Untitled%207.png)

对于上述这种情况，我们需要递归计算当前条件节点的第一个节点应该减去的高度和最后节点应该减去的高度(蓝色部分)

```js
const firstNodeLineHeight = firstNode.height - getNodeReduceHeight(item, true);
const lastNodeLineHeight =
  lastNode.height - MARGIN - getNodeReduceHeight(item, false);

// 如果是普通节点，返回值为 ITEM_HEIGHT / 2
// 如果是条件节点，返回值 currentNode.lineHeight /2 + getNodeReduceHeight(currentNode, isFirst)。需要递归遍历对应的节点算出总共要减去的高度

const getNodeReduceHeight = (item: IFilterValue<T>, isFirst) => {
  const currentNode = isFirst
    ? item?.children?.[0]
    : item?.children?.[item?.children?.length - 1];
  if (!currentNode) return ITEM_HEIGHT / 2;
  const currentNodeIsCondition = isCondition(currentNode);
  if (currentNodeIsCondition) {
    return (
      currentNode.lineHeight / 2 + getNodeReduceHeight(currentNode, isFirst)
    );
  }
  return ITEM_HEIGHT / 2;
};
```

### 添加新内容

![Untitled](/blog/imgs/andOr/Untitled%208.png)

- 最外层的添加(红色按钮)
  - 直接操作当前层级(最外层)的 children，添加一组 INIT_ROW_VALUES
- 嵌套层的最下添加按钮(黄色)
  - 获取到当前层的 children，添加一组 INIT_ROW_VALUES
- 嵌套层的每一行添加按钮(紫色)
  - 会新增一个嵌套关系

```js
// 根据点击的按钮，来获取相关的 Node，对于红色/黄色按钮来说获取当前层级 Node
function finRelationNode(parentData, targetKey, needCurrent) {
  if (parentData.key === targetKey) return parentData;
  if (!parentData.children?.length) return null;
  for (let i = 0; i < parentData.children.length; i++) {
    const child = parentData.children[i];
    if (child.key === targetKey) return needCurrent ? child : parentData;
    const parent = finRelationNode(child, targetKey, needCurrent);
    if (parent) return parent;
  }
}

const handleAddCondition = (keyObj: { key: string, isOut?: boolean }) => {
  const cloneData = clone(value);
  const appendNode = finRelationNode(cloneData, keyObj.key, keyObj.isOut);
  addCondition(appendNode, keyObj, initRowValues);
  onChange(cloneData);
};

const addCondition = (
  treeNode: any,
  keyObj: { key: string, isOut?: boolean },
  initRowValue: T,
) => {
  const key = keyObj.key;
  if (keyObj.isOut)
    return treeNode.children.push(
      Object.assign(
        {},
        { formValues: initRowValue },
        { key: shortId(), level: treeNode.level },
      ),
    );
  const children = treeNode?.children;
  if (!children) {
    const newNode = {
      key: treeNode.key,
      level: treeNode.level + 1,
      type: ROW_PERMISSION_RELATION.AND,
      children: [
        {
          formValues: treeNode.formValues,
          key: shortId(),
          level: treeNode?.level + 1,
        },
        {
          formValues: initRowValue,
          key: shortId(),
          level: treeNode?.level + 1,
        },
      ],
    };
    delete treeNode.formValues;
    Object.assign(treeNode, newNode);
    return;
  }
  for (let i = 0; i < children.length; i += 1) {
    if (children[i].key !== key) continue;
    if (treeNode?.level <= maxLevel) {
      children[i] = {
        key: children[i].key,
        type: ROW_PERMISSION_RELATION.AND,
        level: treeNode?.level + 1,
        children: [
          Object.assign({}, children[i], {
            key: shortId(),
            level: treeNode?.level + 1,
          }),
          Object.assign(
            {},
            { formValues: initRowValue },
            {
              key: shortId(),
              level: treeNode?.level + 1,
            },
          ),
        ],
      };
    }
  }
};
```

### 点击删除内容

![Untitled](/blog/imgs/andOr/Untitled%209.png)

- 点击紫色按钮，第二个条件节点只剩一个 children，需要删除第二个条件节点，且重新计算每一行的层级
- 点击黄色按钮，当前条件节点的 children 删除一行数据

```js
const deleteCondition = (parentData, key: string) => {
  let parentDataTemp = parentData;
  parentDataTemp.children = parentDataTemp.children.filter(
    (item) => item.key !== key,
  );
  if (parentDataTemp.children.length === 1) {
    const newChild = updateLevel(parentDataTemp.children[0]);
    const key = parentDataTemp.key;
    delete parentDataTemp.children;
    delete parentDataTemp.type;
    parentDataTemp = Object.assign(parentDataTemp, newChild, {
      key,
    });
  }
};

const updateLevel = (node) => {
  let newChildren;
  if (node.children)
    newChildren = node.children.map((element) => updateLevel(element));
  const newNode = { ...node, children: newChildren, level: node.level - 1 };
  return newNode;
};
```

### 切换条件节点

获取到当前层级的节点，改变对应的 type 值

```js
const handleChangeCondition = (key, type) => {
  const cloneData = clone(ruleData);
  const changeNode = finRelationNode(cloneData, key, true);
  changeNode.type =
    type === ROW_PERMISSION_RELATION.AND
      ? ROW_PERMISSION_RELATION.OR
      : ROW_PERMISSION_RELATION.AND;
  setRuleData(cloneData);
};
```
