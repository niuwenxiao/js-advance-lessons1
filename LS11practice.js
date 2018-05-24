//立即执行表达式写法两种
//第一种
(function min(x,y){
    return x<y?x:y;
}(5,84))//5，无需再调用

//第二种
(function min(x,y){
    return x<y?x:y;
})(5,84);


//与运算符结合的写法（执行函数、进行运算）
var i = function( ){ return 10; }( ); //i为10
true && function( ){...}( );//短路原则

true && function(a,b){
    return a>b?a:b;
}(5,9);//9

({}) && function(a,b){
    return a>b?a:b;
}(5,9);//9

0 && function(a,b){
    return a>b?a:b;
}(5,9);//0

~function(arg1,arg2){ ... }(x,y); //x,y为传递参数 位运算非操作符

!function( ){ ...  }( );

!function(x,y){
    return x==y?true:false; 
}("5",5);//false

!function(x,y){
    return x===y?true:false; 
}("5",5);//true

!function(){return 2}();//false
!function(){return 0}();//true




//注意：IIFE是表达式，要注意使用分号结尾，否则可能出现错误
(function() {
    console.log("111");
})();//没有分号的话会报错
(function () {
    console.log("222");
})()//111 222



(function() {
    console.log("111");
})()//111





//如何避免文件之间的全局污染，使用IIFE函数立即执行表达式 
(function () {  // IIFE开始
    var x = 10;
    document.onclick = function () {
        // console.log("x = ",x);
        alert("x = "+x);
    };
})();           // IIFE结束
//点击x=10
(function () {  // IIFE开始
    var x = 20;
 })();           // IIFE结束
 //点击 x=10





//ES5作用域 与 变量共享问题
 //在函数作用域中创建的变量 i 只有一个，出现了变量 i 共享问题，可通过IIFE解决
 function f(){
    var getNumFuncs = [];
    for(var i = 0;i<10;i++){
         getNumFuncs[i] = function(){
               return i;
          };
    }
    return getNumFuncs;
}
var tmp = f();
tmp[3]();//10


function f(){
    var getNumFuncs = [];
    for(var i = 0;i<10;i++){
         getNumFuncs[i] = function(){
               return i;
          };
    }
    return getNumFuncs;
}
var tmp = f();
tmp[5]();//10

//以上代码等价于 存在变量共享问题
//查看Scope窗体中getNumFuncs中每一个函数的内部属性[[Scopes]]
//中的第0个元素闭包中的变量，看是否存在共享问题
function f(){
    var getNumFuncs = [];//函数数组
    var i=0;
    for(;i<10;i++){
        getNumFuncs[i] = function(){
            return i;
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//tmp[0]()...tmp[9]()都为3还是10。   10



//IIFE 解决变量共享问题
//查看Scope窗体中getNumFuncs中每一个函数的内部属性[[Scopes]]中的第0个元素闭包中的变量，看是否存在共享问题
function f(){
    var getNumFuncs = [];//函数数组
    for(var i=0;i<10;i++){
        (function (j) {
            getNumFuncs[j] = function(){return j;};
        })(i);
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//输出为3，tmp[0]()...tmp[9]()都为是期望的结果



//八j换成i也是可以的，无非就是形参和实参的区别
function f(){
    var getNumFuncs = [];//函数数组
    for(var i=0;i<10;i++){
        (function (i) {
            getNumFuncs[i] = function(){return i;};
        })(i);
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//3



function f(){
    var getNumFuncs = [];//函数数组
    var j;
    for(var i=0;i<10;i++){
        j = i;
        getNumFuncs[i] = function(){
            return j;//如果return i;的话输出几？
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//9


function f(){
    var getNumFuncs = [];//函数数组
    var j;
    for(var i=0;i<10;i++){
        j = i;
        getNumFuncs[i] = function(){
            return i;
        };
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();//10






//避免闭包中非期望的变量共享问题，
var tabs = document.getElementsByClassName('tabs')[0].children;
var contents = document.getElementsByClassName('show')[0];

for(var i=0;i<tabs.length;i++) {

        tabs[i].onclick=function(){
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].className = '';
            }
            this.className = "active";
            contents.innerHTML = "导航" + i + "内容";
        };
//点击的话，



//解决方案 IIFE 重新打开index09.html页面测试
var tabs = document.getElementsByClassName('tabs')[0].children;
var contents = document.getElementsByClassName('show')[0];

for(var i=0;i<tabs.length;i++) {
    (function (i) { 	//IIFE start
        tabs[i].onclick=function(){
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].className = '';
            }
            this.className = "active";
            contents.innerHTML = "导航" + i + "内容";
        };
    }(i));			//IIFE end
}

