//JS this四种应用场景

//一：一般函数中的this（非严格松散模式下）指代全局对象
function thisTest(){
    console.log(this === window);
}
thisTest();//true



//可以通过this在函数内添加、删除、修改全局对象属性
var a = 10;b = "Hi";
function thisTest2(){
    this.a = 20;
    delete this.b;
    this.c = "新添加属性";
}
thisTest2();
console.log(a,c);//20  "添加新属性"



//一般函数中的this（严格模式）为undefined，
function thisTest() {
    "use strict"
    console.log(this);
}
thisTest();//undefined
//可以用此来判断当前是否为严格模式
function isStrictMode() {
    return this == undefined?true:false;
}
isStrictMode();//false

"use strict"
function isStrictMode() {
    return this == undefined?true:false;
}
isStrictMode();//true



//二：对象方法中的this指代调用此方法的对象（无嵌套的情况下）
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        this.x = x;
        this.y = y;
    }
};
point.moveTo(1,1);//this绑定到当前对象，即point对象上
console.log(point);//{x: 1, y: 1, moveTo: ƒ}



//三：构造函数中的this
//构造函数中的this指代通过new新创建的对象
function Point(x,y) {
    this.x = x;
    this.y = y;
}
var p = new Point(2,3);
console.log(p);//Point {x: 2, y: 3}

Point(5,6);//结果是什么情况   undefined

Point(5,6);//结果是什么情况
console.log(window.x,window.y);//5  6




//四、间接调用中的this（call、apply）
//call 实例1
objA = {name:"AA",x:1};
objB = {name:"BB",x:5};
objA.test = function () {
    console.log(this.name,this.x);
};

objA.test();//AA 1
objA.test.call(objB);//BB 5

//call实例2
var bird = {
    name:"polly",
    fly:function(m,n){
       console.log("i'm:"+this.name+" i can fly ___",m,n);
    }
  };
  var me = {
      name:"QL"
  };
  bird.fly(5,6);//i'm:polly i can fly ___ 5 6
  bird.fly.call(me,7,8);//i'm:QL i can fly ___ 7 8








// Part1 方法中函数嵌套 this缺陷，
//this不进行作用域传递（函数嵌套时的this缺陷）
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        //内部嵌套函数
        function moveToX() {
            this.x = x;//this绑定到了哪里？  绑定到window上
        }
        //内部嵌套函数
        function moveToY() {
            this.y = y;//this绑定到了哪里？  绑定到window上
        }
        moveToX();//moveToX.call(this);通过间接调用来解决
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 0, y: 0, moveTo: ƒ}
console.log(window.x,window.y);//2 2



//解决方法
//一：软绑定
var point = {
    x:0,
    y:0,
    moveTo:function (x,y) {
        var that = this;//关键的一行，软绑定
        //内部嵌套函数
        function moveToX() {
            that.x = x;//this改为that
        }
        //内部嵌套函数
        function moveToY() {
            that.y = y;//this绑定到了哪里？
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 2, y: 2, moveTo: ƒ}
console.log(window.x,window.y);//undefined  undefined



//二：通过call和apply来解决
var point = {
    x:0,y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;
        }
        function moveToY() {
            this.y = y;
        }
        moveToX.call(this);//->this.moveToX()->point.MoveToX()
        moveToY();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 2, y: 0, moveTo: ƒ}


var point = {
    x:0,
    y:0,
    moveTo:function(x,y){
        function moveTox(){
            this.x = x;
        }
        function moveToy(){
            this.y = y;
        }
        moveTox.call(this);
        moveToy.call(this);
    }
 };
 point.moveTo(2,2);
 console.log(point);//{x: 2, y: 2, moveTo: ƒ}



//三：通过bind来解决
var point = {
    x:0,y:0,
    moveTo:function (x,y) {
        function moveToX() {
            this.x = x;
        }
        function moveToY() {
            this.y = y;
        }
        moveToX.bind(point)();
        moveToY.bind(point)();
    }
};
point.moveTo(2,2);
console.log(point);//{x: 2, y: 2, moveTo: ƒ}






function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX(x);
        moveY(y);
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);//输出为Point{x:2,y:3}没有移动

//解决方法一
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        var that = this;//此处that为实例化出来的p对象
        function moveX(x) {
            that.x+=x;//this改为that
        }
        function moveY(y) {
            that.y+=y;//this改为that
        }
        moveX(x);
        moveY(y);
    }
}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);//输出为Point {x: 3, y: 4, moveXY: ƒ}，移动了(1,1)




//解决方法二call
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX.call(this,x);
        moveY.call(this,y);
    }

}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);//输出为Point {x: 3, y: 4, moveXY: ƒ}，移动了(1,1)


//解决方法三bind
function Point(x,y) {
    this.x = x;
    this.y = y;
    this.moveXY = function (x,y) {
        function moveX(x) {
            this.x+=x;
        }
        function moveY(y) {
            this.y+=y;
        }
        moveX.bind(this,x)();
        moveY.bind(this,y)();
    }

}
var p = new Point(2,3);
p.moveXY(1,1);
console.log(p);
//Point {x: 3, y: 4, moveXY: ƒ}







//进行作用域传递
var a = 1;
function f1(){
     var b = 2;
     function f2(){
         console.log(a,b);
     }
     f2();
}
f1();//1  2



var a = 1;
function f1(){
     var b = 2;
     function f2(){
         console.log(a,b，c);//VM138:5 Uncaught ReferenceError: c is not defined
         //at f2 (<anonymous>:5:26)
         //at f1 (<anonymous>:7:6)
         //at <anonymous>:9:1
         //报错，从底层向上调用，
     }
     f2();
}
f1();


function thisTest(){
    var a=b=2;
}
thisTest();
console.log(b);
//2

//相当于
function thisTest(){
    var a=2;//局部变量，全局访问不到
    b=2;//全局变量
}
thisTest();
console.log(b);//2