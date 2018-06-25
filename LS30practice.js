//ES6新增的箭头函数
var max=(a,b)=> a>b?a:b;
max(5,6);//6

var f = function (v) {
    return v + 1;
};
f(2);//返回3

//等价于
var f = v => v + 1;//单参数可以不用（），单语句可以不用return关键字,
//也可以：var f = (v) => {return v + 1;};
f(2);//3


//复合语句的话，需要使用大括号(表示函数体)和对应的return语句进行返回;
//如果箭头函数不需要参数或需要多个参数时，就使用一个圆括号代表参数部分,
var f = () => 5;
// 等同于
var f = function () {
    return 5
};


var foo = (num1, num2) => {
    if (num1 > num2) {
        return num1 * 2;
    } else {
        return num2 * 2;
    }
};
//foo(2,3);
//foo(3,2);
// 等同于 ES5的写法
var foo = function (num1, num2) {
    if (num1 > num2) {
        return num1 * 2;
    } else {
        return num2 * 2;
    }
};
//foo(2,3);
//foo(3,2);


//箭头函数可以与变量解构结合使用
const full = ({ first, last }) => last + ' ' + first;
full({first:"Ming",last:"Li"});

// 等同于
function full({ first, last }) {
  return last + ' ' + first;
}
full({first:"Ming",last:"Li"});












