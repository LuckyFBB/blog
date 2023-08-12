---
title: Base64 产生的思考
group:
  title: 编码
  order: 2
order: 0
---

<style>
    .link {
        margin-top: 16px;
        padding: 4px 12px 4px 10px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-left: 5px solid #F8CBA6;
        background-color: #FFFBEB;
    }
    .foreword{
        padding: 12px 12px 12px 16px;
        background-color: #ECF9FF;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-left: 5px solid #439dd3;
    }
    .quote {
        background-color: #FFE7CC;
        padding: 10px;
        border-radius: 8px;
        font-weight: 500;
    }
</style>

## 什么是编码

编码，是信息从一种形式转变为另一种形式的过程，简要来说就是语言的翻译。

将机器语言(二进制)转变为自然语言。

## 五花八门的编码

### ASCII 码

ASCII 码是一种字符编码标准，用于将数字、字母和其他字符转换为计算机可以理解的二进制数。

它最初是由美国信息交换标准所制定的，它包含了 128 个字符，其中包括了数字、大小写字母、标点符号、控制字符等等。

在计算机中一个字节可以表示 256 众不同的状态，就对应 256 字符，从 0000000 到 11111111。ASCII 码一共规定了 128 字符，所以只需要占用一个字节的后面 7 位，最前面一位均为 0，所以 ASCII 码对应的二进制位 00000000 到 01111111。

