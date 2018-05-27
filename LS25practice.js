//一、JS事件及事件对象
/*
window.onload=function(){
    console.log("window onload");
    var div2=document.getElementById("div2");
    div2.onclick=function(){
        console.log("div2 click");
    }
}
*/
/*
window.onload=function(e){
    console.log(e.target); //事件触发点
    console.log(this); //事件监听点
    //事件触发点和事件监听点有时候并不是一样的
    var div1=document.getElementById("div1");
    div1.onclick=function(e){
        console.log(e);
        console.log(e.clientX,e.clientY,e.ctrlKey);
        console.log(e.target,this);
        console.log(e.hasOwnproperty("traget"));
        //target属性是定义在原型上的
    }
}
*/
//二、JS事件响应处理
//HTML事件响应处理
function div4click(e){
    console.log("xxx");
}

//DOM0级事件响应处理
/*
window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var eventHandler = function (e) {
        console.log(e.type);
        console.log(e.target);
    }
    div1.onclick = eventHandler;
    div2.onclick = eventHandler;
    //div2.onclick=null;  //取消事件响应
}
*/
    //自定义事件监听、事件分发
    // document.addEventListener("xx",function(){console.log("11")});
    // document.dispatchEvent(new Event("xx"));


//DOM2级事件响应处理 
//比DOM0级事件响应处理更强，可以重复，支持自定义事件

window.onload = function (e) {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var clickHandler = function (e) {
        console.log(e.target);
    }
    div1.addEventListener("click",clickHandler);
   // div1.removeEventListener("click",clickHandler);
}

