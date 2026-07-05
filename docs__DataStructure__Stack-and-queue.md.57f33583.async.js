"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[9240],{27024:function(o,u,e){e.r(u);var s=e(72269),a=e(93359),d=e(82478),i=e(61452),m=e(96057),h=e(88550),_=e(2138),l=e(87046),r=e(67294),t=e(99842),n=e(85893);function c(){return(0,n.jsx)(_.dY,{children:(0,n.jsx)(r.Suspense,{fallback:(0,n.jsx)(l.Z,{}),children:(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"markdown",children:[(0,n.jsx)("p",{children:t.texts[0].value}),(0,n.jsx)("p",{children:t.texts[1].value}),(0,n.jsxs)("h4",{id:"\u6808\u7684\u521B\u5EFA",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u6808\u7684\u521B\u5EFA",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u6808\u7684\u521B\u5EFA"]}),(0,n.jsx)(i.Z,{lang:"js",children:t.texts[2].value}),(0,n.jsxs)("h4",{id:"\u961F\u5217\u7684\u521B\u5EFA",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u961F\u5217\u7684\u521B\u5EFA",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u961F\u5217\u7684\u521B\u5EFA"]}),(0,n.jsx)(i.Z,{lang:"js",children:t.texts[3].value}),(0,n.jsxs)("h4",{id:"\u4F18\u5148\u961F\u5217",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F18\u5148\u961F\u5217",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u4F18\u5148\u961F\u5217"]}),(0,n.jsx)("p",{children:t.texts[4].value}),(0,n.jsx)(i.Z,{lang:"js",children:t.texts[5].value}),(0,n.jsxs)("h4",{id:"\u5FAA\u73AF\u961F\u5217",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5FAA\u73AF\u961F\u5217",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u5FAA\u73AF\u961F\u5217"]}),(0,n.jsx)("p",{children:t.texts[6].value}),(0,n.jsx)(i.Z,{lang:"js",children:t.texts[7].value})]})})})})}u.default=c},61452:function(o,u,e){var s=e(25212),a=e(93958),d=e(1320),i=e(85893),m=function(_){var l=_.children,r=_.lang,t=(0,d.HX)(function(n){return n.siteData.themeConfig.syntaxTheme});return(0,i.jsx)(s.f,{children:(0,i.jsx)(a.oP,{syntaxThemes:t,language:r,children:l})})};u.Z=m},99842:function(o,u,e){e.r(u),e.d(u,{texts:function(){return s}});const s=[{value:"\u6808\u662F\u4E00\u79CD\u9075\u4ECE\u540E\u8FDB\u5148\u51FA\uFF08LIFO\uFF09\u539F\u5219\u7684\u6709\u5E8F\u96C6\u5408\u3002\u65B0\u6DFB\u52A0\u7684\u6216\u5F85\u5220\u9664\u7684\u5143\u7D20\u90FD\u4FDD\u5B58\u5728\u6808\u7684\u672B\u5C3E\uFF0C\u79F0\u4F5C\u6808\u9876\uFF0C\u53E6\u4E00\u7AEF\u5C31\u53EB\u6808\u5E95\u3002\u5728\u6808\u91CC\uFF0C\u65B0\u5143\u7D20\u90FD\u9760\u8FD1\u6808\u9876\uFF0C\u65E7\u5143\u7D20\u90FD\u63A5\u8FD1\u6808\u5E95\u3002",paraId:0},{value:"\u961F\u5217\u662F\u9075\u5FAA FIFO\uFF08First In First Out\uFF0C\u5148\u8FDB\u5148\u51FA\uFF0C\u4E5F\u79F0\u4E3A\u5148\u6765\u5148\u670D\u52A1\uFF09\u539F\u5219\u7684\u4E00\u7EC4\u6709\u5E8F\u7684\u9879\u3002\u961F\u5217\u5728\u5C3E\u90E8\u6DFB\u52A0\u65B0\u5143\u7D20\uFF0C\u5E76\u4ECE\u9876\u90E8\u79FB\u9664\u5143\u7D20\u3002\u6700\u65B0\u6DFB\u52A0\u7684\u5143\u7D20\u5FC5\u987B\u6392\u5728\u961F\u5217\u7684\u672B\u5C3E\u3002",paraId:1},{value:`function Stack() {
  var items = [];
  this.push = function (elememt) {
    //\u8D1F\u8D23\u5F80\u6808\u91CC\u6DFB\u52A0\u65B0\u5143\u7D20\uFF0C\u8BE5\u65B9\u6CD5\u53EA\u6DFB\u52A0\u5143\u7D20\u5230\u6808\u9876
    items.push(elememt);
  };
  this.pop = function () {
    //\u7528\u6765\u79FB\u9664\u6808\u91CC\u7684\u5143\u7D20\uFF0C\u6808\u9075\u4ECELIFO\u539F\u5219\uFF0C\u79FB\u51FA\u7684\u662F\u6700\u540E\u6DFB\u52A0\u8FDB\u53BB\u7684\u5143\u7D20
    return items.pop();
  };
  this.peek = function () {
    //\u8FD4\u56DE\u6808\u9876\u5143\u7D20
    return items[items.length - 1];
  };
  this.isEmpty = function () {
    //\u5224\u65AD\u6808\u662F\u5426\u4E3A\u7A7A
    return items.length === 0;
  };
  this.size = function () {
    //\u8FD4\u56DE\u6808\u7684\u5927\u5C0F
    return items.length;
  };
  this.clear = function () {
    //\u7528\u6765\u79FB\u9664\u6808\u91CC\u6240\u6709\u7684\u5143\u7D20\uFF0C\u628A\u6808\u6E05\u7A7A
    items = [];
  };
}
`,paraId:2,tocIndex:0},{value:`function Queue() {
  var items = [];
  this.enqueue = function (element) {
    //\u8FD9\u4E2A\u65B9\u6CD5\u8D1F\u8D23\u5411\u961F\u5217\u6DFB\u52A0\u65B0\u5143\u7D20\uFF0C\u65B0\u7684\u9879\u53EA\u80FD\u6DFB\u52A0\u5230\u961F\u5217\u672B\u5C3E
    items.push(element);
  };
  this.dequeue = function () {
    //\u8D1F\u8D23\u4ECE\u961F\u5217\u79FB\u9664\u9879\uFF0C\u7531\u4E8E\u961F\u5217\u9075\u5FAA\u5148\u8FDB\u5148\u51FA\u539F\u5219\uFF0C\u5148\u6DFB\u52A0\u7684\u9879\u4E5F\u662F\u6700\u5148\u88AB\u79FB\u9664\u7684
    return items.shift();
  };
  this.front = function () {
    //\u4F1A\u8FD4\u56DE\u961F\u5217\u6700\u524D\u9762\u7684\u9879
    return items[0];
  };
  this.isEmpty = function () {
    //\u5224\u65AD\u961F\u5217\u662F\u5426\u4E3A\u7A7A
    return items.length == 0;
  };
  this.clear = function () {
    //\u6E05\u7A7A\u961F\u5217
    items = [];
  };
  this.size = function () {
    //\u8FD4\u56DE\u961F\u5217\u7684\u5927\u5C0F
    return items.length;
  };
}
`,paraId:3,tocIndex:1},{value:"\u5143\u7D20\u7684\u6DFB\u52A0\u548C\u5220\u9664\u57FA\u4E8E\u4F18\u5148\u7EA7\u7684\u3002",paraId:4,tocIndex:2},{value:`function PriorityQueue() {
  var items = [];
  function QueueElement(element, priority) {
    //\u8981\u6DFB\u52A0\u7684\u5143\u7D20\u548C\u5143\u7D20\u7684\u4F18\u5148\u7EA7
    this.element = element;
    this.priority = priority;
  }
  this.enqueue = function (element, priority) {
    var queueElement = new QueueElement(element, priority);
    if (this.isEmpty) {
      //\u5F53\u961F\u5217\u4E3A\u7A7A\u7684\u65F6\u5019\uFF0C\u76F4\u63A5\u6DFB\u52A0\u5143\u7D20
      item.push(queueElement);
    } else {
      var added = false;
      for (var i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) {
          //\u6DFB\u52A0\u5143\u7D20\u7684\u4F18\u5148\u7EA7\u548C\u5DF2\u6709\u5143\u7D20\u7684\u4F18\u5148\u7EA7\u7684\u6BD4\u8F83
          items.splice(i, 0, queueElement); //\u63D2\u5165\u5143\u7D20
          added = true;
          break;
        }
      }
      if (!added) {
        //\u5224\u65AD\u662F\u5426\u6DFB\u52A0\uFF0C\u5982\u679C\u6CA1\u6709\u7684\u8BDD\uFF0C\u8BF4\u660E\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u653E\u5230\u6700\u540E
        items.push(queueElement);
      }
    }
  };

  //\u5176\u4ED6\u65B9\u6CD5\u548C\u666E\u901A\u961F\u5217\u5B9E\u73B0\u662F\u4E00\u6837\u7684
}
`,paraId:5,tocIndex:2},{value:"\u5FAA\u73AF\u961F\u5217\u7684\u4E00\u4E2A\u4F8B\u5B50\u5C31\u662F\u51FB\u9F13\u4F20\u82B1\u6E38\u620F\uFF08HotPotato\uFF09\u3002\u5728\u8FD9\u4E2A\u6E38\u620F\u4E2D\uFF0C\u5B69\u5B50\u4EEC\u56F4\u6210\u4E00\u4E2A\u5706\u5708\uFF0C\u628A\u82B1\u5C3D\u5FEB\u5730\u4F20\u9012\u7ED9\u65C1\u8FB9\u7684\u4EBA\u3002\u67D0\u4E00\u65F6\u523B\u4F20\u82B1\u505C\u6B62\uFF0C\u8FD9\u4E2A\u65F6\u5019\u82B1\u5728\u8C01\u624B\u91CC\uFF0C\u8C01\u5C31\u9000\u51FA\u5706\u5708\u7ED3\u675F\u6E38\u620F\u3002\u91CD\u590D\u8FD9\u4E2A\u8FC7\u7A0B\uFF0C\u76F4\u5230\u53EA\u5269\u4E00\u4E2A\u5B69\u5B50\uFF08\u80DC\u8005\uFF09\u3002",paraId:6,tocIndex:3},{value:`function hotPotato(nameList, num) {
  var queue = new queue(); //\u57FA\u672C\u961F\u5217
  nameList.forEach((item) => queue.enqueue(item)); //\u628A\u6570\u636E\u653E\u5230\u961F\u5217\u91CC\u9762
  var eliminated = ''; //\u521D\u59CB\u5316\u6DD8\u6C70\u8005\u7684\u540D\u5B57
  while (queue.size() > 1) {
    //\u5F53\u961F\u5217\u91CC\u8FD8\u6709\u4E24\u4E2A\u53CA\u5176\u4EE5\u4E0A\u7684\u5143\u7D20
    for (var i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); //\u4ECE\u961F\u5217\u5F00\u5934\u79FB\u9664\u4E00\u9879\uFF0C\u518D\u5C06\u5176\u6DFB\u52A0\u5230\u961F\u5217\u672B\u5C3E
    }
    eliminated = queue.dequeue(); //\u5904\u4E8E\u961F\u5217\u9996\u4F4D\u7684\u5C31\u662F\u6DD8\u6C70\u8005
    console.log('\u8FD9\u6B21\u6DD8\u6C70\u7684\u4EBA\uFF1A' + eliminated);
  }
  return queue.dequeue(); //\u8FD4\u56DE\u6E38\u620F\u7684\u80DC\u5229\u8005
}
`,paraId:7,tocIndex:3}]}}]);
