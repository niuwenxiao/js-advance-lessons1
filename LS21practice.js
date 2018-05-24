//JS中异常处理的作用（处理程序运行时出现的意异常）
//异常处理基本形式
// try语句包含了由一个或者多个语句组成的try块, 和至少一个catch子句或者一个finally子句的其中一个
// 或者两个兼有， 下面是三种形式的try声明:
// try...catch
// try...finally
// try...catch...finally
//无论是否捕捉到异常，finally都会执行
try{
    //可能出现异常的部分
    var a = new Array(-5);
    console.log("xx");
}
catch(e){
    console.log(e);
}
finally{
    console.log("finally");
}
/*
catch语句中包含要执行的语句，当try语句中抛出错误时。
也就是，你想让try语句中的内容成功， 如果没成功，你想控制接下来发生的事情，这时你可以在catch语句中实现。
如果有在try块中有任何一个语句（或者从try块中调用的函数）抛出异常, 控制立即转向catch子句。
如果在try块中没有异常抛出，则catch子句将会跳过。
finally子句无论是否有异常抛出或着是否被捕获它总是执行。
可以嵌套一个或者更多的try语句,如果内部的try语句没有catch子句，那么将会进入包围它的try语句的catch子句。
 */


try{
    console.log("xx");
}
catch(e){
    console.log(e);
    console.log("yy");
}
//xx



try {
    try{
        throw "ErrorMessage11";
    }
    // catch (e){
    //     //throw "ErrorMessage22"; //抛出异常后将直接跳出catch，catch内后续代码不再执行
    //     console.log("inside catch",e);
    //     //throw "ErrorMessage22";
    // }
    finally {
        console.log("finally 111");
    }
}
catch (e) {
    console.log("outside catch",e);
}
finally {
    console.log("finally 222");
}
//finally 111
//outside catch ErrorMessage11
//finally 222



//sonsole
console.log("logInfo");//logInfo
console.warn("warnInfo");//警告，双引号里警告的内容
console.error("errorInfo");//报错
console.assert(3>2,"有问题的话会输出这句话11111");//断言，3>2为真，则不用输出，
console.assert(2==="2","有问题的话会输出这句话22222");//为假，则输出后面的话




//异常处理嵌套
try{
    try{
        throw("oops");
    }
    catch(ex){
        console.log("inner",ex);
    }
    finally{
        console.log("finally");
   }
}
catch(ex){
   console.log("outer",ex);
}
//inner  oops
//finally


try {
    try {
        throw "oops";
    }
    catch (ex) {
        console.error("inner", ex);
        throw ex;
    }
    finally {
        console.log("finally");
    }
}
catch (ex) {
    console.error("outer", ex);
}
// "inner" "oops"
// "finally"
// "outer" "oops"


//思考下述两段代码的区别，思考两者调用栈CallStack的不同
try{
	function abc(x,cb){
		console.log(x);
		cb();
    }
	abc("xx",function(){
		var arr = new Array(-1);
	});
}
catch(e){
	console.log(e);
}//捕捉到异常




try{
	function abc(x,cb){
		console.log(x);
		cb();
    }
}
catch(e){
	console.log(e);
}
abc("xx",function(){
    var arr = new Array(-1);
});
//捕获不到异常，直接崩了
//abc调用的时候那个栈已经释放了，新的调用栈并没有那个捕获异常



/*
JS中的错误概述
- 当 JavaScript 引擎执行 JavaScript 代码时，可能会发生各种错误
- 可能是语法错误、或是由于浏览器差异产生的错误、或是来自服务器或用户导致的错误
- 有些错误是可以控制和避免的，有些是不可控的（比如来自用户输入等第三方的操作）
JS中对错误的处理
- 优化代码避免可控错误，对不可控错误需要使用异常处理来进行处理，避免程序直接崩溃
Error对象
- 当运行时错误产生时，会抛出一个错误对象，可以对此对象进行捕获和处理
- 也可以通过Error的构造器new一个错误对象，当检测到异常时或不满足逻辑时，手动抛出错误对象
- 所有错误对象的基础原型是Error.prototype，默认的name属性为“Error”，message属性为“”
*/


//Error相关
var e1 = new Error("e1 Error Msg");
try {
    throw  e1;//throw new Error("Whoops!");
} catch (e) {
    console.log(e.name + ": " + e.message);
}
//Error: e1 Error Msg


//可以直接创建Error对象
console.log(Error.prototype);//{name: "Error", message: "", constructor: function, toString: function}
var myError = new Error("NewMessage");
console.log(myError.name,myError.message);//Error NewMessage


//基于Error的子类，可以创建自定义错误对象，并添加若干自有属性
function MyError(name,message) {
    this.name = name||'MyError';
    this.message = message || 'Default Message';
}
MyError.prototype.__proto__ = Error.prototype;
//MyError.prototype = Object.create(Error.prototype);
//MyError.prototype.constructor = MyError;


try {
    // throw new MyError();
    throw new MyError('custom message');
} catch (e) {
    console.log(e.name);     // 'MyError'
    console.log(e.message);  // 'custom message'
}



//Part 1111111111 引用错误案例 ReferenceError
// var y = 23;
try
{
    var x = y;// 没有定义y所以产生错误。如果有y的话，不会抛异常错误
    //console.log("x") = 23;//赋值引用错误，在chorme中测试
}catch(e){
    console.log(e.name,e.message);
}
finally {
    console.log("finally");//有无异常该句都会执行
}
//ReferenceError y is not defined
//finally


try{
    var a= new Array(-1);
    //var a= new Array(1);
}catch(e){
    console.log(e.name,e.message);
}
finally {
    console.log("finally");//有无异常该句都会执行
}
//RangeError Invalid array length
//finally


//Part 3333333333 类型错误 TypeError
try{
    var a;a.aa();
    //var a= new 123; //在chrome中测试
}catch(e){
    console.log(e.name,e.message);
}
finally {
    console.log("finally");//有无异常该句都会执行
}
//TypeError Cannot read property 'aa' of undefined
//finally


//自定义错误类
function UserError(message){
    this.message = message || '默认信息';
    this.name = 'UserError';
}
UserError.prototype.__proto__ = Error.prototype;
// UserError.prototype = new Error();
// UserError.prototype.constructor = UserError;



//错误类型测试
try {
    throw new RangeError();
    // throw new TypeError();
    // throw new ReferenceError();
} catch (e) {
    if (e instanceof TypeError) {
        console.log("TypeError");
    } else if (e instanceof RangeError) {
        console.log("RangeError");
    } else if (e instanceof ReferenceError) {
        console.log("ReferenceError");
    } else {
        console.log("OtherError");
    }
}
//RangeError



