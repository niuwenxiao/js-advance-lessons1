//ES6的const和let，ES5缺陷以及解决方法


//ES5中的var及其缺陷

//通过var定变量 ES5中没有块作用域{ }，外可以访问{ }内变量
{
    var a = 23;
}
console.log(a);//23
//由于没有块作用域，a可以正常输出


for(var i=0;i<5;i++){
    //do somethings
}
console.log("i:",i);//此处i依然存在


//通过var声明的变量，由于没有块作用域，容易造成变量污染
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};

//一长串代码后，假如忘记上边定义了userID，容易重复定义造成变量污染
var a=2,b=3;
if(a<b){
    var userId = 234;
}
//第一段发生点击事件后输出userId =  123，加上第二段，则会返回userId =  234


//解决方案
//可以通过IIFE来解决上述问题
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};

(function () {
    var a=2,b=3;
    if(a<b){
        var userId = 234;
    }
}());




//ES5通过var声明变量，可能造成变量的非期望共享
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000*i);
}
console.log("i：",i);
//i：3
//Mon Jun 04 2018 14:53:55 GMT+0800 (中国标准时间) 3
//Mon Jun 04 2018 14:53:56 GMT+0800 (中国标准时间) 3
//Mon Jun 04 2018 14:53:57 GMT+0800 (中国标准时间) 3

//解决方案
for (var i = 0; i < 3; i++) {
    (function(j) {  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000*i);
    })(i);
}
console.log("i：",i);
//i：3
//Mon Jun 04 2018 14:53:55 GMT+0800 (中国标准时间) 0
//Mon Jun 04 2018 14:53:56 GMT+0800 (中国标准时间) 1
//Mon Jun 04 2018 14:53:57 GMT+0800 (中国标准时间) 2




//通过let声明变量，使用了let就可以避免var所带来的问题
//- ES6新增了let命令，用于声明变量，用法与var类似
//- 其与var的不同在于，用let声明的变量只在 let 命令所在的代码块 { }内有效，而不是全局变量
let userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};

let a=2,b=3;
if(a<b){
    let userId = 234;
}
//发生点击事件输出userId = 123，不会造成变量的污染


//使用let可有效避免变量共享问题
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000*i);
}
//i：3
//Mon Jun 04 2018 14:53:55 GMT+0800 (中国标准时间) 0
//Mon Jun 04 2018 14:53:56 GMT+0800 (中国标准时间) 1
//Mon Jun 04 2018 14:53:57 GMT+0800 (中国标准时间) 2



//ES6使用const来声明常量，也常用来声明不变的函数
const PI = 3.1415926;
console.log(PI);
// PI = 3;//给常量再赋值 报错

//声明时必须赋值,一旦声明必须立即初始化
//const foo;//报错
//const foo = 123;//ok


//const作用域同let
if(true){
    const MAX = 5;
}
//console.log(MAX);//报错


//const 除了声明常量外，也常用来声明不变的函数
const fee = function () {

};


//const指向的对象引用不可变，但其属性或元素（如果是数组对象的话）是可变的
const a = [];
a.push(123,234);//可以
a.length = 1;//可以
a = "str";//报错，因为a是const其元素或属性可改，但其引用不能修改类似于 const指针
//回顾 常指针,指向常量的指针

const a=[];
a = [1];
//报错，改了引用




//let和const的重要特性
//一、ES6中 let和const 不进行变量提升特性
console.log(a);
var a = 1;
console.log(a);

//预解析 上述代码等效于
var a;
console.log(a);//undefined
a = 1;
console.log(a);//1


//思考下述代码输出什么？理解ES5中，是否有块作用域，是否有函数作用域，如何理解下述代码
var temp = new Date();
function f() {
    console.log(temp);
    if(false){
        var temp = "Hi!";
    }
}
f();

//let和const不存在变量提升
console.log(a);//报错
let a = 2;
console.log(a);



// 二：let和const的暂时性死区特性
// 只要块级作用域内存在let，它所声明的变量就“绑定”在这个区域，不再受外部影响
// let对这个块从一开始就形成了封闭的作用域，凡是在声明之前使用该变量，就会报错
//养成良好习惯，使用变量前声明
typeof b;//报错 ReferenceError 需要使用前定义
let b;//若没有此行，上一行不会报错，输出"undefined"

var tem = 123;
if(true){
    tmp = "abc";
    let tmp;//思考如果改为var是否会报错，如果let tmp在上一行之前如何？
}
//报错，ReferenceError

var tem = 123;
if(true){
    tmp = "abc";
    var tmp
}
//“abc”

var tem = 123;
if(true){
    let tmp
    tmp = "abc";
}
//"abc"




//三：let const不能重复声明
let abc;
let abc;//报错

function foo1() {
    let x;
    var x;
}
foo1();//报错 重复定义

function foo2() {
    let x;
    let x;
}
foo2();//报错 重复定义






















