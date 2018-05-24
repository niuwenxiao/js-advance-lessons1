//通过Object.create静态方法创建的对象的原型共享问题
//多个对象继承于一个原型时，存在原型共享（节省内存如共享方法，但也带来了共享问题）
var superObj = {
    x:1,
    y:2
};
var subObj_First = Object.create(superObj);
var subObj_Second = Object.create(superObj);
subObj_First.__proto__.x = 5;//若此行写为subObj_First.x = 5;结果又是如何？
console.log(subObj_Second.x);//5
//相当于他们的原型上是5


var superObj = {
    x:1,
    y:2
};
var subObj_First = Object.create(superObj);
var subObj_Second = Object.create(superObj);
subObj_First.x = 5;
console.log(subObj_Second.x);//1


var superObj = {
    show:function(){
        console.log(this.x,this.y);
    }
 };
 var subObj_First = Object.create(superObj);
 //var subObj_Second = Object.create(superObj);
 subObj_First.x = 1;
 subObj_First.y = 2;
 subObj_First.show();//1  2


 var superObj = {
    x:3,
    y:4,
    show:function(){
        console.log(this.x,this.y);
    }
 };
 var subObj_First = Object.create(superObj);
 subObj_First.show();//3  4





 function Person(name){
    this.name = name;
}
Person.prototype.age = 22;
Person.prototype.showName = function(){console.log(this.name);};
function Student(id){
    this.id = id;
}
Student.prototype = new Person("Mike");
var s1 = new Student(2017001);
var s2 = new Student(2017002);
console.log(s1.name,s1.age,s1.id);//Mike 22 2017001
console.log(s2.name,s2.age,s2.id);//Mike 22 2017002
s1.__proto__.name = "Jack";
console.log(s2.name);//Jack
s2.__proto__.__proto__.age = 99;
console.log(s2.age);//99

console.log(s1);//Student {id: 2017001}

console.log(s1.__proto__);//Person {name: "Jack"},因为刚才把名字改成了Jack

console.log(s1.__proto__.__proto__);//{age: 99, showName: ƒ, constructor: ƒ}






//JS实现继承的形式 一
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.showName = function(){console.log(this.name);};
function Student(name,age,id){
    Person.call(this,name,age);//等效于this.name = name;this.age = age
    this.id = id;
}
Student.prototype.__proto__ = Person.prototype;
var s1 = new Student("xxx",22,2017001);//实例化对象，这时this指向s1，this调用Person，person里的this指向s1，
console.log(s1);//Student {name: "xxx", age: 22, id: 2017001}
var s2 = new Student("www",23,2017002);
console.log(s2);//Student {name: "www", age: 23, id: 2017002}

//name属性添加到实例化的对象上




//JS实现继承的形式 二
function Person(name,age){
    this.name = name;
    this.age = age;
};
Person.prototype.showName = function(){
    console.log(this.name);
};
function Student(name,age,id){
    Person.call(this,name,age);
    this.id = id;
}
Student.prototype = Object.create(Person.prototype);//创建了一个以Person.prototype为原型的对象
// console.log(Person.prototype.constructor); //
// console.log(Student.prototype.constructor); //
Student.prototype.constructor = Student;
var s1 = new Student("xxx",22,2017001);
var s2 = new Student("www",23,2017002);





//静态方法实例与原型方法实例
var BaseClass = function() {};
BaseClass.prototype.f2 = function () {//原型方法
    console.log("This is a prototype method ");
};
BaseClass.f1 = function(){//定义静态方法
    console.log("This is a static method ");
};
BaseClass.f1();//This is a static method
var instance1 = new BaseClass();
instance1.f2();//This is a prototype method



Array.prototype.push()



var BaseClass = function() {};
BaseClass.prototype.method1 = function(){
    console.log("1 This is a method in Base.prototype");
};
var instance1 = new BaseClass();
instance1.method1();//1 This is a method in Base.prototype

instance1.method1 = function(){
    console.log("2 This is a method in instance1");
};
instance1.method1();//2 This is a method in instance1




var BaseClass = function() {
    this.method1 = function(){
        console.log('1 Defined by the "this" in the instance method');
    }
};
var instance1 = new BaseClass();
instance1.method1 = function(){
    console.log('2 Defined directly in the instance method');
};
BaseClass.prototype.method1 = function(){
    console.log('3 Defined by the prototype instance method ');
};
instance1.method1();//2 Defined directly in the instance method






//Part 1 constructor属性的应用
// 1 确定对象的构造函数名
function Foo() {}
var f = new Foo();
console.log(f.constructor.name);//Foo


// 2 创建相似对象
function Constr(name) {
    this.name = name;
}
var x = new Constr("Jack");
var y = new x.constructor("Mike");
console.log(y);
console.log(y instanceof Constr);
//Constr {name: "Mike"}   true



// 3 constructor可用于指定构造函数
function Person(area){
    this.type = 'person';
    this.area = area;
}
Person.prototype.sayArea = function(){
    console.log(this.area);
};
var Father = function(age){
    this.age = age;
};
Father.prototype = new Person('Beijin');
console.log(Person.prototype.constructor); //function person()，
//即ƒ Person(area){
//    this.type = 'person';
//    this.area = area;
//}
console.log(Father.prototype.constructor); //function person()
//即ƒ Person(area){
//    this.type = 'person';
//    this.area = area;
//}
Father.prototype.constructor = Father;     //修正constructor指向
console.log(Father.prototype.constructor); //function father()
//即f (age){
//    this.age = age;
//}




//Part2 公有属性、私有属性、特权方法
function A(id) {
    this.publicId = id;
    var privateId = 456;
    this.getId = function () {
        console.log(this.publicId,privateId);
    };
}
var a = new A(123);
console.log(a.publicId);//123
// console.log(a.privateId);
a.getId();//123  456




function Person(name){
	this.name = name;
}
Person.prototype.getName = function(){}
var p = new Person("jack");
console.log(p.__proto__ === Person.prototype);//true 
console.log(p.__proto__ === p.constructor.prototype);//true
console.log(Object.prototype === p.constructor.prototype);//false
console.log(({getName:function(){}}).__proto__ === p.constructor.prototype);//false