![Untitled](https://user-images.githubusercontent.com/38368040/222965840-df5e6a11-2191-40e0-b62a-55fb09635206.png)

### 非 ASCII 码

当其他国家需要使用计算机显示的时候就无法使用 ASCII 码如此少量的映射方法。因此技术革新开始啦。

- GB2312

  收录了 6700+的汉字，使用两个字节作为编码字符集的空间

- GBK

  GBK 在保证不和 GB2312/ASCII 冲突的情况下，使用两个字节的方式编码了更多的汉字，达到了 2w

- GB18030

## 全面统一的 Unicode

面对五花八门的编码方式，同一个二进制数会被解释为不同的符号，如果使用错误的编码的方式去读区文件，就会出现乱码的问题。

那能否创建一种编码能够将所有的符号纳入其中，每一个符号都有唯一对应的编码，那么乱码问题就会消失。因此 Unicode 借此机会统一江湖。

Unicode 最常用的就是使用两个字节来表示一个字符(如果是更为偏僻的字符，可能所需字节更多)。现代操作系统都直接支持 Unicode。

<div class="quote">Unicode 和 ASCII 的区别</div>

- ASCII 编码通常是一个字节，Unicode 编码通常是两个字节

  字母 A 用 ASCII 编码十进制为 65，二进制位 01000001；而在 Unicode 编码中，需要在前面全部补 0，即为 0000000 01000001

- 问题产生了，虽然使用 Unicode 解决乱码的问题，但是为纯英文的情况，存储空间会大一倍，传输和存储都不划算。

## 问题对应的解决方案之 UTF-8

本着节约的精神，又出现了把 Unicode 编码转为可变长编码的 UTF-8。可以根据不同字符而变化字节长度，使用 1~4 字节表示一个符号。UTF-8 是 Unicode 的实现方式之一。

### UTF-8 的编码规则

1. 对于单字节的符号，字节的第一位设置为 0，后面七位为该字符的 Unicode 码。因此对于英文字母，UTF-8 编码和 ASCII 编码是相同的。
2. 对于 n 字节的符号，第一个字节的前 n 位都是 1，第 n+1 位为 0，后面的字节的前两位均为 10。剩下的位所填充的二进制就是这个字符的 Unicode 码

对应的编码表格

```
Unicode 符号范围                      ｜     UTF-8 编码方式
0000 0000-0000 007F  (0-127)               0xxxxxxx
0000 0080-0000 07FF  (128-2047)            110xxxxx 10xxxxxx
0000 0800-0000 FFFF  (2048-65535)          1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF  (65536往上)            1111xxxx 10xxxxxx 10xxxxxx 10xxxxxxx
```

在 Unicode 对应表中查找到“杪”所在的位置，以及其对应的十六进制 676A，对应的十进制为 26474(110011101101010)，对应三个字节 1110xxxx 10xxxxxx 10xxxxxx

将`110011101101010`的最后一个二进制依次填充到`1110xxxx 10xxxxxx 10xxxxxx`从后往前的 x ，多出的位补 0 即可，中，得到`11100110 10011101 10101010` ，转换得到`39a76a`，即是杪字对应的 UTF-8 的编码

![Untitled 1](https://user-images.githubusercontent.com/38368040/222965781-243c58fc-94a0-45a9-8d35-5bc13f2fa812.png)

## 问题对应的解决方案之 UTF-16

在 Unicode 编码中，最常用的字符是 0-65535，UTF-16 将 0–65535 范围内的字符编码成 2 个字节，超过这个的用 4 个字节编码

### UTF-16 编码规则

1. 对于 Unicode 码小于  0x10000  的字符， 使用  2  个字节存储，并且是直接存储 Unicode 码，不用进行编码转换
2. 对于 Unicode 码在  0x10000  和  0x10FFFF  之间的字符，使用  4  个字节存储，这  4  个字节分成前后两部分，每个部分各两个字节，其中，前面两个字节的前  6  位二进制固定为  110110，后面两个字节的前 6 位二进制固定为  110111，前后部分各剩余 10 位二进制表示符号的 Unicode 码 减去  0x10000  的结果
3. 大于  0x10FFFF  的 Unicode 码无法用 UTF-16 编码

对应的编码表格

```
Unicode 符号范围                   |     具体Unicode码                ｜     UTF-16 编码方式                         ｜   字节
0000 0000-0000 FFFF  (0-65535)    |     xxxxxxxx xxxxxxxx           ｜     xxxxxxxx xxxxxxxx                      |   2字节
0001 0000-0010 FFFF  (65536往上)   |     yy yyyyyyyy xx xxxxxxxx     |     110110yy yyyyyyyy 110111xx xxxxxxxx     |   4字节
```

“杪”字的 Unicode 码为 676A(26474)，小于 65535，所以对应的 UTF-16 编码也为 676A

找一个大于 0x10000 的字符，[0x1101F](https://symbl.cc/cn/1101F/)，进行 UTF-16 编码

![Untitled 2](https://user-images.githubusercontent.com/38368040/222965808-29da0d8d-5b35-4caa-aac6-3f5592a6701e.png)

## 字节序

字节序就是字节之间的顺序，当传输或者存储时，如果超过一个字节，需要指定字节间的顺序。

最小编码单元是多字节才会有字节序的问题存在，UTF-8 最小编码单元是一个字节，所以它是没有字节序的问题，UTF-16 最小编码单元是两个个字节，在解析一个 UTF-16 字符之前，需要知道每个编码单元的字节序。

比如：前面提到过，"杪"字的 Unicode 码是  676A，"橧"字的 Unicode 码是 6A67，当我们收到一个 UTF-16 字节流  676A 时，计算机如何识别它表示的是字符  "杪"还是 字符  "橧"呢 ?

对于多字节的编码单元需要有一个标识显式的告诉计算机，按着什么样的顺序解析字符，也就是字节序。

- 大端字节序(Big-Endian)，表示高位字节在前面，低位字节在后面。高位字节保存在内存的低地址端，低位字节保存在在内存的高地址端。
- 小端字节序(Little-Endian)，表示低位字节在前，高位字节在后面。高位字节保存在内存的高地址端，而低位字节保存在内存的低地址端。

![Untitled 3](https://user-images.githubusercontent.com/38368040/222965864-e980f3ce-0916-437f-a1c8-d3b8f07ca805.png)

### 简单聊聊 ArrayBuffer 和 \***\*TypedArray、DataView\*\***

![Untitled 4](https://user-images.githubusercontent.com/38368040/223735182-548576bf-a071-4e65-94ef-09ccb50e12e8.png)

- ArrayBuffer

  ArrayBuffer 是一段存储二进制的内存，是字节数组。

  它不能够被直接读写，需要创建**视图**来对它进行操作，指定具体格式操作二进制数据。

  可以通过它创建连续的内存区域，参数是内存大小(byte)，默认初始值都是 0

- TypedArray

  ArrayBuffer 的一种操作视图，数据都存储到底层的 ArrayBuffer 中

  ```js
  const buf = new ArrayBuffer(8);
  const int8Array = new Int8Array(buf);
  int8Array[3] = 44;
  const int16Array = new Int16Array(buf);
  int16Array[0] = 42;
  console.log(int16Array); // [42, 11264, 0, 0]
  console.log(int8Array); // [42, 0, 0, 44, 0, 0, 0, 0]
  ```

  使用 int8 和 int16 两种方式新建的视图是相互影响的，都是直接修改的底层 buffer 的数据

- DataView

  DataView 是另一种操作视图，并且支持设置字节序

  ```js
  const buf = new ArrayBuffer(24);
  const dataview = new DataView(buf);
  dataView.setInt8(1, 3000, true); // 小端序
  ```

### 明确电脑的字节序

上述讲到，在存储多字节的时候，我们会采用不同的字节序来做存储。那对我们的操作系统来说是有一种默认的字节序的。下面就用上述知识来明确 MacOS 的默认字节序。

```js
function isLittleEndian() {
  const buf = new ArrayBuffer(2);
  const view = new DataView(buf);
  view.setInt16(0, 1);
  console.log(new Int8Array(buf));
  const int16Array = new Int16Array(buf);
  return int16Array[0] === 256;
}

console.log(isLittleEndian());
```

通过上诉代码我们可以得出此款 MacOS 是小端序列存储

一个 🌰

```js
const buffer = new ArrayBuffer(8);
const int8Array = new Int8Array(buffer);
int8Array[0] = 30;
int8Array[1] = 41;

const dataView = new DataView(buffer);
dataView.setInt16(2, 256, true);
const int16Array = new Int16Array(buffer);
console.log(int16Array); // [10526, 526, 0, 0]
int16Array[0] = 256;
const int8Array1 = new Int8Array(buffer);
console.log(int8Array1);
```

<div class="quote">虽然 TypedArray 无法指定字节序，但是在存储的时候采用操作系统默认的字节序。所以当我们设置 int16Array[0] = 256 时，内存中存储的为 00 01</div>

![Untitled 5](https://user-images.githubusercontent.com/38368040/223735133-b3bc5ab7-ba7d-4177-b65d-4e113fe46ff4.png)
