var a = 10,
    b = 20;
function fn() {
    //fn局部作用域
    var a = 100,
        c = 200;
    //console.log(a,b,c,d);
    function bar() {
        //bar局部作用域
        var a = 500,
            d = 600;
        console.log(a,b,c,d);
    }
    bar();
}
fn();
//500  20  200  600


var a = 10;
var b = 20;
function fn(){
    var a = 100,c = 200;
    function bar(){
         var a = 500,d = 600;
    }
    bar();
    console.log(a,b,c,d);
}
fn();//报错，d是局部变量，无法在外部访问



var a = 10;
var b = 20;
function fn(){
    var a = 100,c = 200;
    function bar(){
         var a = 500;d = 600;//此时d是全局变量
        
    }
    bar();
    console.log(a,b,c,d);
}
fn();
//100 20 200 600




//通过new Function创建的函数对象不一定遵从静态词法作用域
var scope = "global";
function checkscope(){
     var scope = "local";
     return function(){
         return scope;
     };
}
console.log(checkscope()());//local



var scope = "global";
function checkscope(){
     var scope = "local";
     return function(){
         return scope;
     };
}
console.log(checkscope());
//f(){ return scope;}



var scope = "global";
function checkscope(){
     var scope = "local";
     return new Function("return scope;")
}
console.log(checkscope()());//global



var scope = "g";
function foo(){
	var scope = "l";
	return new Function("console.log(scope);")
}
foo()();//g




//变量污染、变量共享问题,尤其是异步执行的情况下。如果是两个单独的文件的情况下，更容易造成变量污染
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};
//一长串代码后，假如看不见上述代码了
var a=2,b=3;
if(a<b){
    var userId = 234;
}
//点击事件发生时，输出234




//使用IIFE来解决上述问题
var userId = 123;
document.onclick = function () {
    console.log("userId = ",userId);
    //alert("userId = "+userId);
};
//多人协同开发时问题，块作用域缺陷的问题可能会更加明显
(function(){
    var a=2,b=3;
    if(a<b){
        var userId = 234;
    }
}());
//点击事件发生时，输出123




// 理解执行上下文（通俗的例子）
// 在不同的地点，能访问到的变量也不同，比如：在文具店不可能访问到银行柜员机和大堂经理
// 在银行或文具店中可以访问到家中的变量，可以理解为有电话和家里建立了链接
console.log("小明回家");
var xx = ["书桌","书包","铅笔盒"];//小明家中
console.log("在家-做作业中 1 ...全局上下文");
function goToStore(){
    var yy = ["文具店老板","出售的文具"];//文具商店中
    console.log("在文具店-买文具中  ...函数1上下文");
    console.log("在文具店-买文具中  ...函数1上下文 发现没带钱");
    goToBank();
    console.log("在文具店-买好文具  ...函数1上下文 返回家");
}
function goToBank(){
    var zz = ["银行职员","柜员机"];//银行中
    console.log("在银行-取钱 ...函数2上下文 返回文具店");
}
console.log("在家-做作业中 2 ...全局上下文 发现笔没油了");
goToStore();//笔没油了，去商店买笔
console.log("在家-继续做作业...全局上下文");
//小明回家
//在家-做作业中 1 ...全局上下文
//在家-做作业中 2 ...全局上下文 发现笔没油了
//在文具店-买文具中  ...函数1上下文
//在文具店-买文具中  ...函数1上下文 发现没带钱
//在银行-取钱 ...函数2上下文 返回文具店
//在文具店-买好文具  ...函数1上下文 返回家
//在家-继续做作业...全局上下文



//上述语句相当于
var xx = ["书桌","书包","铅笔盒"];//小明家中
console.log("在家-做作业中 1 ...");
function goToStore(){
    var yy = ["文具店老板","出售的文具"];//文具商店中
    console.log("在文具店-买文具中  ...");
    function goToBank(){
        var zz = ["银行职员","柜员机"];//银行中
        console.log("在银行-取钱 ... 返回文具店");
    }
    console.log("在文具店-买文具中  ... 发现没带钱");
    goToBank();
    console.log("在文具店-买好文具  ... 返回家");
}
console.log("在家-做作业中 2 ... 发现笔没油了");
goToStore();//笔没油了，去商店买笔
console.log("在家-继续做作业...");





console.log("全局上下文-start");
var x = 1;
function foo(){
    console.log("foo上下文-start");//设置断点
    var y = 2;
    function bar(){
        console.log("bar上下文-start");//设置断点
        var z = 3;
        console.log(x+y+z);
        console.log("bar上下文-end");//设置断点
    }
    bar();
    console.log("foo上下文-end");//设置断点
}
foo();//设置断点
console.log("全局上下文-end");//设置断点
//全局上下文-start
//foo上下文-start
//bar上下文-start
//6
//bar上下文-end
//foo上下文-end
//全局上下文-end



//词法作用域 与调用形式无关 实例一
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    echo();
}
foo();//Jack


//词法作用域 与调用形式无关 实例二
var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    function fee(){
        var name = "Lucy";
        echo();
    }
    fee();
}
foo();//Jack



var name = "Jack";
function echo() {
    console.log(name);
}
function foo() {
    var name = "Bill";
    function fee(){
        var name = "Lucy";
        console.log(name);
    }
    fee();
}
foo();//Lucy








