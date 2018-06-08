
//不用解构赋值方式定义变量
var a = 1;var b = 2;var c = 3;
console.log(a,b,c);

//用解构赋值方式定义变量
//Part 1111111111111111 数组的解构赋值
var [a, b, c] = [1, 2, 3];
console.log(a,b,c);


//数组的解构赋值
var [foo2]=[];
var [fee1,fee2]=[1];
console.log(foo2,fee2);//两个都没有赋值，故都是undefined


var [a,b]=[1,2];//使a=1，b=2，
//如何使a,b的值交换
[a,b]=[b,a];
//可以使用console.log验证一下



//let 也支持解构赋值
let [foo,[[bar],baz]] = [1,[[2],3]];
console.log(foo,bar,baz);//1 2 3

//
let [ , , xx] = ["foo", "bar", "baz"];
console.log(xx);// "baz"

let [x, , y] = [1, 2, 3];
console.log(x,y);//1 3


let [head, ...tail] = [1, 2, 3, 4];
console.log(head,tail);//1 [2, 3, 4]

let [d, e, ...f] = ['a'];
console.log(d,e,f);//"a" undefined []



//注意：如果解构不成功，变量的值就等于undefined
var [foo2] = [];
var [bar2, fee2] = [1];
console.log(foo2,fee2);//undefined undefined


//不完全解构的情况
let [x2, y2] = [1, 2, 3];
console.log(x2, y2);//1 2

let [a2, [b2], d2] = [1, [2, 3], 4];
console.log(a2, b2, d2);//1 2 4


//如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};




//解构赋值中的默认值
var [foo3 = true] = [];//foo3 为 true
[x3, y3 = 'b'] = ['a']; // ['a','b']
[x4, y4 = 'b'] = ['a',undefined]; // ['a','b']

// ES6内部使用严格相等运算符（===），判断一个位置是否有值。
// 所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
[x5, y5 = 'b'] = ['a',null];//['a',null],null===undefined是false，只有严等于undefined才等于默认值


function f2() {
    return 2;
}
let [x7 = f2()] = [1];
console.log(x7);//1



//默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [m1 = 1, n1 = m1] = []; // m1=1; n1=1
let [m2 = 1, n2 = m2] = [2]; // m2=2; n2=2
let [m3 = 1, n3 = m3] = [1, 2]; // m3=1; n3=2
//let [m4 = n4, n4 = 1] = []; // ReferenceError
console.log(m1,n1,m2,n2,m3,n3);//1 1 2 2 1 2




let a = [];
let b=[2,3,4];
[a[0],a[1],a[2]] = b;
console.log(a == b);//false

let a = [];
let b=[2,3,4];
a = b;
console.log(a == b);//true


let a = [];
let b=[1,2,3,4,5];
[a[0],,a[1],,a[2]] = b;
console.log(a);//[1,3,5]





//////////////////////////////////////////////////////////////////////////////////////
// 对象的解构与数组有一个重要的不同。\
// 数组的元素是按次序排列的，变量的取值由它的位置决定
// 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
var { bar2, foo2 } = { foo2: "ccc", bar2: "ddd" };//顺序不同，没关系
console.log(foo2,bar2);//ccc ddd


var { baz3 } = { foo3: "ccc", bar3: "ddd" };
console.log(baz3);//undefined



//左侧为键值对时,注意键值对赋值时的对应关系
var { foo4: baz4 } = { foo4: 'aaa', bar4: 'bbb' };
console.log(baz4);// "aaa"



let obj1 = { first: 'hello', last: 'world' };

let { first: f, last: l } = obj1;
console.log(f,l);//hello world


let { first, last } = obj1;
console.log(first,last);////hello world


//也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
var { foo6: baz6 } = { foo6: "aaa", bar6: "bbb" };
console.log(baz6);// "aaa"
//foo6 // error: foo is not defined
//上面代码中，真正被赋值的是变量baz6，而不是模式foo6











///////////////////////////////////////////////////////////////////////////////////////////
//字符串也可以解构赋值
const [a, b, c, d, e] = 'hello';//相当于将'hello'转成了["h","e","l","l","o"]后解构
console.log(a); // "h"
console.log(b); // "e"
console.log(c); // "l"
console.log(d); // "l"
console.log(e); // "o"

//类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length : len} = 'hello';
console.log(len); // 5


//解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let {toString: s1} = 123;
console.log(s1); //ƒ toString() { [native code] }

(123).toString();//"123"

s1 === Number.prototype.toString // true


let {toString: s2} = true;
(true).toString();//"true"
s2 === Boolean.prototype.toString // true

//上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值

//解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。
// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
// let { prop: x } = undefined; // TypeError
// let { prop: y } = null; // TypeError







////////////////////////////////////////////////////////////////////////////////////////////////////////
//函数参数的解构赋值
function add([x, y]){
    return x + y;
}
add([1, 2]); // 3


[[1, 2], [3, 4]].map(function([a, b]){return a + b;});
// [ 3, 7 ]
//箭头函数表示形式 [[1, 2], [3, 4]].map(([a, b]) => a + b);

/////
//函数参数的解构也可以使用默认值,下例中用了两次的解构赋值
function move1({x = 0, y = 0} = {}) {
    return [x, y];
}
console.log(move1({x: 3, y: 4})); // [3, 4]
console.log(move1({x: 3})); // [3, 0]
console.log(move1({})); // [0, 0]
console.log(move1()); // [0, 0]

///////
//注意，下面的写法会得到不一样的结果。
function move2({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}
console.log(move2({x: 3, y: 8})); // [3, 8]
console.log(move2({x: 3})); // [3, undefined]
console.log(move2({})); // [undefined, undefined]
console.log(move2()); // [0, 0]
//上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。


//undefined就会触发函数参数的默认值
[1, undefined, 3].map(function(x = 'yes') {return x;});
// [ 1, 'yes', 3 ]
//箭头函数表示形式 [1, undefined, 3].map((x = 'yes') => x);

















