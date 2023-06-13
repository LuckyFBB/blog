---
title: Node 中的文件模块
group: Node
order: 993
---

## 前言

在聊 Stream/Buffer 的时候，我们已经开始使用`require("fs")`引入文件模块做一些操作了

文件模块是对底层文件操作的封装，例如文件读写/打开关闭/删除添加等等

文件模块最大的特点就是所有的方法都提供的**同步**和**异步**两个版本，具有 sync 后缀的方法都是同步方法，没有的都是异步方法

## 文件常识

### 文件权限

因为需要对文件进行操作，所以需要设置对应的权限

<img width="800" alt="image" src="https://user-images.githubusercontent.com/38368040/232820773-7c0b3281-5a23-4470-b95d-fce2618046a8.png">

主要分为三种角色，文件所有者、文件所属组、其他用户

文件权限分为读、写、执行，分别于数字表示为 4/2/1，没有权限的时候表示为 0

如果取消了执行权限指，文件夹内任何文件都无法访问，也无法 cd 到文件夹

使用 Linux 命令`ll`能够查看目录中文件/文件夹的权限

<img width="800" alt="image" src="https://user-images.githubusercontent.com/38368040/232820672-b4bcf6ce-8774-4e36-9852-6278ea3c2208.png">

第一位 d 代表文件夹，- 表示文件，后面就是文件的权限

@ 符号出现在文件权限字符串的末尾，标识文件具有扩展属性。可以通过`ls -l@`来查看该目录的扩展属性，用于为文件或者目录添加的额外的元数据信息。

<img width="800" alt="image" src="https://github.com/LuckyFBB/Front-End-Examples/assets/38368040/7bbc00de-738e-4c98-80a4-c03369e17cc9">

### 文件标识

在 Node 中，标识位代表着对文件的操作方式，可读/可写/即可读又可写等等，可以进行排列组合

<img width="800" alt="image" src="https://github.com/LuckyFBB/Front-End-Examples/assets/38368040/f9f888d9-a7e5-49db-8153-080cda390f5f">

标识位可以进行排列组合，以实现不同的文件操作行为。

例如，'w+' 表示以可读可写模式打开文件，如果文件不存在则创建文件，如果文件已存在则清空文件内容。

'a+' 表示以可读可写模式打开文件，如果文件不存在则创建文件，如果文件已存在则在文件末尾追加内容。

### 文件描述符

在之前的内容中讲过，操作系统会为每个打开的文件分配一个叫做文件描述符的数值标识，使用这些数值来追踪特定的文件。

文件描述符一般从 3 开始，0/1/2 分别代表标准输入/标准输出/错误输出

## 常用 API

