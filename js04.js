//实参大于形参，多出来的实参将隐藏在arguments中
function f(a){
    console.log(a);
    console.log(arguments[1]);
    console.log(arguments[2]);
}
f(1,2,3);
//输出1,2,3



//ES5中没有块作用域
if(false){
    var a = 2;
}
console.log(a);//输出：undefined


if(true){
    var a = 2;
}
console.log(a);//输出：2



//严格模式使用方式
"use strict"//全局使用

function foo() {
    "use strict"//函数内部使用
}


delete xx;//true

'use strict'
delete foo;//报错


function  sloppyFunc() {
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);//123

//如果使用严格模式
'use strict'
function  sloppyFunc() {
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);//报错


function  sloppyFunc() {
    'use strict'
    sloppyVar = 123;
}
sloppyFunc();
console.log(sloppyVar);//报错



function isStricMode(){
    "use strict"
   return this == undefined?true:false;
 }
 console.log(isStricMode());//true

 function isStricMode(){
   return this == undefined?true:false;
 }
 console.log(isStricMode());//false



 //严格模式下禁止删除不可改变的属性和未定义的变量
 var str = "abcde";
function sloppyFunc(){
   str.length = 7;
   console.log(str.length);
}
sloppyFunc();//5

var str = "abcde";
function sloppyFunc(){
   'use strict'
   str.length = 7;
   console.log(str.length);
}
sloppyFunc();//报错



//严格模式下禁止函数参数重名
function f(a,a,b){
    return a+b;
  }
  f(2,3,4);//7

  function f(a,a,b){
    'use strict'
    return a+b;
  }
  f(2,3,4);//报错



  //case用全等===判断
 var i = 65;
 switch(true){
     case i>=60:
       console.log("及格");
       break;
     case i<60:
       console.log("不及格");
       break;
    default:
       console.log('default');
 }//及格 
 
 var i = 65;
switch(new Boolean(true)){
    case i>=60:
      console.log("及格");
      break;
    case i<60:
      console.log("不及格");
      break;
   default:
      console.log('default');
}//default



//switch语句中没有break就一直顺着执行，知道default结束
var i=1;
switch(i){
    case 1:
       console.log("case 1");
    case 2:
       console.log("case 2"); 
    case 3:
       console.log("case 3");  
    default:
       console.log("default");   
}//case 1
//case 2
//case 3
//default

var i=2;
switch(i){
    case 1:
       console.log("case 1");
    case 2:
       console.log("case 2"); 
    case 3:
       console.log("case 3");  
    default:
       console.log("default");}
//case 2
//case 3
//default

var i=2;
switch(i){
    case 1:
       console.log("case 1");
       break;
    case 2:
       console.log("case 2"); 
       break;
    case 3:
       console.log("case 3");  
       break;
    default:
       console.log("default");
}    //case 2