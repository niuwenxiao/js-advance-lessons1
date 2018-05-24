//JS的函数也是对象
function foo(){}
console.log(foo); //f foo(){}
//如果变量是函数（函数对象）时，typeof此对象，返回function，而非object 
console.log(typeof foo); //function
console.log(foo instanceof Object); //true
console.log(foo instanceof Function); //true
console.log(foo === window.foo); //true


console.log(typeof Function);//function
console.log(typeof Array);	 //function
console.log(typeof Date);	 //function
console.log(typeof Error); 	 //function
console.log(typeof Math);	 //object
console.log(typeof JSON);	 //Object


var a = new Array(5);//创建长度为5的数组
var b = new Array("5");//创建长度为1，元素为5的数组


console.log(typeof new Function());// function，创建函数的方式
console.log(typeof new Array());//object，创建数组对象
console.log(typeof new Date());	//object
console.log(typeof new new Function());//object
console.log(typeof new new new Function());//报错


//内置的函数对象是Array、Function、Date，非函数对象是Math、JSON
console.log(Function instanceof Function);//true
console.log(Function instanceof Object);//true

console.log(Array instanceof Function);//true
console.log(Array instanceof Object);//true

console.log(Date instanceof Function);//true
console.log(Date instanceof Object);//true

console.log(Math instanceof Function);//false
console.log(Math instanceof Object);//true

console.log(JSON instanceof Function);//false
console.log(JSON instanceof Object);//true



var func = function(n){
    if(n<=0)
        return 1;
    else
        return n*func(n-1);
}
func(4);//24


(function(n){
    if(n<=0)
        return 1;
    else
        return n * arguments.callee(n - 1);
}(4));//24


//函数对象属性之 prototype
//获取对象的原型。每一个构造函数都有一个prototype属性，指向另一个对象。
//这个对象的所有属性和方法，都会被构造函数的实例继承。
function Man(name, age) {
    this.name = name;
    this.age = age;
}
Man.prototype.sex = "M";
Man.prototype.sayHi = function () {
    console.log("Hi,i'm",this.name);
};
var li = new Man("Leo", 10);
li.sayHi();//Hi,i'm Leo
console.log(li.sex);//M

Man.prototype.isStrong = true;
console.log(li.isStrong);//true

//绑定
var x = 45;
var obj = {
    x:23,
    test:function(){
		function foo(){
			console.log(this.x);
		}
		foo.bind(this)();
		foo();
    }
};
obj.test();//23     45


var x = 45;
var obj = {
    x:23,
    test:function(){
		function foo(){
			console.log(this.x);
		}
		var fee = foo.bind(this);//var fee = foo.bind(this); fee();
		fee();
    }
};
obj.test();//23

var x = 45;
var obj = {
    x:23,
    test:function(){
		function foo(){
			console.log(this.x);
		}
		var fee = foo.bind(this);//var fee = foo.bind(this); fee();
        fee();//23
        foo();//45
    }
};
obj.test();



//高阶函数
function add(x, y, f) {
    return f(x) + f(y);
}
add(2,3,function(z){return z*z;});//13
add(2,-3,Math.abs);//5
add(2,3,Math.sqrt);//2的开平方加3的开平方，3.1462643699419726

//练习使用高阶函数实现下述公式，要求函数复用
//z = 2*(x+1)-3*y*y;
//c = 2*a*a-3*(b-1);
//k = 2*(i+1)-3(j-1);
function foo(x,y,c1,c2){
	return 2*c1(x)-3*c2(y);
}
function f1(x){
	return x+1;
}
function f2(x){
	return x-1;
}
function f3(x){
	return x*x;
}
foo(1,1,f1,f3);//1
foo(1,1,f3,f2);//2
foo(1,1,f1,f2);//4


function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]，
//将每一个元素都平方

//filter 数组过滤 ，返回为false的将被过滤掉
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]

setTimeout instanceof Function;//true




var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}); // [1, 2, 10, 20]

var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return 1;
    }
    if (x > y) {
        return -1;
    }
    return 0;
}); //[20, 10, 2, 1]