![Untitled 3](https://user-images.githubusercontent.com/38368040/232820936-5a580710-b4eb-414d-a31f-22f415411abc.png)

![Untitled 4](https://user-images.githubusercontent.com/38368040/232821053-c079f89b-c5d5-4852-bb28-f17059ac13a4.png)

![Untitled 5](https://user-images.githubusercontent.com/38368040/232821065-1cf9af48-b027-4241-a292-635b1f80368f.png)

## 一些实践

### 过滤项目中适当的文件

![Untitled 6](https://user-images.githubusercontent.com/38368040/232821159-8d0bd0a8-58c5-403c-a31a-6494a82256c0.png)

### 文件拷贝

问题：需要将文件 1 中的内容拷贝到文件 2 中

**文件 API**

可以使用 fs.readFile 把文件内容读取完成，再采用 fs.writeFile 写入新的文件

![Untitled 7](https://user-images.githubusercontent.com/38368040/232821168-2e732b28-2ad4-40fb-8b27-36b86992c5da.png)

🤔 这样是否存在问题，我们在 Stream 讲过，需要一点一点来，否则在大文件时内存吃不消。

**Buffer 使用**

使用 fs.open 方法打开文件，获得文件描述符，再调用 fs.read/fs.write 方法往特定的位置读写一定量的数据
![Untitled 8](https://user-images.githubusercontent.com/38368040/232821177-63d55aa4-e626-4f1c-84a7-c1ddcc2a4049.png)

**Stream 使用**

![Untitled 9](https://user-images.githubusercontent.com/38368040/232821353-8bd4a708-7ed4-460f-93e4-0920762b4128.png)

### 文件上传

#### 小文件上传

```js
// 上传后资源的URL地址
const RESOURCE_URL = `http://localhost:${PORT}`;
// 存储上传文件的目录
const UPLOAD_DIR = path.join(__dirname, '../public');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // 设置文件的存储目录
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // 设置文件名
    cb(null, `${file.originalname}`);
  },
});

const multerUpload = multer({ storage });

router.post(
  '/uploadSingle',
  async (ctx, next) => {
    try {
      await next();
      ctx.body = {
        code: 1,
        msg: '文件上传成功',
        url: `${RESOURCE_URL}/${ctx.file.originalname}`,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 0,
        msg: '文件上传失败',
      };
    }
  },
  multerUpload.single('file'),
);
```

#### 大文件上传

![Untitled 10](https://user-images.githubusercontent.com/38368040/232821366-d03fa5b7-93d7-45c3-884f-8e5698a96c4c.png)

**主要步骤**

1. 前端接收大文件，并进行切片处理
2. 将每份切片进行上传处理
3. 后端接收到所有的切片，存储所有切片到一个文件夹中
4. 将文件夹中的切片做合并，并对切片做删除
5. 再次上传统一文件时，能够快速上传

**具体实现**

1. 前端切片

   ```js
   const BIG_FILE_SIZE = 25 * 1024 * 1024;
   const SLICE_FILE_SIZE = 5 * 1024 * 1024;

   const uploadFile = async () => {
     if (!fileList?.length) return alert('请选择文件');
     const file = fileList[0];
     const shouldUpload = await verifyUpload(file.name);
     if (!shouldUpload) return message.success('文件已存在，上传成功');
     if (file.size > BIG_FILE_SIZE) {
       // big handle
       getSliceList(file);
     }
     // // normal handle
     // upload("/uploadSingle", file);
   };
   const getSliceList = (file: RcFile) => {
     const sliceList: ISlice[] = [];
     let curSize = 0;
     let index = 0;
     while (curSize < file.size) {
       sliceList.push({
         id: shortid.generate(),
         slice: new File(
           [file.slice(curSize, (curSize += SLICE_FILE_SIZE))],
           `${file.name}-${index}`,
         ),
         name: file.name,
         sliceName: `${file.name}-${index}`,
         progress: 0,
       });
       index++;
     }
     uploadSlice(sliceList);
     setSliceList(sliceList);
   };
   ```

   file 是一种特殊的 [Blob 对象](https://zhuanlan.zhihu.com/p/161000123)，可以使用 slice 进行大文件分割

   ![Untitled 11](https://user-images.githubusercontent.com/38368040/232821371-1a679343-4ea6-4b83-9e05-4482b5a05f41.png)

2. 上传切片

   ```tsx
   const uploadSlice = async (sliceList: ISlice[]) => {
     const requestList = sliceList
       .map(({ slice, sliceName, name }: ISlice, index: number) => {
         const formData = new FormData();
         formData.append('slice', slice);
         formData.append('sliceName', sliceName);
         formData.append('name', name);
         return { formData, index, sliceName };
       })
       .map(({ formData }: { formData: FormData }, index: number) =>
         request.post('/uploadBig', formData, {
           onUploadProgress: (progressEvent: AxiosProgressEvent) =>
             sliceUploadProgress(progressEvent, index),
         }),
       );
     await Promise.all(requestList);
   };
   ```

   根据切片构建每个切片的 formData，将二进制数据放在 slice 参数中，分别发送请求。

   onUploadProgress 来处理每个切片的上传进度

   ```js
   // Client
   const storage = multer.diskStorage({
     destination: async function (req, file, cb) {
       const name = file?.originalname.split('.')?.[0];
       const SLICE_DIR = path.join(UPLOAD_DIR, `${name}-slice`);
       if (!fs.existsSync(SLICE_DIR)) {
         await fs.mkdirSync(SLICE_DIR);
       }
       // 设置文件的存储目录
       cb(null, SLICE_DIR);
     },
     filename: async function (req, file, cb) {
       // 设置文件名
       cb(null, `${file?.originalname}`);
     },
   });

   // Server
   router.post(
     '/uploadBig',
     async (ctx, next) => {
       try {
         await next();
         const slice = ctx.files.slice[0]; // 切片文件
         ctx.body = {
           code: 1,
           msg: '文件上传成功',
           url: `${RESOURCE_URL}/${slice.originalname}`,
         };
       } catch (error) {
         ctx.body = {
           code: 0,
           msg: '文件上传失败',
         };
       }
     },
     multerUpload.fields([{ name: 'slice' }]),
   );
   ```

3. 切片合并

   当我们所有的切片上传成功之后，我们依旧希望是按着原始文件作为保存的，所以需要对切片进行合并操作

   ```js
   // Client
   const uploadSlice = async (sliceList: ISlice[]) => {
     // ...和上述 uploadSlice 一致
     mergeSlice();
   };

   const mergeSlice = () => {
     request.post('/mergeSlice', {
       size: SLICE_FILE_SIZE,
       name: fileList[0].name,
     });
   };

   // Server
   router.post('/mergeSlice', async (ctx, next) => {
     try {
       await next();
       const { size, name } = ctx.request.body ?? {};
       const sliceName = name.split('.')?.[0];
       const filePath = path.join(UPLOAD_DIR, name);
       const slice_dir = path.join(UPLOAD_DIR, `${sliceName}-slice`);
       await mergeSlice(filePath, slice_dir, size);
       ctx.body = {
         code: 1,
         msg: '文件合并成功',
       };
     } catch (error) {
       ctx.body = {
         code: 0,
         msg: '文件合并失败',
       };
     }
   });

   // 通过 stream 来读写数据，将 slice 中数据读取到文件中
   const pipeStream = (path, writeStream) => {
     return new Promise((resolve) => {
       const readStream = fs.createReadStream(path);
       readStream.on('end', () => {
         fs.unlinkSync(path); // 读取完成之后，删除切片文件
         resolve();
       });
       readStream.pipe(writeStream);
     });
   };

   const mergeSlice = async (filePath, sliceDir, size) => {
     if (!fs.existsSync(sliceDir)) {
       throw new Error('当前文件不存在');
     }
     const slices = await fs.readdirSync(sliceDir);
     slices.sort((a, b) => a.split('-')[1] - b.split('-')[1]);
     try {
       const slicesPipe = slices.map((sliceName, index) => {
         return pipeStream(
           path.resolve(sliceDir, sliceName),
           fs.createWriteStream(filePath, { start: index * size }),
         );
       });
       await Promise.all(slicesPipe);
       await fs.rmdirSync(sliceDir); // 读取完成之后，删除切片文件夹
     } catch (error) {
       console.log(error);
     }
   };
   ```

4. 上传文件校验

   当我们上传一个文件的时候，先去判断在服务器上是否存在该文件，如果存在则直接不做上传操作，否则按上述逻辑进行上传

   ```js
   // Client
   const verifyUpload = async (name: string) => {
     const res = await request.post('/verify', { name });
     return res?.data?.data;
   };

   const uploadFile = async () => {
     if (!fileList?.length) return alert('请选择文件');
     const file = fileList[0];
     const shouldUpload = await verifyUpload(file.name);
     if (!shouldUpload) return message.success('文件已存在，上传成功');
     if (file.size > BIG_FILE_SIZE) {
       // big handle
       getSliceList(file);
     }
     // // normal handle
     // upload("/uploadSingle", file);
   };

   // Server
   router.post('/verify', async (ctx, next) => {
     try {
       await next();
       const { name } = ctx.request.body ?? {};
       const filePath = path.resolve(UPLOAD_DIR, name);
       if (fs.existsSync(filePath)) {
         ctx.body = {
           code: 1,
           data: false,
         };
       } else {
         ctx.body = {
           code: 1,
           data: true,
         };
       }
     } catch (error) {
       ctx.body = {
         code: 0,
         msg: '检测失败',
       };
     }
   });
   ```

   上述直接使用文件名来做判断，过于绝对，对文件做了相关修改并不更改名字，就会出现问题。更应该采用的方案是根据文件相关的元数据计算出它的 hash 值来做判断。

   ```js
   const calculateMD5 = (file: any) =>
     new Promise((resolve, reject) => {
       const chunkSize = SLICE_FILE_SIZE;
       const fileReader = new FileReader();
       const spark = new SparkMD5.ArrayBuffer();
       let cursor = 0;
       fileReader.onerror = () => {
         reject(new Error('Error reading file'));
       };
       fileReader.onload = (e: any) => {
         spark.append(e.target.result);
         cursor += e.target.result.byteLength;
         if (cursor < file.size) loadNext();
         else resolve(spark.end());
       };
       const loadNext = () => {
         const fileSlice = file.slice(cursor, cursor + chunkSize);
         fileReader.readAsArrayBuffer(fileSlice);
       };
       loadNext();
     });
   ```
