//练习：写一个JS对象，包括自己的姓名、年龄，和一个方法，调用这个方法
var me = {
    name:"牛文潇",
    sex:'女生',
    age:18,
    show:function(){
       console.log("我是"+this.name+"今年"+this.age+"，是"+this.sex);
    }
 }
 me.show();//我是牛文潇今年18，是女生
 console.log(me.name);//牛文潇


 //自定义对象
 Person = function(name){
    this.name = name;
 }
 var p = new Person("张三");
 p.name;//张三   




 var i = new String("str");          // String Object
 var h = new Number(1);              // Number Object
 var g = new Boolean(true);          // Boolean Object
 var j = new Object({name : "Tom"}); // Object Object
 var k = new Array([1, 2, 3, 4]);    // Array Object
 var l = new Date();                 // Date Object
 var m = new Error();
 var n = new Function();
 var o = new RegExp("\\d");
 console.log(typeof i);//object
 console.log(typeof h);//object
 console.log(typeof g);//object
 console.log(typeof j);//object
 console.log(typeof k);//object
 console.log(typeof l);//object
 console.log(typeof m);//object
 console.log(typeof n);//function
 console.log(typeof o);//object






console.log(typeof Array);//function
console.log(typeof Function);//function
console.log(typeof Date);//function
console.log(typeof Number);//function
console.log(typeof String);//function
console.log(typeof Boolean);//function
console.log(typeof Math);//object
console.log(typeof JSON);//object



console.log(Object instanceof Function);//true
console.log(Object instanceof Object);//true
console.log(Boolean instanceof Function);//true
console.log(Boolean instanceof Object);//true
console.log(String instanceof Function);//true
console.log(String instanceof Object);//true
console.log(Number instanceof Function);//true
console.log(Number instanceof Object);//true
console.log(new Function() instanceof Function);//true
console.log(new (new Function()) instanceof Function);//false
console.log(new (new Function()) instanceof Object);//true
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




//访问器属性
var o = {
    _x:1.0,
    get x(){
       return this._x;
    },
    set x(val){
       this._x = val;
    }
  };
  console.log(o._x);//1
  o.x = 2;
  console.log(o.x,o._x);//2  2

//如果只有getter方法那么是只读属性，如果只有setter方法，
//则是一个只写属性，读取时返回undefined 

//访问器属性 实例二 只读
  var o = {
    _x:1.0,
    get x(){
        return this._x;
    }
};
console.log(o.x);//1
o.x = 2;
console.log(o.x,o._x);//1  1


var p1 = {
    _name:"zhangsan", 
    _age:20,
    set age(val){
       if(val>0 && val<120){
          this.age = val;
       }
       else{
          console.log("请设置正常的年龄");
       }
    },
    get age(){
       return this._age;
    }
  };
  p1.age = 150;
  console.log(p1.age);
  //请设置正常的年龄
  //20



  var o = {
    x:2
  }
  o.__proto__===Object.prototype;//true

  var o2 = Object.create(o);
  o2.__proto__=== o;//true


var Person = function(name){
    this.name = name;
}
var p = new Person("abc");
p.__proto__ === Person.prototype;//true



var o = {
    x:2
  }
//可以o.x访问，也可以o["x"]

//访问所有属性
var o = {
    x1:2,
    x2:5,
    x3:8,
    x4:9
  }
  for(var i = 1;i<=4;i++){
       console.log(o["x"+i]);
  }
  //2
  //5
  //8 
  //9



  var obj = {};
  obj.x = 2;//直接添加属性
  console.log(obj.x);//通过.访问属性    2
  obj.x = 5;//设置属性
  console.log(obj["x"]);//通过[]访问属性    5
  delete obj.x;//删除属性
  console.log(obj.x);//undefined



  var obj2 = {
    id_1:2,
    id_2:4,
    id_3:6,
    id_4:8,
    id_5:10
};
for(var i = 1;i<=5;i++){
    console.log(obj2["id_"+i]);
 }
 //2
 //4
 //6
 //8
 //10



 var obj3 = {};
for(var i=0;i<10;i++){
    obj3.i = i;
}
console.log(obj3);
//{i:9}     __proto__:Object



var obj4 = {};
for(var i=0;i<10;i++){
    obj4[i] = i;
}
console.log(obj3);
//{0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9}
