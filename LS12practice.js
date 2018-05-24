function f1(){
    var x = 1;
    function f2(){
       return x++;
    }
    return f2();
 }
 var f3 = f1();
 console.log(f3);//1
 console.log(f3);//1


 function f1(){
    var x = 1;
    function f2(){
       return x++;
    }
    return f2;
 }
 var f3 = f1();
 console.log(f3());//1
 console.log(f3());//2




 function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//6
console.log(inc(2));//8
var inc2 = createInc(5);//两个独立的闭包
console.log(inc(1));//9
console.log(inc2(1));//6



function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//6
console.log(inc(2));//8
inc = createInc(5);//两个独立的闭包，新创建了一个闭包，startValue重新创建
console.log(inc(1));//6
console.log(inc(1));//7



//若一个函数离开了它被创建时的作用域，它还是会与这个作用域的变量相关联
//闭包是一个函数外加上该函数创建时所建立的作用域


function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar;
}
var a = foo();
var b = foo();
a();//1
a();//2
b();//1



var tmp = 100;
function foo(x){
   var tmp = 3;
   return function(y){
       console.log(x + y + (++tmp));
//第一次fee(10):   2   10    4
//第二次           2   10    5
//第三次           2   10    6
   }
}
var fee = foo(2); // fee 形成了一个闭包
fee(10);//16
fee(10);//17
fee(10);//18



var tmp = 100;
function foo(x){
   //var tmp = 3;
   return function(y){
       console.log(x + y + (++tmp));//tmp自由变量
  //第一次         2   10    101
  //第二次         2   10    102
  //第三次         2   10    103
   }
}
var fee = foo(2); // fee 形成了一个闭包
fee(10);//113
fee(10);//114
fee(10);//115




var z = 100;//z不是闭包里面的
function foo(x){
   var tmp = 3;
   return function(y){
       console.log(x + y + (++tmp)+z);
   }
}
var fee = foo(2); // fee 形成了一个闭包
fee(10);//116
fee(10);//117
fee(10);//118




function counter() {
    var n = 0;
    return {
        count:function () {return ++n;},
        reset:function () {n = 0;return n;}
    }
}
var c = counter();
var d = counter();//形成两个包裹体
console.log(c.count());//1
console.log(d.count());//1
console.log(c.reset());//0    c复位了，所以c的n还是0
console.log(c.count());//1
console.log(d.count());//2    d没有复位，所以在n=1的基础上再加1等于2



function fn() {
    var max = 10;//有全局和局部，在局部应该看局部变量的值
    return function bar(x) {
        if(x > max){
            console.log(x);
        }else {
            console.log(max);
        }
    }
}
var f1 = fn();
var max = 100;
f1(15);//15



function fn() {
    //var max = 10;//若屏蔽此行，则输出为多少？
    return function bar(x) {
        if(x > max){
            console.log(x);
        }else {
            console.log(max);
        }
    }
}
var f1 = fn();
var max = 100;
f1(15);//100


//闭包作用
//可通过闭包来访问隐藏在函数作用域内的局部变量
//使函数中的变量被保存在内存中不被释放（单例模式）

function f1(){
    var n = 999;
    function f2(){
        console.log(++n);
    }
    return f2;
}
var f = f1();
f();//1000
f();//1001



// 比如说我现在的需求是这样的，在网页中有时候会需要遮罩层，调用的时候我就创建一个，
// 但是你不可能每次调用创建，所以如果存在就用以前的，如果不存在就创建新的
function fn() {
    var a;
    return function() {
        return a || (a = document.body.appendChild(document.createElement('div')));
        //a是闭包的一部分
    }
};
var f = fn();
f();



//单例模式实行简单存储数据
var db = (function() {
    // 创建一个隐藏的object, 这个object持有一些数据
    // 从外部是不能访问这个object的
        var data = {};
    // 创建一个函数, 这个函数提供一些访问data的数据的方法
        return function(key, val) {
            if (val === undefined) { return data[key] } // get
            else { return data[key] = val } // set
        };
    })();//立即执行表达式
    
    db('x'); // 返回 undefined
    db('x', 1); // 设置data['x']为1
    db('x'); // 返回 1



// 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包
//使用闭包时要注意不经意的变量共享问题，可以通过立即执行表达式来解决


(function () {
    var m = 0;
    function getM(){
        return m;
    }
    function setM(val){
        m = val;
    }
    window.g = getM;
    window.f = setM;
}());
f(100);
g();
//100



