//生成对象的3种方式：字面量直接生成、Object静态方法、构造函数实例化对象
var obj1 = { x:1};
var obj2 = Object.create(obj1);
obj2.y = 2;

var Obj3 = function(){this.z = 3;}
var obj3 = new Obj3;
console.log(obj1,obj2,obj3);
//{x: 1} {y: 2} Obj3 {z: 3}



var objProto = {
    z:3
};

var obj = Object.create(objProto);
obj.x = 1;
obj.y = 2;

console.log(obj.x);//1
console.log(obj.y);//2
console.log(obj.z);//3

console.log(obj.toString);//原型链上有toString属性
//ƒ toString() { [native code] }

for(var k in obj){//通过for...in遍历所有原型链上的属性
    console.log(k,obj[k]);//不能遍历到toString
}
//x 1
//y 2
//z 3



//JS对象属性（数据属性）的特性
//- 属性的值（[[value]]），对应属性的值
//- 可写特性（[[writable]]）	，确定属性是否可写性
//- 可配置特性（[[configurable]]），确定属性是否能删除和其他特性是否可配置
//- 可枚举特性（[[enumerable]]），属性是否可枚举

//设置属性的特性（defineProperty方法设置enumerable）
var obj = {
    x:1,
    y:2
 };
 Object.defineProperty(obj,'x',{enumerable:false});
 for(var k in obj){
     console.log(k,obj[k]);
 }
 //y 2


 var obj = {
    x:1,
    y:2
 };
 //Object.defineProperty(obj,'x',{enumerable:false});
 for(var k in obj){
     console.log(k,obj[k]);
 }
 //x 1
 //y 2


 var person = {name:"Jack"};
Object.defineProperty(person,"name",{
     writable:false,
     configurable:false,//不能删除和配置
     enumerable:true,
     value:"Mike"
});
console.log(person.name);//Mike
person.name = "Lucy";//因为writable是false，所以不能更改
console.log(person.name);//Mike
delete person.name;//configurable是false，不能删除
console.log(person.name);//Mike



var person = {name:"Jack"};
Object.defineProperty(person,"name",{
     writable:true,
     configurable:false,
     enumerable:true,
     value:"Mike"
});
console.log(person.name);//Mike
person.name = "Lucy";
console.log(person.name);//Lucy
delete person.name;
console.log(person.name);//Lucy



var person = {name:"Jack"};
Object.defineProperty(person,"name",{
     writable:false,
     configurable:true,
     enumerable:true,
     value:"Mike"
});
console.log(person.name);//Mike
person.name = "Lucy";
console.log(person.name);//Mike
delete person.name;
console.log(person.name);//undefined



var obj = {
    x:1,
    y:2
};
//直接添加的属性，其所有特性默认都是true
obj.z = 3;

//通过Object.defineProperty方法添加的属性，除了手动修改，其所有特性默认都是false
Object.defineProperty(obj,"w",{value:456,configurable:true});//writable,enumerable没有指定，所以默认为false
for(var k in obj){
    console.log(k,obj[k]);
}
//console.log(obj.w);//有w，但上边for...in遍历不到
//x 1
//y 2
//z 3


var obj = {
    x:1,
    y:2
};
//直接添加的属性，其所有特性默认都是true
obj.z = 3;

//通过Object.defineProperty方法添加的属性，除了手动修改，其所有特性默认都是false
Object.defineProperty(obj,"w",{value:456,configurable:true});//writable,enumerable没有指定，所以默认为false
for(var k in obj){
    console.log(k,obj[k]);
}
console.log(obj.w);//有w，但上边for...in遍历不到
//x 1
//y 2
//z 3
//789




//通过Object.defineProperty来添加和改变的get /set的属性特性
//添加访问器
var obj1={
    _name:"Lucy"
};
Object.defineProperty(obj1,"name",{
    get:function (){//只定义了get 特性，因此只能读不能写
        return this._name;
    }
});
console.log(obj1.name);//"Lucy"
obj1.name="jack";//只定义了getter访问器，因此写入失效
console.log(obj1.name);//"Lucy"



var obj2={
    _name:"Lucy",
    set name(val){this._name = val;},
    get name(){return this._name;}
};
Object.defineProperty(obj2,"name",{
    get:function (){
        return this._name+"_hihi";
    },
    set:function (val) {
        this._name = val+"_haha";
    }
});
console.log(obj2.name);//Lucy_hihi
obj2.name="jack";
console.log(obj2.name);//jack_haha_hihi



//属性特性描述符是一个用来查看对象属性的特性的对象
//该对象包含4个属性，对应4个特性，通过getOwnPropertyDescriptor方法获得
var obj1 = {x:1};
Object.defineProperty(obj1,'y',{value:2,writable:false});
var xDes = Object.getOwnPropertyDescriptor(obj1,'x');
var yDes = Object.getOwnPropertyDescriptor(obj1,'y');
console.log(xDes,yDes);
//{value: 1, writable: true, enumerable: true, configurable: true} 
//{value: 2, writable: false, enumerable: false, configurable: false}





// 要求掌握下述方法的使用
// Object.keys() 返回所有自有（非继承）可枚举属性的键
// Object.getOwnPropertyNames()返回所有自有（非继承）键，包括不可枚举
// Object.prototype.hasOwnProperty() 判断自身是否有该属性，不包括可枚举的属性              //不是静态方法
// Object.prototype.propertyIsEnumerable() 判断自身是否有该属性并检测该属性是否可枚举      //不是静态方法
// in  检测一个对象是否有某个属性，包括继承的属性，包括不可枚举的属性
// for...in 遍历一个对象的属性，包括继承的属性，但不包括不可枚举的属性
// 思考Object静态方法和Object.prototype原型方法的区别（都共享了方法，使用上有什么区别）

var obj2 = Object.create({x:1});
obj2.y = 2;
Object.keys(obj2);//["y"],不包括可枚举

Object.defineProperty(obj2,'z',{value:3});
Object.getOwnPropertyDescriptor(obj2,'z');//{value: 3, writable: false, enumerable: false, configurable: false}

Object.getOwnPropertyNames(obj2);//["y","z"]，包括可枚举


for(var k in obj2){
    console.log(k,obj2[k]);
}
//y 2
//x 1
//先是自身的，再是继承的，不包括不可枚举的




var o3 = {};
o3.y = "yyy";
Object.defineProperty(o3,"x",
    {configurable:true,enumerable:false,writable:true,value:"xxx"}
);
console.log(Object.keys(o3));//是否包含可枚举属性的键？                         //["y"]
console.log(Object.getOwnPropertyNames(o3));//是否包含可枚举属性的键？          //["y","x"]

console.log(o3.hasOwnProperty("x"));//true
console.log(o3.propertyIsEnumerable("x"));//false





//密封是建立在不可扩展的基础上，configurable是false，不是冻结的，
//冻结后writable是false
