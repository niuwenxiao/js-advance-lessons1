//回顾
var arr1=[2,5,8];
arr1.forEach(function(a){
  console.log(a,this);
});
console.log(arr1);
//2 Window {frames: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
//5 Window {frames: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
//8 Window {frames: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}



var arr1=[2,5,8];
var arr2=[1,6,7];
arr1.forEach(function(a){
  console.log(a,this);
},arr2);
console.log(arr1);
//2 (3) [1, 6, 7]
//5 (3) [1, 6, 7]
//8 (3) [1, 6, 7]
//(3) [2, 5, 8]




var arr1=[2,5,8];
var arr2=[1,6,7];
arr1.forEach(function(a,i){
  console.log(a,i,this);
},arr2);
console.log(arr1);
//2 0 (3) [1, 6, 7]
//5 1 (3) [1, 6, 7]
//8 2 (3) [1, 6, 7]
//(3) [2, 5, 8]



//把两个比较后的最大值保留，传给arr3
var arr1=[2,5,8];
var arr2=[1,6,7];
var arr3=[];
arr1.forEach(function(a,i){
  arr3[i]=a>arr2[i]?a:arr2[i];
},arr2);
console.log(arr3);//(3) [2, 6, 8]



//LS19
//UTC 协调世界时间
//GMT 格林尼治时间
var date1 = new Date(2017,9,18,12,34,1);//注意：月0-11，日：1-31，时：0-23，分：0-59，秒：0-59，毫秒：0-999
console.log(date1);//Wed Oct 18 2017 12:34:01 GMT+0800 (中国标准时间)

var date2 = new Date(17,9,18,12,34,1);//若years为2位的话自动加1900
console.log(date2);
//Thu Oct 18 1917 12:34:01 GMT+0800 (中国标准时间)


var date3 = new Date("2017-08-09");//注意日期的格式 此处的08代表8月还是9月，对比上一个创建形式
console.log(date3);//Wed Aug 09 2017 08:00:00 GMT+0800 (中国标准时间)


//补充：无效日期
var date6 = new Date(NaN);
console.log(date6);//Invalid Date


//有无new的区别
var d1 = new Date();
var d2 = Date();
console.log(d1,typeof d1);//object
console.log(d2,typeof d2);//string



var n1 = new Number("123");
var n2 = Number("123");
console.log(n1,typeof n1);//Number {[[PrimitiveValue]]: 123} "object"
console.log(n2,typeof n2);//123 "number"


//Date静态方法（Date构造器函数对象的方法）GMT 格林尼治时间
console.log(Date.now());//以毫秒为单位返回当前时间（从1970年1月1日00:00:00开始计算）
console.log((new Date()).getTime());//1525876136820


//Date原型方法 getter和setter相关
var d = new Date("1978-11-25");
console.log(d.getFullYear(),d.getMonth(),d.getDay(),d.getDate(),d.getHours());//1978 10 6 25 8
console.log(d.getTimezoneOffset());//-480


//Date原型方法 转成字符串相关
var d = new Date(2012,3,21,15,7,23,234);
console.log(d.toTimeString(),"___",d.toLocaleTimeString());//15:07:23 GMT+0800 (中国标准时间) ___ 下午3:07:23
console.log(d.toDateString(),"___",d.toLocaleDateString());//Sat Apr 21 2012 ___ 2012/4/21
console.log(d.toJSON());//2012-04-21T07:07:23.234Z


console.log(Date.parse("2010-01-01 11:12:23.111"));//1262315543111
console.log(new Date("2010-01-01 11:12:23.111"));//Fri Jan 01 2010 11:12:23 GMT+0800 (中国标准时间)
console.log(new Date().toISOString());//2018-05-09T14:32:43.675Z


//日期格式（无时间）
console.log(new Date("2001"));//Mon Jan 01 2001 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date("2001-02"));//Thu Feb 01 2001 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date("2001-02-22"));//Thu Feb 22 2001 08:00:00 GMT+0800 (中国标准时间)



