var i = 1;
var b = ++i + ++i + ++i;
b;
//9


var x = 1;
console.log(x+1);//2

var x = 1;
console.log(x+=1);//2

var x = "1";
console.log(x+1);//11，转换成字符串类型

var x = "1";
console.log(x+=1);//11

var x = "1";
x /= 1;
console.log(x);//1，Number类型


//判等
console.log(3===3);//true
console.log(3==="3");//false
console.log(3=="3");//true
console.log(3==new String(3));//true
console.log(3===new String(3));//false




//obj1和obj2指向不同空间，不是一个对象
var obj1 = new String("xyz");
var obj2 = new String("xyz");
console.log("xyz"===obj1);//false
console.log(obj1 == obj2);//false
console.log(obj1 === obj2);//false
console.log(obj1 == new String("xyz"));//false，后面是又定义了一个对象，指向不同空间

//obj1和obj2指向不同空间，一个对象
var obj1 = new String("xyz");
var obj2 = obj1;
console.log("xyz"===obj1);//false
console.log(obj1 == obj2);//true
console.log(obj1 === obj2);//true
console.log(obj1 == new String("xyz"));//false



//把感叹号变成等号，判断，然后取反
var obj1 = new String("xyz");
var obj2 = new String("xyz");
console.log("xyz"!=obj1);//false
console.log(obj1 !== obj2);//true
console.log(obj1 != obj2);//true
console.log(obj1 != new String("xyz"));//true


var obj1 = {x:2,y:[1],z:false};
var obj2 = {x:2,y:[1],z:new Boolean(false)};
console.log(obj1.z == obj2.z);//true

var obj1 = {x:2,y:[1],z:false};
var obj2 = {x:2,y:[1],z:new Boolean(false)};
console.log(obj1.x == obj2.x)//true
console.log(obj1.x === obj2.x)//true
console.log(obj1.y == obj2.y)//false
console.log(obj1.y === obj2.y)//false
console.log(obj1.z == obj2.z)//true
console.log(obj1.z === obj2.z)//false



//引用类型转换成基本类型
console.log(2 == 2);//true
console.log(new Number(2) == new Number(2));//false
console.log(2 == new Number(2));//ture

//&&全真则真，||全假则假
console.log(2>1&&4<5);//true
console.log(true&&(!2));//false
console.log(false&&("2" == 2));//false
console.log(false&&false);//false

console.log(2>1||4<5);//true
console.log(true||(!2));//true
console.log(false||("2" == 2));//true
console.log(false||false);//false

//操作数非布尔类型，&&短路原则：转换后的左操作数若为true，
//则直接返回原始右操作数，若为false，则直接返回原始左操作数
console.log(2&&4);//4
console.log(0&&4);//0
console.log({x:2}&&{name:"Jack"});//{name:"Jack"}
console.log(null&&"hello");//null
console.log({}&&"world");//world

var a = (new Boolean(false)&&23);
console.log(a,typeof a);//23 "number"

//操作数非布尔类型，||短路原则:转换后的左操作数若为true，
//则直接返回原始左操作数，若为false则直接返回原始右操作数
console.log(2||4);//2
console.log(0||4);//4
console.log({x:2}||{name:"Jack"});//{x:2}
console.log(null||"hello");//hello
console.log({}||"world");//{}

var a = (new Boolean(false)||23);
console.log(a,typeof a);
//Boolean {[[PrimitiveValue]]: false} "object"




var score = 76;
if(score>90){
    console.log("优");
}else if(score>75){
    console.log("良");
}else if(score>60){
    console.log("及格");
}else{
    console.log("不及格");
}
//通过&&和||的组合实现如上功能，注：小括号优先级最高
console.log((score>90&&"优")||(score>75&&"良")||(score>60&&"及格")||(score<60&&"不及格"));




var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));//6
console.log(sum(1,2));//c没有传值，undefined转化为布尔类型，c = 5，输出8
console.log(sum(1));//10
console.log(sum(1,0,0));//10，如果想让b = 0，c = 0呢？

//优化版本
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3));
console.log(sum(1,2));
console.log(sum(1));
console.log(sum(1,0,0));


//使用||实现返回值的限制（默认返回值）
function foo(a,b){
    return (a+b)||"和不能为0";
}
foo(-2,2);//和不能为0
