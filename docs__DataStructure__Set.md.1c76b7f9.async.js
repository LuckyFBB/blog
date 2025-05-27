"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[3321],{41356:function(a,t,n){n.r(t);var s=n(72269),l=n(93359),d=n(82478),u=n(61452),h=n(96057),m=n(88550),i=n(6947),r=n(80936),o=n(67294),_=n(55880),e=n(85893);function v(){return(0,e.jsx)(i.dY,{children:(0,e.jsx)(o.Suspense,{fallback:(0,e.jsx)(r.Z,{}),children:(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsx)("p",{children:_.texts[0].value}),(0,e.jsx)("p",{children:_.texts[1].value}),(0,e.jsxs)("h4",{id:"\u521B\u5EFA\u96C6\u5408",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u521B\u5EFA\u96C6\u5408",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"\u521B\u5EFA\u96C6\u5408"]}),(0,e.jsx)(u.Z,{lang:"js",children:_.texts[2].value})]})})})})}t.default=v},61452:function(a,t,n){var s=n(25212),l=n(93958),d=n(1320),u=n(85893),h=function(i){var r=i.children,o=i.lang,_=(0,d.HX)(function(e){return e.siteData.themeConfig.syntaxTheme});return(0,u.jsx)(s.f,{children:(0,u.jsx)(l.oP,{syntaxThemes:_,language:o,children:r})})};t.Z=h},55880:function(a,t,n){n.r(t),n.d(t,{texts:function(){return s}});const s=[{value:"\u96C6\u5408\u662F\u7531\u4E00\u7EC4\u65E0\u5E8F\u4E14\u552F\u4E00\uFF08\u5373\u4E0D\u80FD\u91CD\u590D\uFF09\u7684\u9879\u7EC4\u6210\u7684\u3002",paraId:0},{value:"\u53EF\u4EE5\u628A\u96C6\u5408\u60F3\u8C61\u6210\u4E00\u4E2A\u65E2\u6CA1\u6709\u91CD\u590D\u5143\u7D20\uFF0C\u4E5F\u6CA1\u6709\u987A\u5E8F\u6982\u5FF5\u7684\u6570\u7EC4\u3002",paraId:1},{value:`function Set() {
  var items = {};

  this.has = function (value) {
    //\u5224\u65AD\u8BE5\u503C\u662F\u5426\u5728\u96C6\u5408\u4E2D\uFF0C\u5728\u5219\u8FD4\u56DEtrue\uFF0C\u5426\u5219\u8FD4\u56DEfalse
    return items.hasOwnProperty(value);
  };

  this.add = function (value) {
    //\u5411\u96C6\u5408\u4E2D\u6DFB\u52A0\u5143\u7D20
    if (!this.has(value)) {
      //\u5224\u65AD\u8BE5\u503C\u662F\u5426\u5728\u96C6\u5408\u4E2D
      items[value] = value;
      return true;
    }
    return false;
  };

  this.remove = function (value) {
    //\u5220\u9664\u67D0\u4E2A\u503C
    if (this.has(value)) {
      //\u5224\u65AD\u96C6\u5408\u4E2D\u662F\u5426\u6709\u8FD9\u4E2A\u503C
      delete items[value];
      return true;
    }
    return false;
  };

  this.clear = function () {
    //\u6E05\u7A7A\u96C6\u5408
    items = {};
  };

  this.size = function () {
    return Object.keys(items).length;
  };

  this.values = function () {
    //\u8FD4\u56DE\u5F53\u524D\u96C6\u5408\u7684\u5143\u7D20
    return Object.keys(items);
  };

  this.union = function (otherSet) {
    //\u6C42\u4E24\u4E2A\u96C6\u5408\u7684\u5E76\u96C6
    var unionSet = new Set(); //\u65B0\u5EFA\u96C6\u5408
    var values = this.values();
    values.forEach((item) => {
      unionSet.add(item);
    });
    values = otherSet.values();
    values.forEach((item) => {
      unionSet.add(item);
    });
    return unionSet;
  };

  this.intersection = function (otherSet) {
    //\u6C42\u4E24\u4E2A\u96C6\u5408\u7684\u4EA4\u96C6
    var intersectionSet = new Set();
    var values = this.values();
    values.forEach((item) => {
      if (otherSet.has(item)) {
        intersectionSet.add(item);
      }
    });
    return intersectionSet;
  };

  this.difference = function (otherSet) {
    //\u6C42\u4E24\u4E2A\u96C6\u5408\u7684\u5DEE\u96C6
    var differenceSet = new Set();
    var values = this.values();
    values.forEach((item) => {
      if (!otherSet.has(item)) {
        differenceSet.add(item);
      }
    });
    return differenceSet;
  };

  this.subSet = function (otherSet) {
    //\u6C42\u5F53\u524D\u96C6\u5408\u662F\u5426\u662F\u53E6\u4E00\u4E2A\u96C6\u5408\u7684\u5B50\u96C6
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      var values = this.values;
      values.forEach((item) => {
        if (!otherSet.has(item)) {
          return false;
        }
        return true;
      });
    }
  };
}
`,paraId:2,tocIndex:0}]}}]);
