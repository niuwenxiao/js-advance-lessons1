//函数定义 函数声明方式
function max(a,b){
    return a>b?a:b;
}
max(2,3);

//函数定义 函数表达式方式 等号右侧可以是匿名函数也可以是非匿名函数
var max = function (a,b){ //匿名函数
    return a>b?a:b;
};
max(2,3);

//函数定义 Function构造函数方式
var max = new Function("a","b","return a>b?a:b");//都是字符串，通过字符串实现更改函数，动态生成函数对象
max(2,3);

var str = "return a<b?a:b";
var min = new Function("a","b",str);
min(2,3);//2

var str = "return a+b";
var qiuhe = new Function("a","b",str);
qiuhe(2,3);//5


//函数调用
//普通函数直接调用
function test1() {
    console.log("this is",this);
}
test1();//window

function foo(){
    console.log("foo");
}
foo === window.foo;//true,此时调用主体是window


//对象方法调用
var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
obj.test();//调用对象的方法23

var x = 45; 
var obj = {
   x : 23,
   test:function(){
       function foo(){
        console.log(this.x);
       }
       foo();
   }
};
obj.test();//45


var x = 45;
var test = function(){
        console.log("输出：",this.x);
}
var obj = {
   x:23
};
obj.test = test;
obj.test();//23
test();//45



//间接调用 实例一 间接调用的对象要和原对象之间，在数据结构上有对应的相似处，以便不影响调用效果
objA = {name:"AA"};
objB = {name:"BB"};
objA.foo = function(){
    console.log(this.name);
};
objA.foo();//AA
objA.foo.call(objB);//BB,
//objB调用objA的函数，在结构上要有对应的相似处


//间接调用 实例二 移花接木 吸星大法
var fish = {
    name:"fish",
    swim:function (m,n) {
        console.log("i'm "+this.name+" i cam swim ___",m,n);
    }
};

var bird = {
    name:"polly",
    fly:function(m,n){
        console.log("i'm:"+this.name+" i can fly ___",m,n);
    }
};

var me = {
    name:"ABC"
};

bird.fly(5,6);
fish.swim.call(me,3,4);
bird.fly.call(me,7,8);
//i'm:polly i can fly ___ 5 6
//i'm ABC i cam swim ___ 3 4
//i'm:ABC i can fly ___ 7 8


//很多方法都可以通过间接调用的方式来调用，比如很多原型的方法
function test() {
    console.log(Array.prototype.slice.call(arguments));
}
test(1,2,3,"4",5);//(5) [1, 2, 3, "4", 5]


//构造函数
function Person(name){
    this.name = name;
}
Person.prototype.sayHi = function(){
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person("Jack");
p1.sayHi();//Hi,i'm Jack






var arr = [1,2,3,4,5];
arr.x = 6;
arr instanceof Array;//true
arr//(5) [1, 2, 3, 4, 5, x: 6]，长度不看数组的属性


//实参数小于形参数
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));//6
console.log(sum(1,2));//8
console.log(sum(1));//10

//实参数大于形参数
function test() {
    console.log(arguments);
    console.log(Array.prototype.slice.call(arguments));
    var s = "";
    for (var i = 0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;
}
test("hello,", "world!");//"hello,world!"


function test() {
    //console.log(arguments);
    console.log(test.arguments==arguments,arguments);
    // console.log(arguments.length);
	// console.log(typeof arguments);
	// console.log(arguments instanceof Array);
	// console.log(arguments instanceof Object);
    console.log(Array.prototype.slice.call(arguments));
    var s = "";
    for (var i = 0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;
}
test("hello,", "world!");//false，["hello,", "world!", callee: ƒ, Symbol(Symbol.iterator): ƒ]
//["hello,", "world!"]

