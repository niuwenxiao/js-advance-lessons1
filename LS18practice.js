//创建数组
//一：通过字面量的方式直接创建，直接量中的值可以是任意的表达式
var arr1 = [1,2,3,"4"];

//二：通过Array构造函数来创建数组对象，要注意传递的参数
var arr2 = new Array(5);
console.log(arr2);//构建长度为5的空数组

var arr2 = new Array(5);
for(var i=0;i<arr2.length;i++){arr2[i] = i;}
console.log(arr2);//(5)[0,1,2,3,4]


var arr4 = new Array("5");
console.log(arr4);//["5"]


var arr3 = new Array(1,2,3,4);
console.log(arr3);//[1,2,3,4]


var arr22 = [];
for(var i=0;i<5;i++){
	document.onclick = function(){
		arr22[i] = i;
	}
}//异步执行，不是同一个栈，点击一下，结果(6) [empty × 5, 5]
//5:5
//length:6
//__proto__:Array(0)




//数组直接量中的值不一定要是常量，可以是任意的表达式
var base = 1024;
var table = [base,base+1,base+2,base+3];
console.log(table);//(4) [1024, 1025, 1026, 1027]


//也可包含对象直接量或其他数组直接量
var b = [[1,{y:2}],[2,{x:3}]];



var a3 = [1,2,3];
var a4 = a3;
a4 = [];
console.log(a3,a4);//(3) [1, 2, 3]       []  
//指向不同空间


var a1 = [1,2,3];
var a2 = a1;
a2.length = 0;
console.log(a1,a2);//[]   []



//增删改查
//增直接添加元素就行
//删delete删的不彻底，长度没有变，可以pop或者直接改变length
var a = ["hello"];
a[1] = 3.14;//增：直接添加数组元素，通过方法添加元素参见后续章节
a[2] = "world";
console.log("删除a[2]前的数组a",a);
delete a[2];//删：思考此时数组长度是2还是3？如何彻底删除？直接修改length与pop方法
console.log("删除a[2]后的数组a",a);
a[0] = "XX";//改：修改数组元素a[0]
console.log(a[0]);//查:看数组中的元素，索引从0开始

//删除a[2]前的数组a (3) ["hello", 3.14, "world"]
//删除a[2]后的数组a (3) ["hello", 3.14, empty]
//xx




var i=2,b=[];
b[i]=3;
b[i+1]="YY";
b[b[i]] = b[0];
console.log(b);//(4) [empty × 2, 3, undefined]



//数组是对象的特殊形式，可以为数组添加对象属性，对于0至2的32次方之外的数，将作为普  通对象的键来对待，
//数组特别之处在于，当使用使用2的32次方以内的非负整数作为属性名时（包括类型转换的数   字），数组会自动维护其length属性，作为数组的元素，而不是数组对象的属性

var a = [];
a[-1.23] = true; //创建一个名为“-1,23”的属性，正的1.23也是属性
a["100"] = 0;   // 数组的第101个元素，隐式类型转换
a[1.00] = "Hi"; //和a[1]相当
console.log(a.length);//101
console.log(a);//(101) [empty, "Hi", empty × 98, 0, -1.23: true]，-1.23冒号键值对



function f(){
    console.log(arguments);
 }
 f(1,2,3,"xxx");
 //(4) [1, 2, 3, "xxx", callee: ƒ, Symbol(Symbol.iterator): ƒ]




//稀疏数组与多维数组
//稀疏数组是包含从0开始的不连续索引的数组，length值大于实际定义的元素的个数
//遍历稀疏数组时，注意的跳过无元素项的问题
var a1 = [,"abc"];
console.log(a1.length);//2

for(var i in a1){
    console.log(i,a1[i]);//1  abc         遍历不到a1[0]
}
console.log(0 in a1,1 in a1);//false   true



var a3 = [,,];
console.log(a3.length);//2

console.log(["a","b"].length);//2
console.log(["a","b",].length);//2
console.log(["a","b",,].length);//3




// 多维数组 实例一 矩形数组和交错数组
var table = new Array(5);
for(var i=0;i<table.length;i++){
    table[i] = new Array(5);//若是table[i] = new Array(i);
}

for(var row=0;row<table.length;row++){
    for(var col=0;col<table[row].length;col++){
        table[row][col]=row*col;
    }
}
var product = table[2][4];
console.log(table);
//(5) [Array(5), Array(5), Array(5), Array(5), Array(5)]
//0:(5) [0, 0, 0, 0, 0]
//1:(5) [0, 1, 2, 3, 4]
//2:(5)[0,2,4,6,8]
//3:(5)[0,3,6,9,12]
//4:(5)[0,4,8,12,16]
//length；5
//__proto__:Array(0)


// 合并一起的写法
var table = new Array(5);
for(var i=0;i<table.length;i++){
    table[i] = new Array(5);//若是table[i] = new Array(i);
    for(var col=0;col<table[i].length;col++){
        table[i][col]=i*col;
    }
}
var product = table[2][4];
console.log(table);






//Part1  数组的静态方法     Array.from(...) 、Array.isArray(...) 、Array.of(...)等
const bar = ["a", "b", "c"];
Array.from(bar);// ["a", "b", "c"]
Array.from('foo');// ["f", "o", "o"]

Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]


