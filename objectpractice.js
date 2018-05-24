//转化成Number类型
console.log(Number(undefined));//NaN
console.log(Number(null));//0
console.log(Number(true));//1
console.log(Number(false));//0
console.log(Number(""));//0
console.log(Number("abc"));//NaN
console.log(Number("123.345xx"));//NaN
console.log(Number("32343,345xx"));//NaN
console.log(Number({x:1,y:2}));//NaN

console.log(parseFloat("123.345xx"));//123.345
console.log(parseFloat("32343,345xx"));//32343
console.log(parseInt("123.345xx"));//123
console.log(parseInt("32343,345xx"));//32343


//转化成String类型
console.log(String(undefined));//undefined
console.log(String(null));//null
console.log(String(true));//true
console.log(String(false));//false
console.log(String(0));//0
console.log(String(234));//234
console.log(String({x:1,y:2}));//[Object Object]


//转化成Boolean类型
console.log(Boolean(undefined));//false
console.log(Boolean(null));//false
console.log(Boolean(0));//false
console.log(Boolean(NaN));//false
console.log(Boolean(1));//true
console.log(Boolean(""));//false
console.log(Boolean("abc"));//true
console.log(Boolean({}));//true,对象总是true



if(new Boolean(false)){
    console.log("执行");
}//输出“执行”，对象


//字符串常用操作
var str = "abc_def_ghi_jkl_mn";
console.log(str.split("_"));//["abc","def","ghi","jkl","mn"]
console.log(str.split("_",2));//["abc","def"]
console.log(str.concat("_opq"));//abc_def_ghi_jkl_mn_opq
console.log(str.substr(4,7));//def_ghi,从下标为4开始截七个
console.log(str.substring(4,7));//def
console.log(str.slice(2));//c_def_ghi_jkl_mn
console.log(str.slice(2,5));//c_d
console.log(str.slice(-2));//mn
console.log(str.slice(2,-2));//c_def_ghi_jkl_
console.log(str.bold());//<b>abc_def_ghi_jkl_mn</b>
console.log(str.link());//<a href="undefined">abc_def_ghi_jkl_mn</a>
console.log(str.fontcolor("red"));//<font color="red">abc_def_ghi_jkl_mn</font>




//包装对象
var a = 123;
var b = new Number(a);

console.log(a == b);//true，引用转化成基本数据类型
console.log(a === b);//false，有本质区别，


//临时包装对象
//基本数据类型
var str = "abcde";
console.log(str.length);//输出5，因为临时包装成了String对象
str.length = 1;
console.log(str.length,str);//输出5 "abcde"，因为临时包装对象并不影响原始值

//引用数据类型
var arr = [1,2,3,4,5];
arr.length = 1;
console.log(arr,arr.length);//输出[1] 1



