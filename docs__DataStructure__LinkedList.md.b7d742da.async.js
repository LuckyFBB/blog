"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[5176],{16367:function(s,r,e){e.r(r);var u=e(72269),_=e(93359),a=e(82478),i=e(61452),h=e(96057),c=e(88550),o=e(2138),l=e(87046),d=e(67294),t=e(8614),n=e(85893);function x(){return(0,n.jsx)(o.dY,{children:(0,n.jsx)(d.Suspense,{fallback:(0,n.jsx)(l.Z,{}),children:(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"markdown",children:[(0,n.jsx)("p",{children:t.texts[0].value}),(0,n.jsx)("p",{children:t.texts[1].value}),(0,n.jsxs)("h4",{id:"\u521B\u5EFA\u94FE\u8868",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u521B\u5EFA\u94FE\u8868",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u521B\u5EFA\u94FE\u8868"]}),(0,n.jsx)(i.Z,{lang:"js",children:t.texts[2].value}),(0,n.jsxs)("h4",{id:"\u53CC\u5411\u94FE\u8868",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u53CC\u5411\u94FE\u8868",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"\u53CC\u5411\u94FE\u8868"]}),(0,n.jsx)("p",{children:t.texts[3].value}),(0,n.jsx)("p",{children:t.texts[4].value}),(0,n.jsx)("p",{children:t.texts[5].value}),(0,n.jsx)(i.Z,{lang:"js",children:t.texts[6].value})]})})})})}r.default=x},61452:function(s,r,e){var u=e(25212),_=e(93958),a=e(1320),i=e(85893),h=function(o){var l=o.children,d=o.lang,t=(0,a.HX)(function(n){return n.siteData.themeConfig.syntaxTheme});return(0,i.jsx)(u.f,{children:(0,i.jsx)(_.oP,{syntaxThemes:t,language:d,children:l})})};r.Z=h},8614:function(s,r,e){e.r(r),e.d(r,{texts:function(){return u}});const u=[{value:"\u94FE\u8868\u5B58\u50A8\u6709\u5E8F\u7684\u5143\u7D20\u96C6\u5408\uFF0C\u4F46\u4E0D\u540C\u4E8E\u6570\u7EC4\uFF0C\u94FE\u8868\u4E2D\u7684\u5143\u7D20\u5728\u5185\u5B58\u4E2D\u5E76\u4E0D\u662F\u8FDE\u7EED\u653E\u7F6E\u7684\u3002\u6BCF\u4E2A\u5143\u7D20\u7531\u4E00\u4E2A\u5B58\u50A8\u5143\u7D20\u672C\u8EAB\u7684\u8282\u70B9\u548C\u4E00\u4E2A\u6307\u5411\u4E0B\u4E00\u4E2A\u5143\u7D20\u7684\u5F15\u7528\uFF08\u4E5F\u79F0\u6307\u9488\u6216\u94FE\u63A5\uFF09\u7EC4\u6210\u3002",paraId:0},{value:"\u94FE\u8868\u7684\u4E00\u4E2A\u597D\u5904\u5728\u4E8E\uFF0C\u6DFB\u52A0\u6216\u79FB\u9664\u5143\u7D20\u7684\u65F6\u5019\u4E0D\u9700\u8981\u79FB\u52A8\u5176\u4ED6\u5143\u7D20\u3002\u7136\u800C\uFF0C\u94FE\u8868\u9700\u8981\u4F7F\u7528\u6307\u9488\uFF0C\u56E0\u6B64\u5B9E\u73B0\u94FE\u8868\u65F6\u9700\u8981\u989D\u5916\u6CE8\u610F\u3002\u6570\u7EC4\u7684\u53E6\u4E00\u4E2A\u7EC6\u8282\u662F\u53EF\u4EE5\u76F4\u63A5\u8BBF\u95EE\u4EFB\u4F55\u4F4D\u7F6E\u7684\u4EFB\u4F55\u5143\u7D20\uFF0C\u800C\u8981\u60F3\u8BBF\u95EE\u94FE\u8868\u4E2D\u95F4\u7684\u4E00\u4E2A\u5143\u7D20\uFF0C\u9700\u8981\u4ECE\u8D77\u70B9\u5F00\u59CB\u8FED\u4EE3\u5217\u8868\u76F4\u5230\u627E\u5230\u6240\u9700\u7684\u5143\u7D20\u3002",paraId:1},{value:`function LinkedList() {
  var Node = function (element) {
    this.element = element;
    this.next = null;
  };
  var length = 0;
  var head = null;

  this.append = function (element) {
    //\u5411\u94FE\u8868\u5C3E\u90E8\u6DFB\u52A0\u5143\u7D20
    var node = new Node(element);
    var current;
    if (head === null) {
      //\u5F53\u94FE\u8868\u4E3A\u7A7A\u7684\u65F6\u5019\uFF0C\u76F4\u63A5\u63D2\u5165
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next; //\u627E\u5230\u5F53\u524D\u94FE\u8868\u7684\u6700\u540E\u4E00\u9879
      }
      current.next = node; //\u6700\u540E\u4E00\u9879\u7684next\u6307\u9488\u6307\u5411node
    }
    length++; //\u957F\u5EA6\u52A0\u4E00
  };

  this.removeAt = function (position) {
    //\u5220\u9664\u67D0\u4E00\u4E2A\u4F4D\u7F6E\u7684\u8282\u70B9
    if (position > -1 && position < length) {
      //\u5224\u65AD\u662F\u5426\u8D8A\u754C
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        //\u5220\u9664\u7B2C\u4E00\u4E2A\u8282\u70B9
        head = current.next;
      } else {
        while (index < position) {
          //\u8FED\u4EE3\u94FE\u8868
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next; //previous\u548Ccurrent\u7684\u540E\u7EE7\u8282\u70B9\u8FDE\u63A5\uFF0C\u5220\u9664current
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };

  this.insert = function (position, element) {
    //\u53EF\u4EE5\u5728\u4EFB\u610F\u4F4D\u7F6E\u63D2\u5165\u4E00\u4E2A\u5143\u7D20
    if (position > -1 && position < length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) {
        //\u5224\u65AD\u63D2\u5165\u4F4D\u7F6E\u662F\u5426\u4E3A\u7B2C\u4E00\u4E2A
        node.next = current;
        head = node;
      } else {
        while (index < position) {
          //\u8FED\u4EE3\u94FE\u8868
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.next = current;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  this.toString = function () {
    //\u94FE\u8868\u6309\u7740\u5B57\u7B26\u4E32\u8F93\u51FA
    var current = head;
    var string = '';
    while (current) {
      //\u8FED\u4EE3\u94FE\u8868
      string = current.element;
      current = current.next;
    }
    return string;
  };

  this.indexOf = function (element) {
    //\u67E5\u627E\u8BE5\u503C\u662F\u5426\u5728\u94FE\u8868\u4E2D\u5B58\u5728
    var current = head;
    var index = -1;
    while (current) {
      //\u8FED\u4EE3\u94FE\u8868
      if (current.element === element) {
        //\u627E\u5230\uFF0C\u5219\u8FD4\u56DE\u5F53\u524D\u7D22\u5F15
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };

  this.remove = function (element) {
    //\u5220\u9664\u67D0\u4E2A\u503C
    var index = this.indexOf(element); //\u67E5\u627E\u5230\u5F53\u524D\u503C\u7684\u7D22\u5F15
    return this.removeAt(index); //\u6309\u4F4D\u7F6E\u5220\u9664\u5F53\u524D\u503C
  };

  this.isEmpty = function () {
    //\u5224\u65AD\u5F53\u524D\u94FE\u8868\u662F\u5426\u4E3A\u7A7A
    return length === 0;
  };

  this.size = function () {
    //\u5224\u65AD\u5F53\u524D\u94FE\u8868\u7684\u5927\u5C0F
    return length;
  };

  this.getHead = function () {
    //\u8FD4\u56DE\u94FE\u8868\u5934\u90E8
    return head;
  };
}
`,paraId:2,tocIndex:0},{value:"\u53CC\u5411\u94FE\u8868\u548C\u666E\u901A\u94FE\u8868\u7684\u533A\u522B\u5728\u4E8E\uFF0C\u5728\u94FE\u8868\u4E2D\uFF0C\u4E00\u4E2A\u8282\u70B9\u53EA\u6709\u94FE\u5411\u4E0B\u4E00\u4E2A\u8282\u70B9\u7684\u94FE\u63A5\uFF0C\u800C\u5728\u53CC\u5411\u94FE\u8868\u4E2D\uFF0C\u94FE\u63A5\u662F\u53CC\u5411\u7684\uFF1A\u4E00\u4E2A\u94FE\u5411\u4E0B\u4E00\u4E2A\u5143\u7D20\uFF0C\u53E6\u4E00\u4E2A\u94FE\u5411\u524D\u4E00\u4E2A\u5143\u7D20\u3002",paraId:3,tocIndex:1},{value:"\u53CC\u5411\u94FE\u8868\u63D0\u4F9B\u4E86\u4E24\u79CD\u8FED\u4EE3\u5217\u8868\u7684\u65B9\u6CD5\uFF1A\u4ECE\u5934\u5230\u5C3E\uFF0C\u6216\u8005\u53CD\u8FC7\u6765\u3002\u6211\u4EEC\u4E5F\u53EF\u4EE5\u8BBF\u95EE\u4E00\u4E2A\u7279\u5B9A\u8282\u70B9\u7684\u4E0B\u4E00\u4E2A\u6216\u524D\u4E00\u4E2A\u5143\u7D20\u3002",paraId:4,tocIndex:1},{value:"\u94FE\u8868\u7684\u5B9E\u73B0\uFF1A",paraId:5,tocIndex:1},{value:`function DoublyLinkedList() {
  var Node = function (element) {
    this.element = element;
    this.prev = null; //\u524D\u7EE7\u8282\u70B9
    this.next = null; //\u540E\u7EE7\u8282\u70B9
  };
  var length = 0;
  var head = null;
  var tail = null; //\u7528\u6765\u4FDD\u5B58\u5BF9\u5217\u8868\u6700\u540E\u4E00\u9879\u7684\u5F15\u7528\u7684tail\u5C5E\u6027

  this.insert = function (position, element) {
    //\u63D2\u5165\u8282\u70B9
    if (position >= 0 && position <= length) {
      //\u68C0\u67E5\u662F\u5426\u8D8A\u754C
      var node = new Node(element);
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        //\u5982\u679C\u662F\u5728\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\u63D2\u5165
        if (!head) {
          //\u5982\u679C\u5F53\u524D\u94FE\u8868\u4E3A\u7A7A
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) {
        //\u5982\u679C\u662F\u6700\u540E\u4E00\u4F4D
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index < position) {
          //\u94FE\u8868\u8FED\u4EE3
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function (position) {
    //\u5220\u9664\u4EFB\u610F\u4F4D\u7F6E\u7684\u8282\u70B9
    if (position >= 0 && position <= length) {
      //\u68C0\u67E5\u662F\u5426\u8D8A\u754C
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        //\u5220\u9664\u7B2C\u4E00\u4F4D
        head = current.next;
        if (length === 1) {
          tail = null;
        } else {
          head.prev = null;
        }
      } else if (position === length - 1) {
        //\u5220\u9664\u6700\u540E\u4E00\u4F4D
        current = tail;
        tail = current.prev;
        tail.next = null;
      } else {
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return true;
    } else {
      return false;
    }
  };

  //\u5176\u4ED6\u65B9\u6CD5\u4E0E\u5355\u5411\u94FE\u8868\u76F8\u540C
}
`,paraId:6,tocIndex:1}]}}]);
