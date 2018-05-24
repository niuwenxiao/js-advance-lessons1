var foo = function(){
    console.log(12);
}
console.log(foo instanceof object);//true


var arr = [1,2,3];
console.log(arr instanceof Array);//true
console.log(arr instanceof Object);//true


console.log(typeof 123);//number
console.log(typeof ture);//undefined
console.log(typeof "abc");//string
console.log(typeof null);//object
console.log(typeof undefined);//undefined


var a = 2;
var b = a;
a = 3;
console.log(b);//2


var obj_a = {v:"a"};
var obj_b = obj_a;
obj_b.v = "b";
console.log(obj_a,obj_b);//{v:"b"}{v:"b"}
obj_b = {v:"c"};
console.log(obj_a,obj_b);//{v:"b"}{v:"c"}


var obj1 = {key:2};
var obj2 = obj1;
obj2.key = 3;
console.log(obj1.key);//3
obj2 = {key:4};
console.log(obj1.key,obj2.key);//3 4


var c = [1,2];
var b = [1,2];
c == b;//false
c === b;//false
c = b;
c == b;//true
c === b;//true


var a = 123;
var b = new Number(123);
console.log(a === b);//false
console.log(a == b);//true


var a = 123;
function foo(x){
    x = 345;
}
foo(a);
console.log(a);//123


var a = {y:123};
function foo(x){
    x.y = 345;
    x = {y:456};
}
foo(a);
console.log(a.y);//345


var a = {y:123};
function foo(x){
    x = {y:456};
    x.y = 345;
}
foo(a);
console.log(a.y);//123

