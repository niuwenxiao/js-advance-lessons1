//解构赋值的常见应用及注意事项


// 1 交换变量的值
var [x,y,z,w]=["a","c","d","b"];
[x,y,z,w]=[x,w,y,z];
console.log(x,y,z,w);//a b c d


var [x,y] = ["a","b"];
[x, y] = [y, x];
console.log(x,y);//b,a
//上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。


// 2 从函数返回多个值
// 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。
// 有了解构赋值，取出这些值就非常方便

// 返回一个数组
function example() {
    return [1, 2, 3];
}
var [a, b, c] = example();
console.log(a,b,c);//1 2 3


// 返回一个对象,解构所有属性
function example() {
    return {
        foo: 1,
        bar: 2
    };
}
var { foo, bar } = example();
console.log(foo,bar);//1 2


function example() {
    return {
        foo: undefined,
        bar: null
    };
}
var { foo=1, bar=2 } = example();
console.log(foo,bar);//1  null



// 3 函数参数的定义
//解构赋值可以方便地将一组参数与变量名对应起来。
// 参数是一组有次序的值
function f([x, y, z]) {
    console.log(x);
    console.log(y);
    console.log(z);
}
f([1, 2, 3]);//1 2 3

// 参数是一组无次序的值
function f({x, y, z}) {
    console.log(x);
    console.log(y);
    console.log(z);
}
f({z: 3, y: 2, x: 1});//1 2 3




// 4 提取JSON数据
//解构赋值对提取JSON对象中的数据，尤其有用。
var jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]
//上面代码可以快速提取JSON数据的值。


//5 函数参数的默认值
jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
// ... more config
}) {
// ... do stuff
};
//指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。




//注意事项

//对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道
//由此带来的问题是，如果模式中出现圆括号怎么处理，ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号
//建议只要有可能，就不要在模式中放置圆括号


// 以下三种解构赋值不得使用圆括号。
//（1）变量声明语句中，不能带有圆括号。
// 全部报错
var [(a)] = [1];
var {x: (c)} = {};
var ({x: c}) = {};
var {(x: c)} = {};
var {(x): c} = {};
var { o: ({ p: p }) } = { o: { p: 2 } };
//上面三个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号

//（2）函数参数中，模式不能带有圆括号
//函数参数也属于变量声明，因此不能带有圆括号。
// 报错
function f([(z)]) { return z; }

//（3）赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
//上面代码将整个模式放在圆括号之中，导致报错。
// 报错
[({ p: a }), { x: c }] = [{}, {}];
//上面代码将嵌套模式的一层，放在圆括号之中，导致报错。




//可以使用圆括号的情况：赋值语句的非模式部分，可以使用圆括号。
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
// 上面三行语句都可以正确执行,它们的圆括号都不属于模式的一部分。
// 第一行语句中，模式是取数组的第一个成员，跟圆括号无关
// 第二行语句中，模式是p，而不是d
// 第三行语句与第一行语句的性质一致
// 即括号扩的是值而不是模式时可以使用括号，但建议能不用括号的尽量不用，避免产生歧义















