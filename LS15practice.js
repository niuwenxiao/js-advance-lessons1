var Person = function(name){
    this.name = name;
}
var p1 = new Person("abc");
var p2 = new Person("def");
console.log(p1,p2);




//原型链
var proObj = {
    z:3
};

var obj = Object.create(proObj);
obj.x = 1;
obj.y = 2;

console.log(obj.x);//1
console.log(obj.y);//2
console.log(obj.z);//3

console.log("z" in obj);//true
console.log(obj.hasOwnProperty("z"));//false
//原型链属性操作
obj.z = 5;
console.log(obj.hasOwnProperty("z"));//true
console.log(obj.z);//5
console.log(proObj.z);//3

obj.z = 8;
console.log(obj.z);//8

delete obj.z;//true
console.log(obj.z);//3

//删除操作
delete obj.z;//true
console.log(obj.z);//still 3
//删除原型上的属性呢
delete  obj.__proto__.z;//或者delete proObj.z;
console.log(obj.z);//此时彻底没有z了，输出undefined

//注意：hasOwnProperty是原型方法
//调用的主体为obj,先在自身上找该方法，找不到的话去原型链上去找



function Person(age,name) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function () {
    console.log("Hi,i'm "+this.name);
};
var p1 = new Person(20,"Jack");
console.log(p1.name);//Jack
console.log(p1.age);//
p1.sayHi();//hi,i'mJack


function Person(age,name){
    this.age = age;
    this.name = name;
 }
 Person.prototype.sayHi = function(){
     console.log(this.name,this.age);
 };
 var p1 = new Person(23,"Mick");
 console.log(p1.name);//Mick
 console.log(p1.age);//23
 p1.sayHi();//Mick 23

 p1.__proto__===Person.prototype;//true

 Person.__proto__===Object.prototype;//false
 
 Person.__proto__===Function.prototype;//true



 


