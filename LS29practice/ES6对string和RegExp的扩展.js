//ES6对string的拓扩展
// ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历
for (let codePoint of 'foo') {
    console.log(codePoint)
}
// "f"
// "o"
// "o"


//ES6中提供新的方法用于查找、判断和生成字符串
var s = 'Hello world!';
s.startsWith('Hello'); // true
s.endsWith('!'); // true
s.includes('o'); // true

//第二个参数，表示开始搜索的位置
var s = 'Hello world!';
s.startsWith('world', 6); // true
s.endsWith('Hello', 5); // true
s.includes('Hello', 6); // false


//repeat方法返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3); // "xxx"
'hello'.repeat(2); // "hellohello"
'na'.repeat(0); // ""
//参数如果是小数，会被取整。
'na'.repeat(2.9); // "nana"
//如果repeat的参数是负数或者Infinity，会报错。
'na'.repeat(Infinity);
// RangeError
'na'.repeat(-1);
// RangeError



//////////////////////////////////////////////////////////////////////////////////////////////////////////
//ES6对RegExp的扩展

//在ES5中，RegExp构造函数的参数有两种情况。
//第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
//第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;
//但是，ES5不允许此时使用第二个参数，添加修饰符，否则会报错。
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

//ES6改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。
// 而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
new RegExp(/abc/ig, 'i').flags// "i"

//（粘连sticky）修饰符
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s); // ["aaa"]
r2.exec(s); // ["aaa"]
r1.exec(s); // ["aa"]
r2.exec(s); // null
//上面代码有两个正则表达式，一个使用g修饰符，另一个使用y修饰符。
// 这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是_aa_a。
//由于g修饰没有位置要求，所以第二次执行会返回结果，而y修饰符要求匹配必须从头部开始，所以返回null。

var r = /hello\d/y;
r.sticky // true

// ES5的source属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6的flags属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'