var arr1 = [1,3,4];
console.log(Array.isArray(arr1));//true

function f(){
    console.log(Array.isArray(arguments));
 }
 f(1,2,3,"xxx");//false


 arguments.pop()不对，argument并不是数组
//数组原型方法
 Array.prototype.pop.call(arguments);//正确





//Part2  数组添加删除元素的原型方法 破坏性
//Array.prototype.shift
var arr2 = [1,3,5,7];
var shiftElement = arr2.shift();//返回去除的元素
console.log(shiftElement,arr2);//(3) [3, 5, 7]

var newLength = arr2.unshift(1,2);//返回新的数组长度
console.log(newLength,arr2);//(5) [1, 2, 3, 5, 7]

var popElement = arr2.pop();//返回pop出去的元素
console.log(popElement,arr2);//(4) [1, 2, 3, 5]

var newLength = arr2.push(77,88);//返回新的数组长度
console.log(newLength,arr2);//(6) [1, 2, 3, 5, 77, 88]




//通过push将两个数组组合成一个数组
var arr3 = ["a","b"];
var arr4 = ["c","d"];
Array.prototype.push.apply(arr3,arr4);
console.log(arr3);//(4) ["a", "b", "c", "d"]


//splice 从start开始，移除deleteCount个元素，并插入给定的元素
var arr5 = ["a","b","c","d"];
var spliceElements = arr5.splice(1,2,"x");//返回切掉的数组
console.log(spliceElements,arr5);//["b","c"]   ["a","x","d"]



//排序和颠倒元素顺序 破坏性
//Array.prototype.reverse()
var arr1 = [1,2,3];
arr1.reverse();
console.log(arr1);//[3,2,1]




//Array.prototype.sort(compareFunction？)
var arr2 = ["banana","apple","pear","orange"];
arr2.sort();
console.log(arr2);//["apple", "banana", "orange", "pear"]


var arr3 = [-1,-20,7,50];
arr3.sort();
console.log(arr3);//[-1, -20, 50, 7]
//并不是我们所预想的那样按照从小到大的顺序，解决方法
//arr3.sort(function (a,b) {return a-b;});//对于数字类型，大于0则交换，冒泡排序
//arr3.sort(function (a,b) {return a>b;});//对于布尔类型，true则交换，冒泡排序




//合并、切分和连接 非破坏性
//Array.prototype.concat(arr1?,arr2?,...)
var arr4 = ["banana","apple"];
var arr5 = ["pear","orange"];
var newArray = arr4.concat(arr5);
console.log(newArray,arr4,arr5);
//["banana", "apple", "pear", "orange"] ["banana", "apple"]   ["pear", "orange"]




//Array.prototype.slice(begin?,end?)注意：不要和splice弄混了
var arr6 = [1,2,3,4,5];
var newArray = arr6.slice(2,4);
console.log(newArray,arr6);//[3,4]  [1,2,3,4,5]
var newArray2 = arr6.slice(2);
console.log(newArray2,arr6);//[3,4,5]  [1,2,3,4,5]




//Array.prototype.join(separator?)
var arr7 = [3,4,5];
var joinReturn = arr7.join("--");//返回了个什么类型？
console.log(joinReturn,arr7);//3--4--5     [3,4,5]
console.log(typeof joinReturn);//string
//注意：稀疏数组调用join
console.log([3,,,,,,5].join("*"));//3******5



//值的查找 非破坏性
//Array.prototype.indexOf(searchValue,startIndex?)
var arr8 = [1,3,5,5,7,9,5];
console.log(arr8.indexOf(5));//2
console.log(arr8.indexOf(5,3));//3
console.log(arr8.indexOf(5,5));//6




//Array.prototype.lastIndexOf(searchElement,startIndex?)
console.log(arr8.lastIndexOf(5));//6
console.log(arr8.lastIndexOf(5,3));//3
console.log(arr8.lastIndexOf(5,5));//3





//Part1111111 数组原型方法（迭代-非破坏性-检测方法）thisValue可以指定callback中的this
// Array.prototype.forEach(callback,thisValue?) //注意并不返回新的数组
var arr1= [2,5,8];
arr1.forEach(function (a) {
    if(a>3){
        console.log(a,"大于3");
    }else {
        console.log(a,"不大于3");
    }
});
console.log(arr1);
//2 "不大于3"
//5 "大于3"
//8  "大于3"
//(3)[2,5,8]



//映射
var arr2= [1,3,5,7,9];
var newArray = arr2.map(function (a) {
    return a*a;
});
console.log(newArray,arr2);//[1,9,25,49,81]   [1,3,5,7,9]



//数组相关的高阶函数
//数组原型方法（迭代-非破坏性-检测方法）
//- Array.prototype.forEach(callback,thisValue?) 
//- Array.prototype.every(callback,thisValue?) 若有不满足的，立即返回false，不再后续迭代- 
//Array.prototype.some(callback,thisValue?) 若有满足的，立即返回true，不再后续迭代
//数组原型方法（迭代-非破坏性-转换方法）
//- Array.prototype.map(callback,thisValue?)
//- Array.prototype.filter(callback,thisValue?)
//数组原型方法（迭代-非破坏性-归约方法）
//- Array.prototype.reduce(element,initialValue?)
//- Array.prototype.reduceRight(callback,initialValue?)
