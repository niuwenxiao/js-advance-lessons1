//JSON简介
//- JSON是一种轻量级的数据交换格式（其他数据格式，如XML等，也可作为数据的载体）
//- JSON的使用完全独立于编程语言的文本格式来存储和传输数据
//- 简洁和清晰的层次结构使得 JSON 成为理想的数据交换格式
//- 易于读写和解析，并可有效地提升网络传输效率（轻量）

//JSON与JS对象的关系
//- JS中一切都是对象（如何理解这句话），任何支持的类型都可以通过对象来表示
//- JSON 是 JS 对象的字符串形式的表示法，使用文本表示 JS 对象的信息，本质是一个字符串
// JSON 可以以字符串的形式表示 JS基本数据类型变量和对象（引用）类型变量

var obj1 = "xxx";
var obj2 = 23;
var obj3 = false;
var obj4 = { x: 1, y: 2, a: [1, 3, 5], b: "xyz" };
var obj5 = [123, 345];
var obj6 = [{ z: 3 }, [1, 2]];
var obj7 = {x:true};

var json1 = '"xxx"';
var json2 = '23';
var json3 = 'false';
var json4 = '{"x":1,"y":2,"a":[1,3,5],"b":"xyz"}';
var json5 = '[123,345]';//注意区别于：'["123","345"]'
var json6 = '[{"z":3},[1,2]]';
var json7 = '{"x":true}';//注意区别于：'{"x":"true"}'


// 在线测试工具 http://www.json.cn/

var j1 = '[{"name":"jack","obj":{"x":1,"y":2},"arr":[1,2,"3"]},2]';//RangeError: Invalid array length
var j2 = '{"x":1,"y":"2"}';//RangeError: Invalid array length

//思考：以上实例传递的都是属性，方法如何传递？回顾Function构造函数和创建函数的3种方式
var foo = new Function("x","y","return x>y?x:y;");
foo(2,3);

var af = ["x","y","return x<y?x:y;"];
var fee = new Function(af[0],af[1],af[2]);
fee(2,3);



// Part11111111111111111 JSON.stringfiy的基本用法
//转化为JSON 

// JSON.stringify 案例：复合数组转换为字符串
var a1 = [1,"x",true,{y:2,z:3}];
var jsonStrArr1 = JSON.stringify(a1);
console.log(jsonStrArr1);//[1,"x",true,{"y":2,"z":3}]
console.log(a1);//(4) [1, "x", true, {…}]

var a2 = ["1","x","true",{y:"2",z:3}]
var JSONStrArr2 = JSON.stringify(a2);
console.log(JSONStrArr2);//["1","x","true",{"y":"2","z":3}]
console.log(a2);//["1", "x", "true", {…}]


// JSON.stringify 案例:复合对象转换为字符串
var o1 = {
    a:[1,2],
    b:true,
    c:[3,4,"x",{y:34,z:56}],
    d:5,
    e:{name:"Jack"},
    f:function(){console.log(12);}, //注意函数序列化问题
    h:0x12
};
var jsonStr1 = JSON.stringify(o1);
console.log(jsonStr1);//{"a":[1,2],"b":true,"c":[3,4,"x",{"y":34,"z":56}],"d":5,"e":{"name":"Jack"},"h":18}
console.log(o1);//{a: Array(2), b: true, c: Array(4), d: 5, e: {…}, …}



// JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串，
// 如果指定了replacer是一个函数，则可以替换值，或者如果指定了replacer是一个数组，
// 则可选的仅包括指定的属性。

// JSON.stringify(value[, replacer [, space]])
// JSON.stringify 中的replacer回调

var o2 = {
    a:[1,2],
    b:true,
    c:[3,4,"x",{y:34,z:56}],
};
//replacer 节点转换函数，在值被转为字符串之前转换树节点的值
var jsonStr2 = JSON.stringify(o2,function (key,value) {
    if(value === true){
        value = false;
    }
    if((value instanceof Array)&&value.length == 4){
        value[0] = "Hi";
    }
    if(key === "a"){
        console.log("find key a");
        value = 12345;
    }
    if(key === "z"){
        console.log("find key z");
        value = "zzz";
    }
    return value;
});
console.log(jsonStr2);
console.log(o2);
//find key a
//find key z
//{"a":12345,"b":false,"c":["Hi",4,"x",{"y":34,"z":"zzz"}]}
//a:[1, 2]
//b:true
//c:["Hi"，4，"x",{y:34,z:56}]




function replacer(key, value) {
    if (typeof value === "string") {
        return undefined;//如果是null会怎样？，返回{"model":null,"foundation":null,"week":45,"transport":null,"month":7}
    }
    return value;//若没有这一句会怎样？，输出undefined
}
var foo = { foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7 };
var jsonString1 = JSON.stringify(foo, replacer);
console.log(jsonString1);//'{"week":45,"month":7}'


//如果replacer是一个数组，数组的值代表将被序列化成JSON字符串的属性名。
var jsonString2 = JSON.stringify(foo, ['model', 'transport']);  
console.log(jsonString2);//'{"model":"box","transport":"car"}'




// JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。

// 提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。

// JSON.parse(text[, reviver])
// JSON.parse的用法进阶 掌握 reviver回调

//补充说明
/*
如果指定了 reviver 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回（返回值）。
更具体点讲就是：解析值本身以及它所包含的所有属性，
会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）
分别的去调用 reviver 函数，在调用过程中，当前属性所属的对象会作为 this 值，
当前属性名和属性值会分别作为第一个和第二个参数传入 reviver 中。
如果 reviver 返回 undefined，则当前属性会从所属对象中删除，
如果返回了其他值，则返回的值会成为当前属性新的属性值。
*/
//思考：下述代码中的回调函数调用了几次，1次还是2次？思考从内到外的过程
var o6 = JSON.parse('{"p": 5}', function (k, v) {
    console.log("回调调用");
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。先执行这句return v*2
});                            // { p: 10 }
console.log(o6);


var o7 = JSON.parse('{"p": 5,"x":1}', function (k, v) {
    if(k === 'p') return 2*v;    // 
    if(k === 'x') return 3*v;
    if(k === '')  return v;      //最终到达顶层    
});                             
console.log(o7);//{p: 10, x: 3}


var o8 = JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}',
    function (k, v) {
        console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
        // 最后一个属性名会是个空字符串。
        return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
    });
console.log(o8);//1 2 4 6 5 3
//{1: 1, 2: 2, 3:{4:4,5：{6:6}}}


