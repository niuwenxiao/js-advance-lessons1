var obj1 = {
    x:12,
    foo:function(){
      console.log(this.x);
   }
 }
 var obj2 = {
    x:34
 }
 var fee = obj1.foo.bind(obj2);
 fee();//34  undefined

 var obj1 = {
    x:12,
    foo:function(){
      console.log(this.x);
   }
 }
 var obj2 = {
    x:34
 }
 var fee = obj1.foo.bind(obj2);
 fee("dd");//34  dd



 //预解析
 //主要工作：变量声明和函数声明提升
 console.log(a);//undefined
 var a = 1;
 console.log(a);//1
 //解析器眼中：
 var a;
console.log(a);
a = 1;
console.log(a);



foo();
function foo(){
    console.log("f_1");
}
function foo(){
    console.log("f_2");
}
//解析器眼中：
function foo(){
    console.log("f_1");
}
function foo(){
    console.log("f_2");
}
foo();//f_2



 console.log(a,b);//undefined undefined
 var b = 23;
 console.log(a,b);//undefined 23
 var a = b;
 console.log(a,b);//23  23



 console.log(obj1,obj2);//undefined undefined
var obj1 = {x:23};
console.log(obj1,obj2);//{x: 23} undefined
var obj2 = obj1;
console.log(obj1,obj2);//{x: 23} {x: 23}
obj2.x =25;
console.log(obj1,obj2);//{x: 25} {x: 25}


//同时有var和function关键字
foo();
var foo = function(){
    console.log("foo");
};
//当function前有运算符的话，认定为表达式，不提升
//在解析器眼中：
var foo;
foo();//报错
foo = function(){
    console.log("foo");
};



console.log(foo);//undefined
var foo = function(){
    console.log("foo");
};
foo();//foo



AA();
function AA(){
    console.log("AA_1");
}
var AA = function AA(){
    console.log("AA_2");
};
AA();//AA_1  AA_2
//在解析器眼中：
function AA(){
    console.log("AA_1");
}
var AA;
AA();
AA =  function AA(){
    console.log("AA_2");
};
AA();



//词法作用域 与调用形式无关，JS采用的是静态词法作用域，
//代码完成后作用域链就已形成，与代码的执行顺序无关，找函数定义的地方，
//以它为基准，往上倒
var name = "jack";
function dcho(){
   console.log(name);
}
function foo(){
    var name = "bill";
    dcho();
}
foo();//jack


//全局变量与局部变量
var x = "outside f1";
var f1 = function () {
    console.log(x);
};
f1();//outside f1
console.log(x);//outside f1


var x = "outside f1";
var f1 = function () {
    var x = "inside f1";
    console.log(x);
};
f1();//inside f1
console.log(x);//outside f1





if(true){
    var i = 0;
}

function foo(){
    console.log("j:",j);//undefined
    var j = 10;
    console.log("j:",j);//10
}
foo();

console.log("i:",i);//0
console.log("j:",j);//报错

//上边代码等价于
var i;
if(true){
    i = 0;
}

function foo(){
    var j;
    console.log("j:",j);//undefined
    j = 10;
    console.log("j:",j);//10
}
foo();

console.log("i:",i);//0
console.log("j:",j);//报错